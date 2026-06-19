export type Example = {
  id: string;
  title: string;
  blurb: string;
  icon: string;
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
    icon: "Hand",
    code: `likho "Salam Duniya!"
likho "wow mein khush aamdeed."`,
    output: `Salam Duniya!
wow mein khush aamdeed.`,
  },
  {
    id: "ginti",
    title: "Ginti karo",
    blurb: "Loop from one number to another.",
    icon: "Hash",
    code: `1 se 5 tak har i {
    likho "Ginti: {i}"
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
    icon: "GitBranch",
    code: `umar = 12

agar umar > 10 {
    likho "Tum bare ho!"
} warna {
    likho "Tum chote ho."
}`,
    output: `Tum bare ho!`,
  },
  {
    id: "tools",
    title: "Tools",
    blurb: "Pick the big numbers, then sort them.",
    icon: "Wrench",
    code: `numbers = [1, 5, 3, 8, 2, 9]

bade = numbers phir chuno(x > 4) phir tarteeb

har bade mein n {
    likho "mila: {n}"
}`,
    output: `mila: 5
mila: 8
mila: 9`,
  },
  {
    id: "banao",
    title: "Function banao",
    blurb: "Write a function and call it.",
    icon: "Hammer",
    code: `banao salam(naam = "dost") {
    likho "Salam {naam}! Kaise ho?"
}

salam("Ahmad")
salam()`,
    output: `Salam Ahmad! Kaise ho?
Salam dost! Kaise ho?`,
  },
  {
    id: "shaks",
    title: "Objects (shaks)",
    blurb: "Group related values and access them safely.",
    icon: "Package",
    code: `shaks = { naam: "Ahmad", umar: 14, shahar: "Karachi" }

likho "Salam {shaks.naam}!"
likho "Umar: {shaks ka umar}"

# Update a property
shaks.umar = 15
likho "Agla saal: {shaks.umar}"

# Safe access, returns khali if key missing
likho shaks ka email

# Only assign if currently khali
shaks.email ?= "ahmad@example.com"
likho shaks.email

# List of objects
log = [
    { naam: "Ahmad", umar: 10 },
    { naam: "Sara", umar: 12 },
]
har log mein p {
    likho "{p.naam}: {p ka umar} saal"
}

likho mafta(shaks)
likho key_hai(shaks, "naam")`,
    output: `Salam Ahmad!
Umar: 14
Agla saal: 15
khali
ahmad@example.com
Ahmad: 10 saal
Sara: 12 saal
[naam, umar, shahar, email]
sahi`,
  },
];

export const defaultExample = examples[0];
