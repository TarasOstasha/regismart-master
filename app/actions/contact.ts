"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { rateLimit } from "@/lib/rate-limit";

// Per-IP submission ceiling: 5 messages per minute. Generous for a human
// (submit + a couple retries), restrictive for a flood/cost-abuse script.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;

async function clientIp(): Promise<string> {
  const h = await headers();
  // x-forwarded-for is "client, proxy1, proxy2…" — the first hop is the client.
  const fwd = h.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return h.get("x-real-ip") ?? "unknown";
}

// Sender. While the regismart(s).com domain isn't verified in Resend yet,
// this uses Resend's onboarding sender (works without DNS setup). Once a
// real domain is verified in the Resend dashboard, swap this for e.g.
// "DMV Express <noreply@regismarts.com>".
const FROM = "DMV Express RegiSmart <onboarding@resend.dev>";
const TO = "info@regismarts.com";

const NAME_MAX = 200;
const PHONE_MAX = 40;
const EMAIL_MAX = 200;
const SERVICE_MAX = 80;
const MESSAGE_MAX = 5000;

export type ContactInput = {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  message?: string;
  /** Honeypot: must be empty. Bots fill it. */
  website?: string;
};

export type ContactResult = { ok: true } | { ok: false; error: string };

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendContact(input: ContactInput): Promise<ContactResult> {
  // Silent honeypot drop — return ok so the bot thinks it worked.
  if (input.website && input.website.trim() !== "") {
    return { ok: true };
  }

  // Per-IP rate limit (after the honeypot so caught bots don't consume quota).
  const rl = rateLimit(`contact:${await clientIp()}`, RATE_LIMIT, RATE_WINDOW_MS);
  if (!rl.ok) {
    return {
      ok: false,
      error: `Too many messages. Please wait ${rl.retryAfter}s and try again, or call us.`,
    };
  }

  const name = (input.name ?? "").trim();
  const phone = (input.phone ?? "").trim();
  const email = (input.email ?? "").trim();
  const service = (input.service ?? "").trim();
  const message = (input.message ?? "").trim();

  if (!name) return { ok: false, error: "Please enter your name." };
  if (name.length > NAME_MAX) return { ok: false, error: "Name is too long." };
  if (!phone) return { ok: false, error: "Please enter your phone number." };
  if (phone.length > PHONE_MAX) return { ok: false, error: "Phone is too long." };
  if (email) {
    if (email.length > EMAIL_MAX) return { ok: false, error: "Email is too long." };
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      return { ok: false, error: "Please enter a valid email address." };
  }
  if (service.length > SERVICE_MAX) return { ok: false, error: "Invalid service." };
  if (message.length > MESSAGE_MAX) return { ok: false, error: "Message is too long." };

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("[contact] RESEND_API_KEY missing");
    return {
      ok: false,
      error: "Email is temporarily unavailable — please call us instead.",
    };
  }

  const subject = service
    ? `New ${service} inquiry from ${name}`
    : `New contact form message from ${name}`;

  const html = `<!doctype html><html><body style="font-family:Inter,Arial,sans-serif;color:#0F1B3D;line-height:1.5">
<h2 style="margin:0 0 16px">New message from the contact form</h2>
<table style="font-size:14px;border-collapse:collapse">
<tr><td style="padding:4px 14px 4px 0;color:#54618A">Name</td><td><strong>${esc(name)}</strong></td></tr>
<tr><td style="padding:4px 14px 4px 0;color:#54618A">Phone</td><td><a href="tel:${esc(phone.replace(/[^+\d]/g, ""))}" style="color:#1F307C">${esc(phone)}</a></td></tr>
${email ? `<tr><td style="padding:4px 14px 4px 0;color:#54618A">Email</td><td><a href="mailto:${esc(email)}" style="color:#1F307C">${esc(email)}</a></td></tr>` : ""}
${service ? `<tr><td style="padding:4px 14px 4px 0;color:#54618A">Service</td><td>${esc(service)}</td></tr>` : ""}
</table>
${message ? `<h3 style="margin:22px 0 6px">Message</h3><div style="white-space:pre-wrap;background:#F4F7FB;border:1px solid #E2E8F0;border-radius:8px;padding:14px;font-size:14px">${esc(message)}</div>` : ""}
<hr style="border:none;border-top:1px solid #E2E8F0;margin:24px 0">
<p style="font-size:12px;color:#8A93B2;margin:0">Sent from the DMV Express RegiSmart contact form.</p>
</body></html>`;

  const text =
    `New message from the contact form\n\n` +
    `Name: ${name}\nPhone: ${phone}\n` +
    (email ? `Email: ${email}\n` : "") +
    (service ? `Service: ${service}\n` : "") +
    (message ? `\nMessage:\n${message}\n` : "");

  try {
    const resend = new Resend(key);
    const result = await resend.emails.send({
      from: FROM,
      to: TO,
      subject,
      replyTo: email || undefined,
      html,
      text,
    });

    if (result.error) {
      console.error("[contact] Resend error:", result.error);
      return {
        ok: false,
        error: "Sorry, we couldn't send your message. Please try again or call us.",
      };
    }

    return { ok: true };
  } catch (err) {
    console.error("[contact] send threw:", err);
    return {
      ok: false,
      error: "Sorry, something went wrong. Please try again or call us.",
    };
  }
}
