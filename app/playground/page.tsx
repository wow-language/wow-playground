"use client";

import { Fragment, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Monitor, Globe } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { runWow } from "@/lib/runner";
import { examples, defaultExample } from "@/lib/examples";
import { t, exampleMeta, dir } from "@/lib/i18n";
import { useLang } from "@/components/LanguageProvider";
import { WowIcon, ArduinoIcon } from "@/components/BrandIcon";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
  const { lang } = useLang();
  const [code, setCode] = useState(defaultExample.code);
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [ran, setRan] = useState(false);
  const [activeId, setActiveId] = useState(defaultExample.id);
  const [tab, setTab] = useState<Tab>("output");
  const [runSeq, setRunSeq] = useState(0);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const runBtnRef = useRef<HTMLButtonElement>(null);
  const outRef = useRef<HTMLDivElement>(null);

  const L = t[lang].pg;
  const d = dir(lang);

  const run = useCallback(() => {
    const res = runWow(code);
    setOutput(res.output);
    setError(res.error);
    setRan(true);
    setTab("output");
    setRunSeq((n) => n + 1);
    if (runBtnRef.current && !reduced()) {
      gsap.fromTo(
        runBtnRef.current,
        { scale: 0.88 },
        { scale: 1, duration: 0.45, ease: "elastic.out(1, 0.5)" }
      );
    }
  }, [code]);

  // Entrance: header, example chips, and the two panels glide in on mount.
  useGSAP(
    () => {
      if (reduced()) return;
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.from(".pg-head", { opacity: 0, y: 18, duration: 0.5 })
        .from(
          ".pg-chip",
          { opacity: 0, y: 12, stagger: 0.05, duration: 0.4 },
          "-=0.25"
        )
        .from(
          ".pg-panel",
          { opacity: 0, y: 24, scale: 0.985, stagger: 0.12, duration: 0.5 },
          "-=0.2"
        );
    },
    { scope: rootRef }
  );

  // On each run, stagger the output lines in — and shake on error.
  useGSAP(
    () => {
      if (!ran || reduced()) return;
      if (error) {
        gsap.fromTo(
          outRef.current,
          { x: -8 },
          { x: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" }
        );
      }
      const lines = gsap.utils.toArray<HTMLElement>(".out-line");
      if (lines.length) {
        gsap.from(lines, {
          opacity: 0,
          y: 8,
          duration: 0.32,
          stagger: 0.04,
          ease: "power2.out",
        });
      }
    },
    { dependencies: [runSeq], scope: rootRef }
  );

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
    <div className="mx-auto max-w-6xl px-5 py-8" ref={rootRef}>
      <header className="pg-head mb-6" dir={d}>
        <h1 className="text-3xl font-extrabold tracking-tight text-ink">
          {L.title}
        </h1>
        <p className="mt-1 text-muted">{fill(L.subtitle, { run: runWord })}</p>
      </header>

      {/* example chips */}
      <div className="mb-4 flex flex-wrap gap-2" dir={d}>
        {examples.map((ex) => {
          const meta = exampleMeta[ex.id]?.[lang] ?? { title: ex.title };
          return (
            <button
              key={ex.id}
              onClick={() => loadExample(ex.id)}
              className={`pg-chip rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                activeId === ex.id
                  ? "bg-wow-600 text-white shadow-sm shadow-wow-600/30"
                  : "border border-wow-200 bg-paper text-wow-700 hover:bg-wow-50"
              }`}
            >
              <WowIcon name={ex.icon} size={14} className="inline mr-1.5 -mt-0.5 text-wow-500" />
              {meta.title}
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* editor, always left-to-right */}
        <div className="pg-panel code-card flex flex-col overflow-hidden shadow-xl shadow-wow-900/10 ring-1 ring-white/5">
          <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
            <span className="font-[family-name:var(--font-mono)] text-xs text-white/50">
              {L.fileName}
            </span>
            <button
              ref={runBtnRef}
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
            placeholder={'likho "Salam Duniya!"'}
          />
        </div>

        {/* output */}
        <div className="pg-panel flex flex-col overflow-hidden rounded-3xl border border-wow-100 bg-paper shadow-xl shadow-wow-900/5">
          <div className="flex gap-1 border-b border-wow-100 px-3 py-2" dir={d}>
            <TabButton active={tab === "output"} onClick={() => setTab("output")}>
              {L.outputTab}
            </TabButton>
            <TabButton active={tab === "targets"} onClick={() => setTab("targets")}>
              {L.targetsTab}
            </TabButton>
          </div>

          {tab === "output" ? (
            <div className="flex-1 overflow-auto p-5" ref={outRef}>
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
                  <div className="font-[family-name:var(--font-mono)] text-sm leading-relaxed text-ink">
                    {output ? (
                      output.split("\n").map((line, i) => (
                        <div key={i} className="out-line whitespace-pre-wrap">
                          {line === "" ? " " : line}
                        </div>
                      ))
                    ) : (
                      <span className="out-line">{error ? "" : L.noOutput}</span>
                    )}
                  </div>
                  {error && (
                    <div
                      className="out-line mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 font-[family-name:var(--font-mono)] text-sm text-red-700"
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
                {[
                  { label: "C", Icon: Monitor },
                  { label: "Arduino", Icon: ArduinoIcon },
                  { label: "Node.js", Icon: Globe },
                ].map(({ label, Icon }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-dashed border-wow-200 bg-wow-50/50 py-4 text-center text-xs font-semibold text-wow-700"
                  >
                    <Icon className="mx-auto h-5 w-5 mb-1" />
                    {label}
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
