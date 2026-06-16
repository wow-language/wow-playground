export type Row = { code: string; meaning: string };

export const keywordRows: Row[] = [
  { code: 'bol "..."', meaning: "kuch print karo (say / print)" },
  { code: "rakho", meaning: "variable banao (optional)" },
  { code: "agar x > 5 { }", meaning: "agar — if" },
  { code: "warna { }", meaning: "warna — else" },
  { code: "warna agar { }", meaning: "else if" },
  { code: "har i 0 se 10 tak { }", meaning: "numbers par loop" },
  { code: "har item mein lista { }", meaning: "list par loop" },
  { code: "3 baar { }", meaning: "N dafa repeat karo" },
  { code: "jabtak x < 10 { }", meaning: "jab tak — while" },
  { code: "roko", meaning: "loop se bahar niklo (break)" },
  { code: "aage", meaning: "agle chakkar par jao (continue)" },
  { code: "kaam naam() { }", meaning: "ek kaam (function) banao" },
  { code: "do nateeja", meaning: "value wapas do (return)" },
  { code: 'pucho "..."', meaning: "user se input maango" },
  { code: "lao express", meaning: "library import karo" },
  { code: "koshish { } pakdo ghalti { }", meaning: "try / catch" },
];

export const operatorRows: Row[] = [
  { code: "aur", meaning: "&& (and)" },
  { code: "ya", meaning: "|| (or)" },
  { code: "nahi", meaning: "! (not)" },
  { code: "sahi", meaning: "true" },
  { code: "ghalat", meaning: "false" },
  { code: "khali", meaning: "null / kuch nahi" },
  { code: "+  -  *  /", meaning: "math waisa hi" },
  { code: ">  <  ==", meaning: "comparison waisa hi" },
];

export const collectionRows: Row[] = [
  { code: "badlo(list, fn)", meaning: "har item ko badlo (map)" },
  { code: "chuno(list, fn)", meaning: "test pass karne wale rakho (filter)" },
  { code: "joro(list, fn, shuru)", meaning: "sab ko ek value mein joro (reduce)" },
  { code: "dhundo(list, fn)", meaning: "pehla matching item (find)" },
  { code: "shamil(list, item)", meaning: "item maujood hai? (includes)" },
  { code: "ginti(list)", meaning: "kitne items hain (length)" },
  { code: "jama(list)", meaning: "sab numbers ka total (sum)" },
  { code: "max(list) / min(list)", meaning: "sab se bara / chota" },
  { code: "tarteeb(list)", meaning: "tarteeb se lagao (sort)" },
  { code: "ulta(list)", meaning: "ulta karo (reverse)" },
  { code: "alag(list)", meaning: "duplicates hatao (uniq)" },
  { code: "pehla(list) / aakhri(list)", meaning: "pehla / aakhri item" },
  { code: "silsila(shuru, khatam)", meaning: "numbers ki list banao (range)" },
];

export const stringRows: Row[] = [
  { code: "toro(text, sep)", meaning: "list mein toro (split)" },
  { code: "milao(list, sep)", meaning: "list ko string banao (join)" },
  { code: "saaf(text)", meaning: "extra spaces hatao (trim)" },
  { code: "tabdeel(text, purana, naya)", meaning: "text badlo (replace)" },
  { code: "lambai(text)", meaning: "kitne harf (length)" },
  { code: "bara_likho(text) / chota_likho(text)", meaning: "UPPER / lower case" },
];

export const mathRows: Row[] = [
  { code: "random()", meaning: "0 se 1 ke darmiyan random" },
  { code: "random_number(min, max)", meaning: "range mein random poora number" },
  { code: "round(n)", meaning: "qareeb tarin poore number tak" },
  { code: "round_up(n) / round_down(n)", meaning: "ceiling / floor" },
  { code: "square_root(n)", meaning: "square root" },
  { code: "power(n, p)", meaning: "n ki power p" },
  { code: "absolute(n)", meaning: "absolute value" },
];
