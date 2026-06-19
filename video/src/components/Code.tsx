import { MONO } from "../fonts";
import { C } from "../theme";

// Keyword set mirrors lib/highlight.tsx (the subset that appears in the demo).
const KEYWORDS = new Set([
  "likho", "rakho", "agar", "warna", "har", "se", "tak", "baar", "jabtak",
  "roko", "aage", "banao", "bhejo", "sahi", "ghalat", "khali", "aur", "ya",
  "nahi", "lao", "koshish", "pakro", "pucho", "mein", "phir",
]);

// Built-in auzaar tools we show — tinted like functions.
const TOOLS = new Set([
  "chuno", "badlo", "tarteeb", "ginti", "jama", "max", "min", "ulta",
  "pehla", "aakhri", "milao",
]);

type Seg = { text: string; color: string };

// A small, forgiving tokenizer — enough to colour the snippets faithfully.
function tokenizeLine(line: string): Seg[] {
  const hash = line.indexOf("#");
  let code = line;
  let comment: string | null = null;
  // honour # only when not inside a string
  if (hash !== -1) {
    const before = line.slice(0, hash);
    const quotes = (before.match(/"/g) || []).length;
    if (quotes % 2 === 0) {
      code = before;
      comment = line.slice(hash);
    }
  }

  const segs: Seg[] = [];
  // split keeping string literals intact
  const parts = code.split(/("[^"]*")/g);
  parts.forEach((part) => {
    if (part.startsWith('"') && part.endsWith('"') && part.length >= 2) {
      segs.push({ text: part, color: C.tokStr });
      return;
    }
    // walk identifiers / numbers / punctuation
    const re = /([A-Za-z_][A-Za-z0-9_]*)|(\d+(?:\.\d+)?)|(\s+)|([^A-Za-z0-9_\s])/g;
    let m: RegExpExecArray | null;
    let idx = 0;
    while ((m = re.exec(part)) !== null) {
      const [tok] = m;
      if (m[1]) {
        const after = part.slice(m.index + tok.length).trimStart();
        const isCall = after.startsWith("(");
        if (KEYWORDS.has(tok)) segs.push({ text: tok, color: C.tokKw });
        else if (TOOLS.has(tok) || isCall) segs.push({ text: tok, color: C.tokFn });
        else segs.push({ text: tok, color: C.codeText });
      } else if (m[2]) {
        segs.push({ text: tok, color: C.tokNum });
      } else if (m[3]) {
        segs.push({ text: tok, color: C.codeText });
      } else {
        segs.push({ text: tok, color: C.tokPunc });
      }
      idx = m.index + tok.length;
    }
    void idx;
  });

  if (comment) segs.push({ text: comment, color: C.tokCom });
  return segs;
}

/**
 * One line of wow source. `reveal` (0→1) wipes it in left-to-right with a
 * caret at the leading edge for a typing feel.
 */
export const CodeLine: React.FC<{
  line: string;
  reveal: number;
  fontSize?: number;
}> = ({ line, reveal, fontSize = 38 }) => {
  const segs = line.length ? tokenizeLine(line) : [{ text: " ", color: C.codeText }];
  const typing = reveal > 0.001 && reveal < 0.999;
  return (
    <div
      style={{
        position: "relative",
        fontFamily: MONO,
        fontSize,
        lineHeight: 1.65,
        whiteSpace: "pre",
        clipPath: `inset(0 ${(1 - reveal) * 100}% 0 0)`,
      }}
    >
      {segs.map((s, i) => (
        <span key={i} style={{ color: s.color }}>
          {s.text}
        </span>
      ))}
      {typing && (
        <span
          style={{
            position: "absolute",
            right: `${(1 - reveal) * 100}%`,
            top: "12%",
            width: 3,
            height: "76%",
            background: C.spark400,
            borderRadius: 2,
          }}
        />
      )}
    </div>
  );
};
