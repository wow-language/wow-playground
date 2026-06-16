/*
  A small, friendly in-browser interpreter for the CORE of wow.
  ------------------------------------------------------------------
  This is a PREVIEW runner so the playground gives kids the instant
  "type code, see output" loop today. It covers the core language:
  bol, variables, math, agar/warna, the loops, banao/bhejo, a useful set
  of auzaar tools, string interpolation, and phir pipelines.

  It is NOT the real compiler. The production path — per the plan — is
  the Rust toolchain compiled to WebAssembly, which compiles a .wow
  file to C / Arduino / Node. When that lands it replaces this file.

  Anything it doesn't understand returns a friendly Roman Urdu note
  rather than crashing.
*/

export type RunResult = { output: string; error: string | null };

const MAX_STEPS = 200_000;
const MAX_OUTPUT_LINES = 2000;

class WowError extends Error {}
class BreakSignal {}
class ContinueSignal {}
class ReturnSignal {
  value: unknown;
  constructor(value: unknown) {
    this.value = value;
  }
}

export function runWow(source: string): RunResult {
  const out: string[] = [];
  let steps = 0;
  const tick = () => {
    if (++steps > MAX_STEPS)
      throw new WowError("Program bohat lamba chal raha hai (loop ruka nahi).");
  };
  const emit = (line: string) => {
    if (out.length >= MAX_OUTPUT_LINES)
      throw new WowError("Bohat zyada output — kuch kam karo.");
    out.push(line);
  };

  try {
    const stmts = parseBlock(lex(source));
    const globals: Scope = { vars: {}, funcs: {}, parent: null };
    execBlock(stmts, globals, { tick, emit });
    return { output: out.join("\n"), error: null };
  } catch (e) {
    if (e instanceof WowError) return { output: out.join("\n"), error: e.message };
    if (e instanceof ReturnSignal) return { output: out.join("\n"), error: null };
    return {
      output: out.join("\n"),
      error:
        "Yeh program is preview mein abhi poora nahi chala. (Mukammal compiler jald aa raha hai.)",
    };
  }
}

/* ---- lexing into logical lines ---- */

type Line = { text: string };

function lex(source: string): Line[] {
  const rawLines = source.split("\n").map(stripComment);
  const merged: string[] = [];
  for (const line of rawLines) {
    const t = line.trim();
    if (t.startsWith("phir ") || t === "phir") {
      if (merged.length) merged[merged.length - 1] += " " + t;
    } else {
      merged.push(line);
    }
  }
  return merged.map((text) => ({ text: text.trim() })).filter((l) => l.text);
}

function stripComment(line: string): string {
  let inStr = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') inStr = !inStr;
    else if (c === "#" && !inStr) return line.slice(0, i);
  }
  return line;
}

/* ---- statement parsing ---- */

type Param = { name: string; def: string | null };

type Stmt =
  | { kind: "bol"; expr: string }
  | { kind: "assign"; targets: string[]; expr: string }
  | { kind: "expr"; expr: string }
  | { kind: "bhejo"; expr: string }
  | { kind: "roko" }
  | { kind: "aage" }
  | { kind: "if"; branches: { cond: string | null; body: Stmt[] }[] }
  | { kind: "forRange"; varName: string; from: string; to: string; body: Stmt[] }
  | { kind: "forEach"; varName: string; list: string; body: Stmt[] }
  | { kind: "times"; count: string; body: Stmt[] }
  | { kind: "while"; cond: string; body: Stmt[] }
  | { kind: "banao"; name: string; params: Param[]; body: Stmt[] };

function parseBlock(lines: Line[]): Stmt[] {
  return parseUntilClose(lines, 0, false).stmts;
}

function parseUntilClose(
  lines: Line[],
  start: number,
  expectClose: boolean
): { stmts: Stmt[]; next: number } {
  const stmts: Stmt[] = [];
  let i = start;
  while (i < lines.length) {
    const text = lines[i].text;
    if (text === "}" || text.startsWith("} ")) {
      if (expectClose) return { stmts, next: i };
      i++;
      continue;
    }
    if (text.endsWith("{")) {
      const parsed = parseHead(text.slice(0, -1).trim(), lines, i);
      stmts.push(parsed.stmt);
      i = parsed.next;
      continue;
    }
    stmts.push(parseSimple(text));
    i++;
  }
  return { stmts, next: i };
}

function parseHead(
  head: string,
  lines: Line[],
  openIndex: number
): { stmt: Stmt; next: number } {
  const { stmts: body, next: closeIdx } = parseUntilClose(lines, openIndex + 1, true);

  if (head.startsWith("agar ")) {
    const branches: { cond: string | null; body: Stmt[] }[] = [
      { cond: head.slice(5).trim(), body },
    ];
    let idx = closeIdx;
    while (idx < lines.length) {
      const close = lines[idx].text;
      if (close.startsWith("} warna agar ") && close.endsWith("{")) {
        const cond = close.slice("} warna agar ".length, -1).trim();
        const sub = parseUntilClose(lines, idx + 1, true);
        branches.push({ cond, body: sub.stmts });
        idx = sub.next;
      } else if (close.startsWith("} warna {")) {
        const sub = parseUntilClose(lines, idx + 1, true);
        branches.push({ cond: null, body: sub.stmts });
        idx = sub.next;
        break;
      } else break;
    }
    return { stmt: { kind: "if", branches }, next: idx + 1 };
  }

  if (head.startsWith("har ")) {
    const rest = head.slice(4).trim();
    const range = rest.match(/^(\w+)\s+(.+?)\s+se\s+(.+?)\s+tak$/);
    if (range)
      return {
        stmt: { kind: "forRange", varName: range[1], from: range[2], to: range[3], body },
        next: closeIdx + 1,
      };
    const each = rest.match(/^(\w+)\s+mein\s+(.+)$/);
    if (each)
      return {
        stmt: { kind: "forEach", varName: each[1], list: each[2], body },
        next: closeIdx + 1,
      };
    throw new WowError("'har' loop samajh nahi aaya.");
  }

  if (head.startsWith("jabtak "))
    return { stmt: { kind: "while", cond: head.slice(7).trim(), body }, next: closeIdx + 1 };

  if (head.startsWith("banao ")) {
    const m = head.slice(6).match(/^(\w+)\s*\((.*)\)$/);
    if (!m) throw new WowError("'banao' ka naam ya () theek nahi.");
    return {
      stmt: { kind: "banao", name: m[1], params: parseParams(m[2]), body },
      next: closeIdx + 1,
    };
  }

  const baar = head.match(/^(.+)\s+baar$/);
  if (baar)
    return { stmt: { kind: "times", count: baar[1].trim(), body }, next: closeIdx + 1 };

  throw new WowError(`Yeh block samajh nahi aaya: "${head}"`);
}

function parseParams(s: string): Param[] {
  const t = s.trim();
  if (!t) return [];
  return splitArgs(t).map((p) => {
    const eq = p.indexOf("=");
    if (eq === -1) return { name: p.trim(), def: null };
    return { name: p.slice(0, eq).trim(), def: p.slice(eq + 1).trim() };
  });
}

function parseSimple(text: string): Stmt {
  if (text === "roko") return { kind: "roko" };
  if (text === "aage") return { kind: "aage" };
  if (text.startsWith("bol ")) return { kind: "bol", expr: text.slice(4).trim() };
  if (text === "bol") return { kind: "bol", expr: '""' };
  if (text.startsWith("bhejo ")) return { kind: "bhejo", expr: text.slice(6).trim() };

  const eq = topLevelAssign(text);
  if (eq !== -1) {
    const targets = text.slice(0, eq).split(",").map((s) => s.trim());
    return { kind: "assign", targets, expr: text.slice(eq + 1).trim() };
  }
  return { kind: "expr", expr: text };
}

function topLevelAssign(text: string): number {
  let depth = 0;
  let inStr = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') inStr = !inStr;
    if (inStr) continue;
    if (c === "(" || c === "[") depth++;
    else if (c === ")" || c === "]") depth--;
    else if (c === "=" && depth === 0) {
      if (text[i + 1] === "=") return -1;
      const prev = text[i - 1];
      if (prev === "!" || prev === "<" || prev === ">") return -1;
      return i;
    }
  }
  return -1;
}

/* ---- execution ---- */

type Scope = {
  vars: Record<string, unknown>;
  funcs: Record<string, { params: Param[]; body: Stmt[] }>;
  parent: Scope | null;
};
type Ctx = { tick: () => void; emit: (s: string) => void };

function execBlock(stmts: Stmt[], scope: Scope, ctx: Ctx) {
  for (const s of stmts) execStmt(s, scope, ctx);
}

function execStmt(s: Stmt, scope: Scope, ctx: Ctx) {
  ctx.tick();
  switch (s.kind) {
    case "bol":
      ctx.emit(wowStr(evalExpr(s.expr, scope, ctx)));
      return;
    case "assign": {
      const val = evalExpr(s.expr, scope, ctx);
      if (s.targets.length === 1) setVar(scope, s.targets[0], val);
      else {
        const arr = Array.isArray(val) ? val : [val];
        s.targets.forEach((t, idx) => setVar(scope, t, arr[idx]));
      }
      return;
    }
    case "expr":
      evalExpr(s.expr, scope, ctx);
      return;
    case "bhejo":
      throw new ReturnSignal(evalExpr(s.expr, scope, ctx));
    case "roko":
      throw new BreakSignal();
    case "aage":
      throw new ContinueSignal();
    case "if":
      for (const b of s.branches)
        if (b.cond === null || truthy(evalExpr(b.cond, scope, ctx))) {
          execBlock(b.body, child(scope), ctx);
          return;
        }
      return;
    case "forRange": {
      const from = Number(evalExpr(s.from, scope, ctx));
      const to = Number(evalExpr(s.to, scope, ctx));
      for (let i = from; i <= to; i++) {
        ctx.tick();
        const sc = child(scope);
        sc.vars[s.varName] = i;
        if (loopBody(s.body, sc, ctx)) break;
      }
      return;
    }
    case "forEach": {
      const list = evalExpr(s.list, scope, ctx);
      if (!Array.isArray(list)) throw new WowError("'har ... mein' ke liye list chahiye.");
      for (const item of list) {
        ctx.tick();
        const sc = child(scope);
        sc.vars[s.varName] = item;
        if (loopBody(s.body, sc, ctx)) break;
      }
      return;
    }
    case "times": {
      const n = Number(evalExpr(s.count, scope, ctx));
      for (let i = 0; i < n; i++) {
        ctx.tick();
        if (loopBody(s.body, child(scope), ctx)) break;
      }
      return;
    }
    case "while":
      while (truthy(evalExpr(s.cond, scope, ctx))) {
        ctx.tick();
        if (loopBody(s.body, child(scope), ctx)) break;
      }
      return;
    case "banao":
      scope.funcs[s.name] = { params: s.params, body: s.body };
      return;
  }
}

function loopBody(body: Stmt[], scope: Scope, ctx: Ctx): boolean {
  try {
    execBlock(body, scope, ctx);
  } catch (e) {
    if (e instanceof BreakSignal) return true;
    if (e instanceof ContinueSignal) return false;
    throw e;
  }
  return false;
}

function child(parent: Scope): Scope {
  return { vars: {}, funcs: {}, parent };
}

function setVar(scope: Scope, name: string, val: unknown) {
  let s: Scope | null = scope;
  while (s) {
    if (name in s.vars) {
      s.vars[name] = val;
      return;
    }
    s = s.parent;
  }
  scope.vars[name] = val;
}

function lookupVar(scope: Scope, name: string): unknown {
  let s: Scope | null = scope;
  while (s) {
    if (name in s.vars) return s.vars[name];
    s = s.parent;
  }
  throw new WowError(`'${name}' kahin define nahi hua.`);
}

function lookupFunc(scope: Scope, name: string) {
  let s: Scope | null = scope;
  while (s) {
    if (name in s.funcs) return s.funcs[name];
    s = s.parent;
  }
  return null;
}

function callKaam(
  fn: { params: Param[]; body: Stmt[] },
  args: unknown[],
  scope: Scope,
  ctx: Ctx
): unknown {
  const local = child(scope);
  fn.params.forEach((p, i) => {
    if (i < args.length) local.vars[p.name] = args[i];
    else if (p.def !== null) local.vars[p.name] = evalExpr(p.def, local, ctx);
    else local.vars[p.name] = null;
  });
  try {
    execBlock(fn.body, local, ctx);
  } catch (e) {
    if (e instanceof ReturnSignal) return e.value;
    throw e;
  }
  return null;
}

/* ---- expression tokenizer + Pratt parser ---- */

type Tok = { t: "num" | "str" | "id" | "op" | "punc"; v: string };

function tokenize(src: string): Tok[] {
  const toks: Tok[] = [];
  let i = 0;
  const ops = ["==", "!=", ">=", "<=", "=>", ">", "<", "+", "-", "*", "/", "%"];
  while (i < src.length) {
    const c = src[i];
    if (c === " " || c === "\t") {
      i++;
      continue;
    }
    if (c === '"') {
      let j = i + 1;
      while (j < src.length && src[j] !== '"') j++;
      toks.push({ t: "str", v: src.slice(i + 1, j) });
      i = j + 1;
      continue;
    }
    if (/[0-9]/.test(c) || (c === "." && /[0-9]/.test(src[i + 1] ?? ""))) {
      let j = i;
      while (j < src.length && /[0-9.]/.test(src[j])) j++;
      toks.push({ t: "num", v: src.slice(i, j) });
      i = j;
      continue;
    }
    if (/[A-Za-z_]/.test(c)) {
      let j = i;
      while (j < src.length && /[A-Za-z0-9_]/.test(src[j])) j++;
      toks.push({ t: "id", v: src.slice(i, j) });
      i = j;
      continue;
    }
    if ("()[],".includes(c)) {
      toks.push({ t: "punc", v: c });
      i++;
      continue;
    }
    const two = src.slice(i, i + 2);
    const matched = ops.find((o) => o.length === 2 && o === two) ?? ops.find((o) => o.length === 1 && o === c);
    if (matched) {
      toks.push({ t: "op", v: matched });
      i += matched.length;
      continue;
    }
    throw new WowError(`Samajh nahi aaya: "${c}"`);
  }
  return toks;
}

// word-operator precedence (higher binds tighter)
const BINOP: Record<string, number> = {
  ya: 1,
  aur: 2,
  "==": 3, "!=": 3, ">": 3, "<": 3, ">=": 3, "<=": 3,
  "+": 4, "-": 4,
  "*": 5, "/": 5, "%": 5,
};

function evalExpr(src: string, scope: Scope, ctx: Ctx): unknown {
  const toks = tokenize(src);
  const p = new Parser(toks, scope, ctx);
  const v = p.parseExpr(0);
  return v;
}

class Parser {
  pos = 0;
  toks: Tok[];
  scope: Scope;
  ctx: Ctx;
  constructor(toks: Tok[], scope: Scope, ctx: Ctx) {
    this.toks = toks;
    this.scope = scope;
    this.ctx = ctx;
  }

  peek(): Tok | undefined {
    return this.toks[this.pos];
  }
  next(): Tok | undefined {
    return this.toks[this.pos++];
  }

  // word-ternary: A agar COND warna B  (lowest precedence, handled here)
  parseExpr(minPrec: number): unknown {
    let left = this.parseBinary(minPrec);
    const t = this.peek();
    if (t && t.t === "id" && t.v === "agar") {
      this.next();
      const cond = this.parseBinary(0);
      const w = this.next();
      if (!w || w.v !== "warna") throw new WowError("ternary mein 'warna' chahiye.");
      const right = this.parseExpr(0);
      return truthy(cond) ? left : right;
    }
    return left;
  }

  parseBinary(minPrec: number): unknown {
    let left = this.parseUnary();
    while (true) {
      const t = this.peek();
      if (!t) break;
      const op = t.t === "op" ? t.v : t.t === "id" && (t.v === "aur" || t.v === "ya") ? t.v : null;
      if (op === null) break;
      const prec = BINOP[op];
      if (prec === undefined || prec < minPrec) break;
      this.next();
      // short-circuit logicals
      if (op === "aur") {
        const r = this.parseBinary(prec + 1);
        left = truthy(left) ? truthy(r) : false;
        continue;
      }
      if (op === "ya") {
        const r = this.parseBinary(prec + 1);
        left = truthy(left) ? true : truthy(r);
        continue;
      }
      const right = this.parseBinary(prec + 1);
      left = applyOp(op, left, right);
    }
    // phir pipeline (very low precedence chaining)
    return this.parsePipe(left, minPrec);
  }

  parsePipe(left: unknown, minPrec: number): unknown {
    while (minPrec === 0) {
      const t = this.peek();
      if (!(t && t.t === "id" && t.v === "phir")) break;
      this.next();
      const fnTok = this.next();
      if (!fnTok || fnTok.t !== "id") throw new WowError("'phir' ke baad function chahiye.");
      let args: ArgSpec[] = [];
      if (this.peek()?.v === "(") args = this.readArgs();
      left = callAuzaar(fnTok.v, [{ kind: "value", value: left }, ...args], this.scope, this.ctx);
    }
    return left;
  }

  parseUnary(): unknown {
    const t = this.peek();
    if (t && t.t === "op" && t.v === "-") {
      this.next();
      return -Number(this.parseUnary());
    }
    if (t && t.t === "id" && t.v === "nahi") {
      this.next();
      return !truthy(this.parseUnary());
    }
    return this.parsePrimary();
  }

  parsePrimary(): unknown {
    const t = this.next();
    if (!t) throw new WowError("Expression adhoora hai.");
    if (t.t === "num") return Number(t.v);
    if (t.t === "str") return interpolate(t.v, this.scope, this.ctx);
    if (t.v === "(") {
      const v = this.parseExpr(0);
      if (this.next()?.v !== ")") throw new WowError("')' chahiye.");
      return v;
    }
    if (t.v === "[") {
      const items: unknown[] = [];
      if (this.peek()?.v !== "]") {
        items.push(this.parseExpr(0));
        while (this.peek()?.v === ",") {
          this.next();
          items.push(this.parseExpr(0));
        }
      }
      if (this.next()?.v !== "]") throw new WowError("']' chahiye.");
      return items;
    }
    if (t.t === "id") {
      if (t.v === "sahi") return true;
      if (t.v === "ghalat") return false;
      if (t.v === "khali") return null;
      // call?
      if (this.peek()?.v === "(") {
        const args = this.readArgs();
        return this.invoke(t.v, args);
      }
      return lookupVar(this.scope, t.v);
    }
    throw new WowError(`Samajh nahi aaya: "${t.v}"`);
  }

  // read raw argument specs: each is either an evaluated value or a
  // predicate expression (token slice) for higher-order auzaar tools.
  readArgs(): ArgSpec[] {
    this.next(); // (
    const args: ArgSpec[] = [];
    if (this.peek()?.v === ")") {
      this.next();
      return args;
    }
    do {
      args.push(this.readOneArg());
    } while (this.peek()?.v === "," && this.next());
    if (this.next()?.v !== ")") throw new WowError("')' chahiye.");
    return args;
  }

  // capture tokens for one argument up to top-level , or ) — keep both a
  // lazily-evaluable expression AND its immediate value.
  readOneArg(): ArgSpec {
    const start = this.pos;
    let depth = 0;
    while (this.pos < this.toks.length) {
      const t = this.toks[this.pos];
      if (t.v === "(" || t.v === "[") depth++;
      else if (t.v === ")" || t.v === "]") {
        if (depth === 0) break;
        depth--;
      } else if (t.v === "," && depth === 0) break;
      this.pos++;
    }
    const slice = this.toks.slice(start, this.pos);
    return { kind: "tokens", toks: slice, scope: this.scope, ctx: this.ctx };
  }

  invoke(name: string, args: ArgSpec[]): unknown {
    const userFn = lookupFunc(this.scope, name);
    if (userFn) {
      const vals = args.map((a) => resolveArg(a));
      return callKaam(userFn, vals, this.scope, this.ctx);
    }
    return callAuzaar(name, args, this.scope, this.ctx);
  }
}

type ArgSpec =
  | { kind: "value"; value: unknown }
  | { kind: "tokens"; toks: Tok[]; scope: Scope; ctx: Ctx };

function resolveArg(a: ArgSpec): unknown {
  if (a.kind === "value") return a.value;
  const p = new Parser(a.toks, a.scope, a.ctx);
  return p.parseExpr(0);
}

// evaluate a predicate arg with `x` (and optional acc) bound
function asPredicate(a: ArgSpec): (x: unknown, acc?: unknown) => unknown {
  if (a.kind === "value") return () => a.value;
  return (x: unknown, acc?: unknown) => {
    const sc = child(a.scope);
    sc.vars["x"] = x;
    if (acc !== undefined) sc.vars["acc"] = acc;
    const p = new Parser(a.toks, sc, a.ctx);
    return p.parseExpr(0);
  };
}

function applyOp(op: string, a: unknown, b: unknown): unknown {
  switch (op) {
    case "+":
      if (typeof a === "string" || typeof b === "string") return wowStr(a) + wowStr(b);
      return Number(a) + Number(b);
    case "-":
      return Number(a) - Number(b);
    case "*":
      return Number(a) * Number(b);
    case "/":
      if (Number(b) === 0) throw new WowError("sifr se taqseem nahi ho sakta");
      return Number(a) / Number(b);
    case "%":
      return Number(a) % Number(b);
    case "==":
      return a === b;
    case "!=":
      return a !== b;
    case ">":
      return Number(a) > Number(b);
    case "<":
      return Number(a) < Number(b);
    case ">=":
      return Number(a) >= Number(b);
    case "<=":
      return Number(a) <= Number(b);
  }
  throw new WowError(`Operator "${op}" abhi support nahi.`);
}

/* ---- string interpolation: "Salam {naam}" ---- */

function interpolate(raw: string, scope: Scope, ctx: Ctx): string {
  let out = "";
  let i = 0;
  while (i < raw.length) {
    const c = raw[i];
    if (c === "{") {
      const end = raw.indexOf("}", i);
      if (end === -1) {
        out += raw.slice(i);
        break;
      }
      const inner = raw.slice(i + 1, end).trim();
      out += wowStr(evalExpr(inner, scope, ctx));
      i = end + 1;
    } else {
      out += c;
      i++;
    }
  }
  return out;
}

/* ---- auzaar toolbox (the realistic in-browser subset) ---- */

function callAuzaar(name: string, args: ArgSpec[], scope: Scope, ctx: Ctx): unknown {
  const v = (i: number) => resolveArg(args[i]);
  const list = (i: number): unknown[] => {
    const x = resolveArg(args[i]);
    if (!Array.isArray(x)) throw new WowError(`'${name}' ko list chahiye.`);
    return x;
  };

  switch (name) {
    // collections
    case "chuno":
      return list(0).filter((x) => truthy(asPredicate(args[1])(x)));
    case "badlo":
      return list(0).map((x) => asPredicate(args[1])(x));
    case "dhundo":
      return list(0).find((x) => truthy(asPredicate(args[1])(x))) ?? null;
    case "joro": {
      const pred = asPredicate(args[1]);
      const start = args.length > 2 ? v(2) : 0;
      return list(0).reduce((acc, x) => pred(x, acc), start as unknown);
    }
    case "shamil":
      return list(0).includes(v(1));
    case "ginti":
      return list(0).length;
    case "jama":
      return list(0).reduce((a: number, b) => a + Number(b), 0);
    case "max":
      return Math.max(...list(0).map(Number));
    case "min":
      return Math.min(...list(0).map(Number));
    case "tarteeb":
      return [...list(0)].sort((a, b) =>
        typeof a === "number" && typeof b === "number"
          ? a - b
          : wowStr(a).localeCompare(wowStr(b))
      );
    case "ulta":
      return [...list(0)].reverse();
    case "alag":
      return [...new Set(list(0))];
    case "pehla":
      return list(0)[0] ?? null;
    case "aakhri": {
      const l = list(0);
      return l[l.length - 1] ?? null;
    }
    case "silsila": {
      const a = Number(v(0));
      const b = Number(v(1));
      const r: number[] = [];
      for (let k = a; k <= b; k++) r.push(k);
      return r;
    }
    // strings
    case "toro":
      return String(v(0)).split(String(v(1)));
    case "milao":
      return list(0).map(wowStr).join(String(v(1)));
    case "saaf":
      return String(v(0)).trim();
    case "tabdeel":
      return String(v(0)).split(String(v(1))).join(String(v(2)));
    case "lambai": {
      const x = v(0);
      return Array.isArray(x) ? x.length : String(x).length;
    }
    case "bara_likho":
      return String(v(0)).toUpperCase();
    case "chota_likho":
      return String(v(0)).toLowerCase();
    // math
    case "random":
      return Math.random();
    case "random_number":
      return Math.floor(Math.random() * (Number(v(1)) - Number(v(0)) + 1)) + Number(v(0));
    case "round":
      return Math.round(Number(v(0)));
    case "round_up":
      return Math.ceil(Number(v(0)));
    case "round_down":
      return Math.floor(Number(v(0)));
    case "square_root":
      return Math.sqrt(Number(v(0)));
    case "power":
      return Math.pow(Number(v(0)), Number(v(1)));
    case "absolute":
      return Math.abs(Number(v(0)));
  }
  throw new WowError(`'${name}' is preview mein abhi available nahi hai.`);
}

/* ---- value helpers ---- */

function splitArgs(s: string): string[] {
  const out: string[] = [];
  let depth = 0;
  let inStr = false;
  let cur = "";
  for (const c of s) {
    if (c === '"') inStr = !inStr;
    if (!inStr) {
      if (c === "(" || c === "[") depth++;
      else if (c === ")" || c === "]") depth--;
      else if (c === "," && depth === 0) {
        out.push(cur.trim());
        cur = "";
        continue;
      }
    }
    cur += c;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

function truthy(v: unknown): boolean {
  if (v === false || v === null || v === undefined) return false;
  if (v === 0 || v === "") return false;
  return true;
}

function wowStr(v: unknown): string {
  if (v === true) return "sahi";
  if (v === false) return "ghalat";
  if (v === null || v === undefined) return "khali";
  if (Array.isArray(v)) return "[" + v.map(wowStr).join(", ") + "]";
  if (typeof v === "number" && Number.isInteger(v)) return String(v);
  return String(v);
}

export default runWow;
