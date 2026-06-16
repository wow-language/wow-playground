/*
  Playground localisation.
  ------------------------------------------------------------------
  The playground UI defaults to English. A kid can switch the chrome to
  Roman Urdu or Urdu (اردو, right-to-left) from the toggle in the top
  corner. The wow keywords and the code itself never change — only the
  surrounding labels and helper text.
*/

export type Lang = "en" | "roman" | "ur";

export const LANGS: { id: Lang; label: string; short: string; dir: "ltr" | "rtl" }[] = [
  { id: "en", label: "English", short: "EN", dir: "ltr" },
  { id: "roman", label: "Roman Urdu", short: "Roman", dir: "ltr" },
  { id: "ur", label: "اردو", short: "اردو", dir: "rtl" },
];

export const dir = (lang: Lang): "ltr" | "rtl" =>
  lang === "ur" ? "rtl" : "ltr";

type Strings = {
  title: string;
  subtitle: string;
  subtitleRunWord: string; // the bolded "Run" word inside the subtitle
  run: string;
  fileName: string;
  outputTab: string;
  targetsTab: string;
  runHint: string; // "{run} or press {Ctrl} + {Enter} — output shows here." with placeholders
  noOutput: string;
  errorLabel: string;
  targetsIntro: string;
  targetsBody: string;
  soon: string;
  footerNote: string;
};

export const t: Record<Lang, Strings> = {
  en: {
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
  roman: {
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
  ur: {
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
