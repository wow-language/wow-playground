export type Row = { code: string; meaning: string };

// Sections of the Overview reference page (in-page anchors).
export const overviewSections = [
  { id: "getting-started", label: "Getting started" },
  { id: "keywords", label: "Keywords" },
  { id: "operators", label: "Operators" },
  { id: "loops", label: "Loops" },
  { id: "functions", label: "Functions" },
  { id: "phir", label: "phir pipelines" },
  { id: "tools", label: "Tools" },
  { id: "objects", label: "Objects" },
  { id: "targets", label: "Targets" },
  { id: "errors", label: "Error messages" },
];

export const keywordRows: Row[] = [
  { code: 'likho "..."', meaning: "Print something to the screen" },
  { code: "rakho", meaning: "Declare a variable (optional)" },
  { code: "agar x > 5 { }", meaning: "if" },
  { code: "warna { }", meaning: "else" },
  { code: "warna agar { }", meaning: "else if" },
  { code: "0 se 10 tak har i { }", meaning: "Loop over a range of numbers" },
  { code: "har lista mein item { }", meaning: "Loop over a list" },
  { code: "3 baar { }", meaning: "Repeat N times" },
  { code: "jabtak x < 10 { }", meaning: "while" },
  { code: "roko", meaning: "Break out of a loop" },
  { code: "aage", meaning: "Continue to the next round" },
  { code: "banao naam() { }", meaning: "Define a function" },
  { code: "bhejo nateeja", meaning: "Return a value" },
  { code: 'pucho "..."', meaning: "Read input from the user" },
  { code: "lao express", meaning: "Import a library" },
  { code: "koshish { } pakro ghalti { }", meaning: "try / catch" },
];

export const operatorRows: Row[] = [
  { code: "aur", meaning: "&& (and)" },
  { code: "ya", meaning: "|| (or)" },
  { code: "nahi", meaning: "! (not)" },
  { code: "sahi", meaning: "true" },
  { code: "ghalat", meaning: "false" },
  { code: "khali", meaning: "null / nothing" },
  { code: "+  -  *  /", meaning: "Math, the same as everywhere" },
  { code: ">  <  ==", meaning: "Comparison, the same as everywhere" },
];

export const collectionRows: Row[] = [
  { code: "badlo(list, fn)", meaning: "map: transform every item" },
  { code: "chuno(list, fn)", meaning: "filter: keep items that pass a test" },
  { code: "joro(list, fn, start)", meaning: "reduce: combine into one value" },
  { code: "dhundo(list, fn)", meaning: "find: first item that matches" },
  { code: "shamil(list, item)", meaning: "includes: is the item present" },
  { code: "ginti(list)", meaning: "length: how many items" },
  { code: "jama(list)", meaning: "sum of all numbers" },
  { code: "max(list) / min(list)", meaning: "largest / smallest value" },
  { code: "tarteeb(list)", meaning: "sort in order" },
  { code: "ulta(list)", meaning: "reverse" },
  { code: "alag(list)", meaning: "uniq: remove duplicates" },
  { code: "pehla(list) / aakhri(list)", meaning: "first / last item" },
  { code: "silsila(start, end)", meaning: "range: make a list of numbers" },
];

export const stringRows: Row[] = [
  { code: "toro(text, sep)", meaning: "split into a list" },
  { code: "milao(list, sep)", meaning: "join a list into a string" },
  { code: "saaf(text)", meaning: "trim whitespace" },
  { code: "tabdeel(text, old, new)", meaning: "replace text" },
  { code: "lambai(text)", meaning: "length" },
  { code: "bara_likho(text) / chota_likho(text)", meaning: "UPPER / lower case" },
];

export const mathRows: Row[] = [
  { code: "random()", meaning: "random number from 0 to 1" },
  { code: "random_number(min, max)", meaning: "random whole number in a range" },
  { code: "round(n)", meaning: "round to the nearest whole number" },
  { code: "round_up(n) / round_down(n)", meaning: "ceiling / floor" },
  { code: "square_root(n)", meaning: "square root" },
  { code: "power(n, p)", meaning: "n to the power p" },
  { code: "absolute(n)", meaning: "absolute value" },
];

export const objectRows: Row[] = [
  { code: 'shaks = { naam: "Ahmad", umar: 14 }', meaning: "Create an object with key-value pairs" },
  { code: "shaks.naam", meaning: "Dot access, crashes if shaks is khali" },
  { code: "shaks ka naam", meaning: "Safe possessive access, returns khali if missing (use ki / kay for feminine / plural)" },
  { code: "shaks?.naam", meaning: "Safe dot, same as ka / ki / kay" },
  { code: "shaks.umar = 15", meaning: "Update a property in place" },
  { code: 'shaks.email ?= "default"', meaning: "Only assign if the property is currently khali" },
  { code: "shaks ka adres ka gali", meaning: "Chain safe access through nested objects" },
];

export const objectToolsRows: Row[] = [
  { code: "mafta(obj)", meaning: "List of all keys" },
  { code: "qeemtain(obj)", meaning: "List of all values" },
  { code: 'key_hai(obj, "naam")', meaning: "sahi if the key exists, ghalat otherwise" },
  { code: 'hata(obj, "umar")', meaning: "New object without the given key (original is unchanged)" },
];

export const esp32Rows: Row[] = [
  { code: "wifi_jodo(ssid, password)", meaning: "Connect to a WiFi network" },
  { code: "wifi_ip()", meaning: "Get the board's IP address as a string" },
  { code: "server_rasta(path, handler)", meaning: "Register a GET route, handler is a banao function" },
  { code: "server_shuru(port)", meaning: "Start the web server on the given port" },
  { code: "server_parho()", meaning: "Process incoming requests, call this inside chalao" },
  { code: "jawab_bhejo(code, type, body)", meaning: "Send an HTTP response (status code, content-type, body)" },
];
