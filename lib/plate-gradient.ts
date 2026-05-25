/** Sample the site fixed plate gradient at a viewport Y coordinate. */
export function plateGradientColorAt(viewportY: number, viewportHeight: number) {
  if (typeof document === "undefined") return "#f0f4f8";

  const style = getComputedStyle(document.documentElement);
  const from =
    style.getPropertyValue("--plate-gradient-from").trim() || "#4a9bd5";
  const to = style.getPropertyValue("--plate-gradient-to").trim() || "#f0f4f8";

  const t = Math.max(0, Math.min(1, viewportY / viewportHeight));
  return lerpHex(from, to, t);
}

function lerpHex(from: string, to: string, t: number) {
  const a = hexToRgb(from);
  const b = hexToRgb(to);
  const r = Math.round(a.r + (b.r - a.r) * t);
  const g = Math.round(a.g + (b.g - a.g) * t);
  const bl = Math.round(a.b + (b.b - a.b) * t);
  return `rgb(${r}, ${g}, ${bl})`;
}

function hexToRgb(hex: string) {
  const n = hex.replace("#", "");
  return {
    r: parseInt(n.slice(0, 2), 16),
    g: parseInt(n.slice(2, 4), 16),
    b: parseInt(n.slice(4, 6), 16),
  };
}
