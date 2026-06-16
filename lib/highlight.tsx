import { Fragment, type ReactNode } from "react";

const KEYWORDS = new Set([
  "bol", "rakho", "agar", "warna", "har", "se", "tak", "baar", "jabtak",
  "roko", "aage", "kaam", "do", "sahi", "ghalat", "khali", "aur", "ya",
  "nahi", "lao", "koshish", "pakdo", "pucho", "mein", "phir", "shuru",
  "chalao", "pin_set", "pin_likho", "pin_parho", "intezar", "server",
  "rasta", "jawab", "file_parho", "file_likho", "GET", "POST", "output",
  "on", "off",
]);

/**
 * A deliberately small, forgiving highlighter for wow source. It is not the
 * real lexer — just enough to give code on the page some friendly colour.
 * Order matters: comments and strings are pulled out before we look at words.
 */
export function highlight(code: string): ReactNode {
  const lines = code.split("\n");
  return lines.map((line, i) => (
    <Fragment key={i}>
      {highlightLine(line)}
      {i < lines.length - 1 ? "\n" : null}
    </Fragment>
  ));
}

function highlightLine(line: string): ReactNode {
  // whole-line comment
  const commentIdx = line.indexOf("#");
  if (commentIdx !== -1) {
    const before = line.slice(0, commentIdx);
    const comment = line.slice(commentIdx);
    return (
      <>
        {highlightCode(before)}
        <span className="tok-com">{comment}</span>
      </>
    );
  }
  return highlightCode(line);
}

function highlightCode(text: string): ReactNode {
  // split on strings first so we never tokenize inside them
  const parts = text.split(/("[^"]*")/g);
  return parts.map((part, i) => {
    if (part.startsWith('"') && part.endsWith('"')) {
      return (
        <span key={i} className="tok-str">
          {part}
        </span>
      );
    }
    return <Fragment key={i}>{highlightWords(part)}</Fragment>;
  });
}

function highlightWords(text: string): ReactNode {
  // keep delimiters so spacing/punctuation survives
  const tokens = text.split(/(\b)/);
  return tokens.map((tok, i) => {
    if (KEYWORDS.has(tok)) {
      return (
        <span key={i} className="tok-kw">
          {tok}
        </span>
      );
    }
    if (/^\d+(\.\d+)?$/.test(tok)) {
      return (
        <span key={i} className="tok-num">
          {tok}
        </span>
      );
    }
    return <Fragment key={i}>{tok}</Fragment>;
  });
}
