/*
  The "Learn" track — a friendly, kid-first path through programming
  using wow. Each chapter teaches one programming CONCEPT (not just a
  keyword) with a plain-language explanation, a real example, and a
  small challenge to try in the playground.
*/

export type Block =
  | { t: "p"; text: string }
  | { t: "h"; text: string }
  | { t: "code"; code: string }
  | { t: "tip"; text: string }
  | { t: "try"; text: string };

export type Chapter = {
  slug: string;
  emoji: string;
  title: string;
  concept: string; // one-line "what you'll learn"
  blocks: Block[];
};

export const chapters: Chapter[] = [
  {
    slug: "what-is-a-program",
    emoji: "🧠",
    title: "What is a program?",
    concept: "A program is just a list of instructions a computer follows.",
    blocks: [
      {
        t: "p",
        text: "Imagine writing down steps for a friend to make a sandwich: get the bread, add the filling, close it. A computer program is exactly that — a list of clear steps, written in an order, that the computer follows one at a time, top to bottom.",
      },
      {
        t: "tip",
        text: "Computers are fast but not clever. They do exactly what you say, in the exact order you say it. Half the fun of coding is learning to give really clear instructions.",
      },
      {
        t: "p",
        text: "In wow, every line is one instruction. Here are three steps the computer runs in order:",
      },
      {
        t: "code",
        code: `bol "Step 1: wake up"
bol "Step 2: brush teeth"
bol "Step 3: eat breakfast"`,
      },
      {
        t: "p",
        text: "When you press Run, the computer reads line 1, does it, then line 2, then line 3. That word bol means \"say\" — it tells the computer to show something on the screen.",
      },
      {
        t: "try",
        text: "Add a fourth step of your own. What happens if you move a line to the top — does the order of the output change?",
      },
    ],
  },
  {
    slug: "saying-things",
    emoji: "💬",
    title: "Telling the computer to speak",
    concept: "Use bol to print words and numbers.",
    blocks: [
      {
        t: "p",
        text: "The most common thing a beginner does is make the computer show something. In wow that word is bol (say). Whatever you put after it shows up in the output.",
      },
      {
        t: "code",
        code: `bol "Salam Duniya!"
bol 7
bol 2 + 3`,
      },
      {
        t: "p",
        text: "Text goes inside quotes: \"like this\". Numbers don't need quotes. And the computer can do the math for you — the last line prints 5, not \"2 + 3\".",
      },
      {
        t: "h",
        text: "Putting values inside text",
      },
      {
        t: "p",
        text: "You can drop a value right into a sentence using curly braces { }. This is called string interpolation — a fancy name for \"fill in the blank\".",
      },
      {
        t: "code",
        code: `naam = "Ayesha"
bol "Salam {naam}, kaise ho?"`,
      },
      {
        t: "try",
        text: "Print a sentence that says how old you are, using a number inside the text.",
      },
    ],
  },
  {
    slug: "variables",
    emoji: "📦",
    title: "Boxes that remember",
    concept: "Variables store a value so you can use it later.",
    blocks: [
      {
        t: "p",
        text: "A variable is like a labelled box. You put something in it and give it a name. Later, whenever you use that name, the computer looks inside the box and uses whatever is there.",
      },
      {
        t: "code",
        code: `umar = 12
bol "Aap ki umar {umar} hai"

umar = umar + 1
bol "Agle saal: {umar}"`,
      },
      {
        t: "p",
        text: "The = sign means \"put this value in the box\". It is not the maths \"equals\". So umar = umar + 1 means \"take what's in umar, add one, and put it back\".",
      },
      {
        t: "tip",
        text: "Pick names that describe what's inside — score, naam, total. Future-you (and your friends) will thank you when reading the code.",
      },
      {
        t: "try",
        text: "Make two boxes, a and b, with numbers in them. Print their total without typing the numbers again.",
      },
    ],
  },
  {
    slug: "making-choices",
    emoji: "🔀",
    title: "Making choices",
    concept: "Use agar / warna to do different things in different situations.",
    blocks: [
      {
        t: "p",
        text: "Programs get interesting when they can decide. \"If it's raining, take an umbrella, otherwise wear a cap.\" In wow that's agar (if) and warna (otherwise / else).",
      },
      {
        t: "code",
        code: `umar = 12

agar umar > 10 {
    bol "You're a big kid!"
} warna {
    bol "You're a little one."
}`,
      },
      {
        t: "p",
        text: "The part inside agar ... is a question that is either true or false: is umar bigger than 10? If yes, the first block runs. If no, the warna block runs.",
      },
      {
        t: "h",
        text: "More than two paths",
      },
      {
        t: "code",
        code: `score = 75

agar score > 90 {
    bol "Shaandaar!"
} warna agar score > 50 {
    bol "Acha kaam!"
} warna {
    bol "Koshish jari rakho."
}`,
      },
      {
        t: "tip",
        text: "Comparisons you'll use a lot: > bigger, < smaller, == exactly equal. Note ==, the double equals, asks a question; a single = puts a value in a box.",
      },
      {
        t: "try",
        text: "Write a check that prints \"Even\" or \"Odd\" for a number. Hint: an even number has no remainder when divided by 2 — try the % operator.",
      },
    ],
  },
  {
    slug: "loops",
    emoji: "🔁",
    title: "Doing things again and again",
    concept: "Loops repeat work so you don't copy-paste.",
    blocks: [
      {
        t: "p",
        text: "Computers are brilliant at repeating. Instead of writing the same line ten times, you write it once inside a loop and tell the computer how many times to go round.",
      },
      {
        t: "h",
        text: "Counting with a range",
      },
      {
        t: "code",
        code: `har i 1 se 5 tak {
    bol "Number {i}"
}`,
      },
      {
        t: "p",
        text: "This runs the block for i = 1, 2, 3, 4, 5. The word har means \"each\", and se ... tak means \"from ... to\". The range includes both ends.",
      },
      {
        t: "h",
        text: "Going through a list",
      },
      {
        t: "code",
        code: `phal = ["aam", "kela", "seb"]

har p mein phal {
    bol "I like {p}"
}`,
      },
      {
        t: "p",
        text: "And when you just want to repeat a fixed number of times, baar (times) is the shortest way:",
      },
      {
        t: "code",
        code: `3 baar {
    bol "wow!"
}`,
      },
      {
        t: "try",
        text: "Print the 7 times table from 7 × 1 to 7 × 10 using a range loop.",
      },
    ],
  },
  {
    slug: "functions",
    emoji: "🛠️",
    title: "Teaching the computer new tricks",
    concept: "Functions package steps under one name you can reuse.",
    blocks: [
      {
        t: "p",
        text: "A function is a set of steps you give a name to. Once it's named, you can run all those steps again just by calling the name — like teaching a dog the trick \"sit\" and then saying \"sit\" whenever you want.",
      },
      {
        t: "p",
        text: "In wow you make one with banao (make) and send a result back with bhejo (send).",
      },
      {
        t: "code",
        code: `banao salam(naam) {
    bol "Salam {naam}! Kaise ho?"
}

salam("Ahmad")
salam("Sara")`,
      },
      {
        t: "p",
        text: "Here salam is the trick's name, and naam is an input — the function uses whatever name you hand it. Calling salam(\"Sara\") runs the steps with naam set to \"Sara\".",
      },
      {
        t: "h",
        text: "Sending a value back",
      },
      {
        t: "code",
        code: `banao jama(a, b) {
    bhejo a + b
}

total = jama(3, 4)
bol "Total: {total}"`,
      },
      {
        t: "tip",
        text: "bhejo hands a value back to whoever called the function, so you can store it in a box and use it later. A function without bhejo just does its steps and returns nothing.",
      },
      {
        t: "try",
        text: "Write a function double(n) that sends back n times 2, then print double(21).",
      },
    ],
  },
  {
    slug: "lists-and-auzaar",
    emoji: "🧰",
    title: "Lists and your toolbox",
    concept: "Hold many values in a list and shape them with auzaar.",
    blocks: [
      {
        t: "p",
        text: "A list holds many values in order, written inside square brackets. It's perfect for a class of students, a set of scores, or a basket of fruit.",
      },
      {
        t: "code",
        code: `numbers = [4, 8, 15, 16, 23, 42]
bol "There are {ginti(numbers)} numbers"
bol "Their total is {jama(numbers)}"`,
      },
      {
        t: "p",
        text: "wow comes with a built-in toolbox called auzaar (tools). It's always available — no import needed. ginti counts items, jama adds them up, tarteeb sorts them, and many more.",
      },
      {
        t: "h",
        text: "Picking and changing items",
      },
      {
        t: "code",
        code: `numbers = [4, 8, 15, 16, 23, 42]

bade = chuno(numbers, x > 15)
bol bade`,
      },
      {
        t: "p",
        text: "chuno (choose) keeps only the items that pass a test. Here x stands for each item in turn, and we keep the ones bigger than 15.",
      },
      {
        t: "try",
        text: "Make a list of your friends' ages and print the largest one with max(list).",
      },
    ],
  },
  {
    slug: "pipelines",
    emoji: "➡️",
    title: "Pipelines with phir",
    concept: "Chain steps left-to-right so they read like a sentence.",
    blocks: [
      {
        t: "p",
        text: "Sometimes you want to do several things to a list one after another: filter it, then sort it, then take the first item. You could use a box for each step — or you can connect them with phir (then).",
      },
      {
        t: "code",
        code: `numbers = [1, 5, 3, 8, 2, 9]

nateeja = numbers
    phir chuno(x > 4)
    phir tarteeb
    phir pehla

bol nateeja`,
      },
      {
        t: "p",
        text: "Read it out loud: \"the numbers, then choose the big ones, then sort, then take the first.\" phir hands the value on the left into the tool on the right. It's the same as doing each step separately, just tidier.",
      },
      {
        t: "tip",
        text: "Pipelines shine when each step is small and clear. If a chain gets hard to read, it's fine to break it back into named boxes.",
      },
      {
        t: "try",
        text: "Start from a list of numbers and build a pipeline that doubles each one (badlo) and then sums them (jama).",
      },
    ],
  },
  {
    slug: "when-things-go-wrong",
    emoji: "🛟",
    title: "When things go wrong",
    concept: "Catch errors with koshish / pakro instead of crashing.",
    blocks: [
      {
        t: "p",
        text: "Everyone makes mistakes — even computers hit situations they can't handle, like dividing a number by zero. Instead of letting the whole program stop, you can try something risky and catch the problem if it happens.",
      },
      {
        t: "code",
        code: `koshish {
    natija = 10 / 0
    bol natija
} pakro ghalti {
    bol "Oops: {ghalti}"
}`,
      },
      {
        t: "p",
        text: "koshish (try) runs the risky steps. If anything goes wrong, the pakro (catch) block runs instead, and ghalti holds a message describing what happened — here, \"sifr se taqseem nahi ho sakta\" (you can't divide by zero).",
      },
      {
        t: "tip",
        text: "Good error messages are a kindness to yourself. wow writes its mistakes in plain Roman Urdu and points at the exact spot, so you can fix them quickly.",
      },
      {
        t: "try",
        text: "Wrap some code that might fail in koshish, and print a friendly message in the pakro block.",
      },
    ],
  },
];

export const chapterBySlug = (slug: string) =>
  chapters.find((c) => c.slug === slug);

export const chapterIndex = (slug: string) =>
  chapters.findIndex((c) => c.slug === slug);
