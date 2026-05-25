export type Review = {
  name: string;
  initials: string;
  rating: 5;
  body: string;
  meta: string;
};

export const reviews: Review[] = [
  {
    name: "Maria S.",
    initials: "MS",
    rating: 5,
    body: "I dreaded going to the DMV. Walked in here, was out in 20 minutes with new plates. Will never go back to the DMV.",
    meta: "Bridgeport · Registered a 2019 Honda CR-V",
  },
  {
    name: "James T.",
    initials: "JT",
    rating: 5,
    body: "Saved me half a day. They knew exactly what paperwork I needed for an out-of-state title. Polite, fast, transparent on fees.",
    meta: "Stratford · Out-of-state transfer",
  },
  {
    name: "Luis R.",
    initials: "LR",
    rating: 5,
    body: "Hablan español y me ayudaron con todo el papeleo. Nada de filas, nada de citas. Recomendado 100%.",
    meta: "Fairfield · Renovación de matrícula",
  },
  {
    name: "Dealer · East Coast Auto",
    initials: "EC",
    rating: 5,
    body: "We push 30+ titles a month through them. Always on time, never a flagged file. Saves our team a full day every week.",
    meta: "Commercial · Dealer account",
  },
];
