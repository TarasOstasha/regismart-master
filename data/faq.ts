export type FaqItem = {
  q: string;
  a: string;
};

export const faqs: FaqItem[] = [
  {
    q: "Do I need an appointment?",
    a: "No. We're a walk-in office six days a week. Most visits take under 30 minutes. Of course, you can call ahead and we'll prep your file before you arrive.",
  },
  {
    q: "What documents should I bring?",
    a: "Depends on the service. Usually your ID, insurance card, and the vehicle title or bill of sale. Use the checklist above so you don't have to come back twice.",
  },
  {
    q: "Can you handle out-of-state transfers?",
    a: "Yes. Bring your out-of-state title, proof of insurance, ID, and odometer reading. We file the paperwork and you leave with CT plates.",
  },
  {
    q: "Do you work with dealers and commercial fleets?",
    a: "We do. Apportioned (IRP) registrations, dealer plates, commercial titles. Call us with your account size and we'll set up a workflow.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Cash, debit, and major credit cards. State fees and our service fee are itemized on every receipt. No surprises.",
  },
  {
    q: "What if my vehicle has compliance issues?",
    a: "Run a free CT DMV compliance check before you visit. If you're flagged, we'll walk you through it.",
  },
];
