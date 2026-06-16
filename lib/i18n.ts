/*
  Site localisation.
  ------------------------------------------------------------------
  The whole site defaults to English. A kid can switch the chrome to
  Roman Urdu or Urdu (اردو, right-to-left) from the toggle in the nav.
  The wow keywords and the code itself never change — only the
  surrounding labels and helper text. (The docs reference and Learn
  lessons are authored in English for now.)
*/

export type Lang = "en" | "roman" | "ur";

export const LANGS: { id: Lang; label: string; short: string; dir: "ltr" | "rtl" }[] = [
  { id: "en", label: "English", short: "EN", dir: "ltr" },
  { id: "roman", label: "Roman Urdu", short: "Roman", dir: "ltr" },
  { id: "ur", label: "اردو", short: "اردو", dir: "rtl" },
];

export const dir = (lang: Lang): "ltr" | "rtl" => (lang === "ur" ? "rtl" : "ltr");

type Feature = { title: string; body: string };

type Dict = {
  nav: { docs: string; learn: string; playground: string };
  footer: { desc: string; slogan: string; credit: string };
  home: {
    badge: string;
    title1: string;
    t2pre: string;
    t2word: string;
    t2post: string;
    leadRest: string; // paragraph after the bold "wow"
    btnPlayground: string;
    btnDocs: string;
    targetsLabel: string;
    featuresHeading: string;
    features: Feature[];
    ctaHeading: string;
    ctaSub: string;
    ctaBtn: string;
  };
  pg: {
    title: string;
    subtitle: string;
    subtitleRunWord: string;
    run: string;
    fileName: string;
    outputTab: string;
    targetsTab: string;
    runHint: string;
    noOutput: string;
    errorLabel: string;
    targetsIntro: string;
    targetsBody: string;
    soon: string;
    footerNote: string;
  };
};

export const t: Record<Lang, Dict> = {
  en: {
    nav: { docs: "Docs", learn: "Learn", playground: "Playground" },
    footer: {
      desc: "A Roman Urdu programming language for kids.",
      slogan: "Code likho. Wow bolo.",
      credit: "Built with ❤️ in Pakistan · MIT licensed",
    },
    home: {
      badge: "built for new coders",
      title1: "Write code.",
      t2pre: "Say ",
      t2word: "wow",
      t2post: ".",
      leadRest:
        " is a programming language with Roman Urdu keywords — built to get kids in Pakistan into coding. Write three lines and watch an LED blink or a webpage open.",
      btnPlayground: "Open the playground →",
      btnDocs: "Read the docs",
      targetsLabel: "One language · three targets",
      featuresHeading: "Made for kids, the way kids think",
      features: [
        { title: "In your own words", body: "Keywords in Roman Urdu — bol, agar, har, banao. Write code the way you speak." },
        { title: "One file, three places", body: "The same code runs on desktop, an Arduino board, and the web — without rewriting your logic." },
        { title: "Errors you understand", body: "Mistakes are explained in plain Roman Urdu, right at the spot, so kids can fix them themselves." },
        { title: "Batteries included", body: "Counting, sorting, choosing, summing — everyday tasks are one short word away, no library needed." },
      ],
      ctaHeading: "Ready? Write your first program.",
      ctaSub: "Nothing to install — write and run right in your browser.",
      ctaBtn: "Let's get started →",
    },
    pg: {
      title: "Playground",
      subtitle: "Write wow, hit {run}, and watch the output.",
      subtitleRunWord: "Run",
      run: "Run",
      fileName: "my_code.wow",
      outputTab: "Output",
      targetsTab: "C / Arduino / Web",
      runHint: "Hit {run} or press {Ctrl} + {Enter} — your output appears here.",
      noOutput: "(no output)",
      errorLabel: "Error",
      targetsIntro:
        "This playground runs on a preview interpreter that executes wow's core language right in your browser.",
      targetsBody:
        "The full compiler — which turns the same .wow file into C, Arduino, and Node.js — is written in Rust and is on its way here via WebAssembly. This tab will then show the generated code for each target.",
      soon: "soon",
      footerNote:
        "The preview interpreter runs the core language (bol, agar/warna, loops, banao/bhejo, auzaar, phir). The full compiler — with all three targets — is coming via WASM.",
    },
  },

  roman: {
    nav: { docs: "Docs", learn: "Seekho", playground: "Playground" },
    footer: {
      desc: "Bachhon ke liye Roman Urdu programming language.",
      slogan: "Code likho. Wow bolo.",
      credit: "Pakistan mein ❤️ ke saath banaya · MIT licensed",
    },
    home: {
      badge: "naye coders ke liye",
      title1: "Code likho.",
      t2pre: "",
      t2word: "Wow",
      t2post: " bolo.",
      leadRest:
        " ek programming language hai Roman Urdu lafzon ke saath — Pakistan ke bachhon ko coding sikhane ke liye. Teen lines likho, aur LED jhilmilaye ya webpage khule.",
      btnPlayground: "Playground kholo →",
      btnDocs: "Docs parho",
      targetsLabel: "Ek zubaan · teen targets",
      featuresHeading: "Bachhon ke liye, bachhon ki tarah",
      features: [
        { title: "Roman Urdu mein", body: "Keywords aap ki zubaan mein — bol, agar, har, banao. Jaise aap baat karte hain, waise hi code likhein." },
        { title: "Ek file, teen jagah", body: "Wahi code desktop par, Arduino board par, aur web par chalta hai. Logic dobara likhne ki zaroorat nahi." },
        { title: "Ghalti samajh aati hai", body: "Error messages Roman Urdu mein, seedha point par — taake bachhe khud apni ghalti theek kar sakein." },
        { title: "Auzaar saath mein", body: "Ginti, tarteeb, chuno, jama — rozmarra ke kaam ek chhote lafz mein, bina kisi library ke." },
      ],
      ctaHeading: "Tayyar ho? Pehla program likho.",
      ctaSub: "Kuch install karne ki zaroorat nahi — seedha browser mein likho aur chalao.",
      ctaBtn: "Chalo shuru karein →",
    },
    pg: {
      title: "Playground",
      subtitle: "wow likho, {run} dabao, aur output dekho.",
      subtitleRunWord: "Chalao",
      run: "Chalao",
      fileName: "mera_code.wow",
      outputTab: "Output",
      targetsTab: "C / Arduino / Web",
      runHint: "{run} dabao ya {Ctrl} + {Enter} — output yahan dikhega.",
      noOutput: "(koi output nahi)",
      errorLabel: "Ghalti",
      targetsIntro:
        "Yeh playground ek preview interpreter par chalta hai jo wow ki core language seedha browser mein chalata hai.",
      targetsBody:
        "Mukammal compiler — jo wahi .wow file ko C, Arduino, aur Node.js mein badalta hai — Rust se banaya gaya hai aur WebAssembly ke zariye yahan aa raha hai. Tab yeh tab har target ka generated code dikhayega.",
      soon: "jald",
      footerNote:
        "Preview interpreter core language chalata hai (bol, agar/warna, loops, banao/bhejo, auzaar, phir). Poora compiler — teeno targets ke saath — WASM ke zariye jald aa raha hai.",
    },
  },

  ur: {
    nav: { docs: "ڈاکس", learn: "سیکھو", playground: "پلے گراؤنڈ" },
    footer: {
      desc: "بچوں کے لیے رومن اردو پروگرامنگ زبان۔",
      slogan: "Code likho. Wow bolo.",
      credit: "پاکستان میں ❤️ کے ساتھ بنایا · MIT لائسنس",
    },
    home: {
      badge: "نئے کوڈرز کے لیے",
      title1: "کوڈ لکھو۔",
      t2pre: "",
      t2word: "wow",
      t2post: " بولو۔",
      leadRest:
        " ایک پروگرامنگ زبان ہے رومن اردو الفاظ کے ساتھ — پاکستان کے بچوں کو کوڈنگ سکھانے کے لیے۔ تین لائنیں لکھو، اور LED جھلملائے یا ویب پیج کھلے۔",
      btnPlayground: "پلے گراؤنڈ کھولو →",
      btnDocs: "ڈاکس پڑھو",
      targetsLabel: "ایک زبان · تین ٹارگٹس",
      featuresHeading: "بچوں کے لیے، بچوں کی طرح",
      features: [
        { title: "اپنی زبان میں", body: "کی ورڈز رومن اردو میں — bol، agar، har، banao۔ جیسے آپ بات کرتے ہیں ویسے ہی کوڈ لکھیں۔" },
        { title: "ایک فائل، تین جگہ", body: "وہی کوڈ ڈیسک ٹاپ، Arduino بورڈ، اور ویب پر چلتا ہے — لاجک دوبارہ لکھنے کی ضرورت نہیں۔" },
        { title: "غلطی جو سمجھ آئے", body: "غلطیاں آسان رومن اردو میں، عین اسی جگہ — تاکہ بچے خود اپنی غلطی ٹھیک کر سکیں۔" },
        { title: "اوزار ساتھ", body: "گنتی، ترتیب، چناؤ، جوڑ — روزمرہ کے کام ایک چھوٹے لفظ میں، بغیر کسی لائبریری کے۔" },
      ],
      ctaHeading: "تیار ہو؟ پہلا پروگرام لکھو۔",
      ctaSub: "کچھ انسٹال کرنے کی ضرورت نہیں — براہِ راست براؤزر میں لکھو اور چلاؤ۔",
      ctaBtn: "چلو شروع کریں →",
    },
    pg: {
      title: "پلے گراؤنڈ",
      subtitle: "wow لکھو، {run} دباؤ، اور آؤٹ پٹ دیکھو۔",
      subtitleRunWord: "چلاؤ",
      run: "چلاؤ",
      fileName: "mera_code.wow",
      outputTab: "آؤٹ پٹ",
      targetsTab: "C / Arduino / Web",
      runHint: "{run} دباؤ یا {Ctrl} + {Enter} دبائیں — آؤٹ پٹ یہاں نظر آئے گا۔",
      noOutput: "(کوئی آؤٹ پٹ نہیں)",
      errorLabel: "غلطی",
      targetsIntro:
        "یہ پلے گراؤنڈ ایک پری ویو انٹرپریٹر پر چلتا ہے جو wow کی بنیادی زبان کو براہِ راست براؤزر میں چلاتا ہے۔",
      targetsBody:
        "مکمل کمپائلر — جو وہی .wow فائل کو C، Arduino، اور Node.js میں بدلتا ہے — Rust میں بنایا گیا ہے اور WebAssembly کے ذریعے یہاں آ رہا ہے۔ تب یہ ٹیب ہر ٹارگٹ کا تیار شدہ کوڈ دکھائے گا۔",
      soon: "جلد",
      footerNote:
        "پری ویو انٹرپریٹر بنیادی زبان چلاتا ہے (bol، agar/warna، loops، banao/bhejo، auzaar، phir)۔ مکمل کمپائلر — تینوں ٹارگٹس کے ساتھ — WASM کے ذریعے جلد آ رہا ہے۔",
    },
  },
};

// Per-example title + blurb, translated. Code and output stay identical.
export const exampleMeta: Record<string, Record<Lang, { title: string; blurb: string }>> = {
  salam: {
    en: { title: "Hello World", blurb: "Your very first wow program." },
    roman: { title: "Salam Duniya", blurb: "Aap ka pehla wow program." },
    ur: { title: "سلام دنیا", blurb: "آپ کا پہلا wow پروگرام۔" },
  },
  ginti: {
    en: { title: "Counting", blurb: "Loop from one number to another." },
    roman: { title: "Ginti karo", blurb: "Aik number se doosre tak loop." },
    ur: { title: "گنتی", blurb: "ایک نمبر سے دوسرے تک لوپ۔" },
  },
  agar: {
    en: { title: "If / else", blurb: "Make a decision with a condition." },
    roman: { title: "Agar warna", blurb: "Shart ke saath faisla karo." },
    ur: { title: "اگر ورنہ", blurb: "شرط کے ساتھ فیصلہ کرو۔" },
  },
  auzaar: {
    en: { title: "The auzaar toolbox", blurb: "Pick the big numbers, then sort them." },
    roman: { title: "Auzaar toolbox", blurb: "Bare numbers chuno, phir tarteeb do." },
    ur: { title: "اوزار", blurb: "بڑے نمبر چنو، پھر ترتیب دو۔" },
  },
  banao: {
    en: { title: "Make a function", blurb: "Write a function and call it." },
    roman: { title: "Function banao", blurb: "Aik function likho aur call karo." },
    ur: { title: "فنکشن بناؤ", blurb: "ایک فنکشن لکھو اور اسے بلاؤ۔" },
  },
};
