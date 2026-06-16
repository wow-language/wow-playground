# wow-playground و

> *"Code likho. Wow bolo."*

The web home for [**wow**](https://github.com/wow-language/wow) — a programming
language with Roman Urdu keywords, built to get kids in Pakistan into coding.

This is a [Next.js](https://nextjs.org) app with three sections:

- **Landing** (`/`) — what wow is, in a glance.
- **Docs** (`/docs`) — the full language reference: keywords, operators, the
  `auzaar` toolbox, and the three targets.
- **Playground** (`/playground`) — type wow and see output instantly.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm start        # serve the build
```

## How the playground runs code

Today the playground runs a small **preview interpreter** (`lib/runner.ts`)
that executes wow's *core* language directly in the browser — `bol`, variables,
math, `agar` / `warna`, the loops, `kaam` / `do`, a useful subset of `auzaar`,
string interpolation, and `phir` pipelines. It gives kids the instant
"type code, see output" loop without a backend.

This is **not** the real compiler. Per the project plan (Phase 7), the
production path is the Rust toolchain compiled to **WebAssembly**, which
compiles a `.wow` file to **C**, **Arduino**, and **Node.js**. When that lands,
it replaces the preview interpreter and the playground's
**C / Arduino / Web** tab will show the generated source for each target.

## Project structure

```
app/
  layout.tsx        # shell: fonts, nav, footer
  page.tsx          # landing
  docs/page.tsx     # language reference
  playground/page.tsx
components/          # Nav, Footer, CodeBlock, RefTable, WowLogo
lib/
  runner.ts         # the preview interpreter
  examples.ts       # starter programs
  docs.ts           # reference tables
  highlight.tsx     # tiny wow syntax highlighter
```

## Tech

- Next.js (App Router) + React + TypeScript
- Tailwind CSS v4

MIT licensed.
