"use client";

import { Fragment, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { runWow } from "@/lib/runner";
import { examples, defaultExample } from "@/lib/examples";
import { t, exampleMeta, dir, type Lang } from "@/lib/i18n";
import { LangToggle } from "@/components/LangToggle";

type Tab = "output" | "targets";

// Fill a template like "Hit {run} or {Ctrl}" with React nodes for each token.
function fill(template: string, tokens: Record<string, ReactNode>): ReactNode {
  return template.split(/(\{\w+\})/g).map((part, i) => {
    const m = part.match(/^\{(\w+)\}$/);
    if (m && tokens[m[1]] !== undefined)
      return <Fragment key={i}>{tokens[m[1]]}</Fragment>;
    return <Fragment key={i}>{part}</Fragment>;
  });
}

function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="rounded bg-wow-50 px-1.5 py-0.5 text-xs font-semibold text-wow-700">
      {children}
    </kbd>
  );
}

export default function Playground() {
  const [lang, setLang] = useState<Lang>("en");
  const [code, setCode] = useState(defaultExample.code);
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [ran, setRan] = useState(false);
  const [activeId, setActiveId] = useState(defaultExample.id);
  const [tab, setTab] = useState<Tab>("output");
  const taRef = useRef<HTMLTextAreaElement>(null);

  const L = t[lang];
  const d = dir(lang);

  // restore the saved language preference
  useEffect(() => {
    const saved = localStorage.getItem("wow-lang") as Lang | null;
    if (saved === "en" || saved === "roman" || saved === "ur") setLang(saved);
  }, []);

  const changeLang = (l: Lang) => {
    setLang(l);
    localStorage.setItem("wow-lang", l);
  };

  const run = useCallback(() => {
    const res = runWow(code);
    setOutput(res.output);
    setError(res.error);
    setRan(true);
    setTab("output");
  }, [code]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        run();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [run]);

  const loadExample = (id: string) => {
    const ex = examples.find((e) => e.id === id);
    if (!ex) return;
    setCode(ex.code);
    setActiveId(id);
    setRan(false);
    setOutput("");
    setError(null);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const el = e.currentTarget;
      const { selectionStart: s, selectionEnd: en } = el;
      const updated = code.slice(0, s) + "    " + code.slice(en);
      setCode(updated);
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = s + 4;
      });
    }
  };

  const runWord = <strong className="font-bold text-wow-700">{L.subtitleRunWord}</strong>;

  return (
    <div className="mx-auto max-w-6xl px-5 py-8">
      <header className="mb-6 flex flex-wrap items-start justify-between gap-4" dir={d}>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink">
            {L.title}
          </h1>
          <p className="mt-1 text-muted">{fill(L.subtitle, { run: runWord })}</p>
        </div>
        <LangToggle lang={lang} onChange={changeLang} />
      </header>

      {/* example chips */}
      <div className="mb-4 flex flex-wrap gap-2" dir={d}>
        {examples.map((ex) => {
          const meta = exampleMeta[ex.id]?.[lang] ?? { title: ex.title };
          return (
            <button
              key={ex.id}
              onClick={() => loadExample(ex.id)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                activeId === ex.id
                  ? "bg-wow-600 text-white shadow-sm shadow-wow-600/30"
                  : "border border-wow-200 bg-paper text-wow-700 hover:bg-wow-50"
              }`}
            >
              <span className="mr-1">{ex.emoji}</span>
              {meta.title}
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* editor — always left-to-right */}
        <div className="code-card flex flex-col overflow-hidden shadow-xl shadow-wow-900/10 ring-1 ring-white/5">
          <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
            <span className="font-[family-name:var(--font-mono)] text-xs text-white/50">
              {L.fileName}
            </span>
            <button
              onClick={run}
              className="rounded-full bg-wow-500 px-4 py-1.5 text-sm font-bold text-white transition-colors hover:bg-wow-400"
            >
              ▶ {L.run}
            </button>
          </div>
          <textarea
            ref={taRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            dir="ltr"
            className="h-[26rem] w-full resize-none bg-transparent p-5 font-[family-name:var(--font-mono)] text-sm leading-relaxed text-[#e7f5ee] outline-none placeholder:text-white/30"
            placeholder={'bol "Salam Duniya!"'}
          />
        </div>

        {/* output */}
        <div className="flex flex-col overflow-hidden rounded-[1.25rem] border border-wow-100 bg-paper shadow-xl shadow-wow-900/5">
          <div className="flex gap-1 border-b border-wow-100 px-3 py-2" dir={d}>
            <TabButton active={tab === "output"} onClick={() => setTab("output")}>
              {L.outputTab}
            </TabButton>
            <TabButton active={tab === "targets"} onClick={() => setTab("targets")}>
              {L.targetsTab}
            </TabButton>
          </div>

          {tab === "output" ? (
            <div className="flex-1 overflow-auto p-5">
              {!ran ? (
                <p className="text-sm text-muted" dir={d}>
                  {fill(L.runHint, {
                    run: runWord,
                    Ctrl: <Kbd>Ctrl</Kbd>,
                    Enter: <Kbd>Enter</Kbd>,
                  })}
                </p>
              ) : (
                <>
                  <pre className="whitespace-pre-wrap font-[family-name:var(--font-mono)] text-sm leading-relaxed text-ink">
                    {output || (error ? "" : L.noOutput)}
                  </pre>
                  {error && (
                    <div
                      className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 font-[family-name:var(--font-mono)] text-sm text-red-700"
                      dir={d}
                    >
                      {L.errorLabel}: {error}
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            <div className="flex-1 space-y-3 overflow-auto p-5 text-sm text-muted" dir={d}>
              <p>{L.targetsIntro}</p>
              <p>{L.targetsBody}</p>
              <div className="grid grid-cols-3 gap-2 pt-1" dir="ltr">
                {["🖥️ C", "🔌 Arduino", "🌐 Node.js"].map((tg) => (
                  <div
                    key={tg}
                    className="rounded-xl border border-dashed border-wow-200 bg-wow-50/50 py-4 text-center text-xs font-semibold text-wow-700"
                  >
                    {tg}
                    <div className="mt-1 font-normal text-muted">{L.soon}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-muted" dir={d}>
        {L.footerNote}
      </p>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
        active ? "bg-wow-100 text-wow-800" : "text-muted hover:bg-wow-50"
      }`}
    >
      {children}
    </button>
  );
}
