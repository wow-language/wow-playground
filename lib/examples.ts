export type Example = {
  id: string;
  title: string;
  blurb: string;
  emoji: string;
  code: string;
  output: string;
};

/**
 * Starter programs for the playground and the landing page. Output is the
 * real output of the current compiler (C / Node targets) so the page stays
 * honest until the in-browser WASM compiler is wired up.
 */
export const examples: Example[] = [
  {
    id: "salam",
    title: "Salam Duniya",
    blurb: "Your very first wow program.",
    emoji: "👋",
    code: `bol "Salam Duniya!"
bol "wow mein khush aamdeed."`,
    output: `Salam Duniya!
wow mein khush aamdeed.`,
  },
  {
    id: "ginti",
    title: "Ginti karo",
    blurb: "Loop from one number to another.",
    emoji: "🔢",
    code: `har i 1 se 5 tak {
    bol "Ginti: {i}"
}`,
    output: `Ginti: 1
Ginti: 2
Ginti: 3
Ginti: 4
Ginti: 5`,
  },
  {
    id: "agar",
    title: "Agar warna",
    blurb: "Make a decision with a condition.",
    emoji: "🤔",
    code: `umar = 12

agar umar > 10 {
    bol "Tum bare ho!"
} warna {
    bol "Tum chote ho."
}`,
    output: `Tum bare ho!`,
  },
  {
    id: "auzaar",
    title: "Auzaar toolbox",
    blurb: "Pick the big numbers, then sort them.",
    emoji: "🧰",
    code: `numbers = [1, 5, 3, 8, 2, 9]

bade = numbers phir chuno(x > 4) phir tarteeb

har n mein bade {
    bol "mila: {n}"
}`,
    output: `mila: 5
mila: 8
mila: 9`,
  },
  {
    id: "kaam",
    title: "Apna kaam banao",
    blurb: "Write a function and call it.",
    emoji: "🛠️",
    code: `kaam salam(naam = "dost") {
    bol "Salam {naam}! Kaise ho?"
}

salam("Ahmad")
salam()`,
    output: `Salam Ahmad! Kaise ho?
Salam dost! Kaise ho?`,
  },
];

export const defaultExample = examples[0];
