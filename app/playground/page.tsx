"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { runWow } from "@/lib/runner";
import { examples, defaultExample } from "@/lib/examples";

type Tab = "output" | "targets";

export default function Playground() {
  const [code, setCode] = useState(defaultExample.code);
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [ran, setRan] = useState(false);
  const [activeId, setActiveId] = useState(defaultExample.id);
  const [tab, setTab] = useState<Tab>("output");
  const taRef = useRef<HTMLTextAreaElement>(null);

  const run = useCallback(() => {
    const res = runWow(code);
    setOutput(res.output);
    setError(res.error);
    setRan(true);
    setTab("output");
  }, [code]);

  // Ctrl/Cmd + Enter to run
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

  // support Tab key inserting spaces in the editor
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

  return (
    <div className="mx-auto max-w-6xl px-5 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink">
          Playground
        </h1>
        <p className="mt-1 text-muted">
          wow likho, <kbd className="rounded bg-wow-50 px-1.5 py-0.5 text-xs font-semibold text-wow-700">Chalao</kbd> dabao, aur output dekho.
        </p>
      </header>

      {/* example chips */}
      <div className="mb-4 flex flex-wrap gap-2">
        {examples.map((ex) => (
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
            {ex.title}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* editor */}
        <div className="code-card flex flex-col overflow-hidden shadow-xl shadow-wow-900/10 ring-1 ring-white/5">
          <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
            <span className="font-[family-name:var(--font-mono)] text-xs text-white/50">
              mera_code.wow
            </span>
            <button
              onClick={run}
              className="rounded-full bg-wow-500 px-4 py-1.5 text-sm font-bold text-white transition-colors hover:bg-wow-400"
            >
              ▶ Chalao
            </button>
          </div>
          <textarea
            ref={taRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            className="h-[26rem] w-full resize-none bg-transparent p-5 font-[family-name:var(--font-mono)] text-sm leading-relaxed text-[#e7f5ee] outline-none placeholder:text-white/30"
            placeholder={'bol "Salam Duniya!"'}
          />
        </div>

        {/* output */}
        <div className="flex flex-col overflow-hidden rounded-[1.25rem] border border-wow-100 bg-paper shadow-xl shadow-wow-900/5">
          <div className="flex gap-1 border-b border-wow-100 px-3 py-2">
            <TabButton active={tab === "output"} onClick={() => setTab("output")}>
              Output
            </TabButton>
            <TabButton active={tab === "targets"} onClick={() => setTab("targets")}>
              C / Arduino / Web
            </TabButton>
          </div>

          {tab === "output" ? (
            <div className="flex-1 overflow-auto p-5">
              {!ran ? (
                <p className="text-sm text-muted">
                  <span className="font-semibold text-wow-700">Chalao</span>{" "}
                  dabao ya{" "}
                  <kbd className="rounded bg-wow-50 px-1.5 py-0.5 text-xs font-semibold text-wow-700">
                    Ctrl
                  </kbd>{" "}
                  +{" "}
                  <kbd className="rounded bg-wow-50 px-1.5 py-0.5 text-xs font-semibold text-wow-700">
                    Enter
                  </kbd>{" "}
                  — output yahan dikhega.
                </p>
              ) : (
                <>
                  <pre className="whitespace-pre-wrap font-[family-name:var(--font-mono)] text-sm leading-relaxed text-ink">
                    {output || (error ? "" : "(koi output nahi)")}
                  </pre>
                  {error && (
                    <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 font-[family-name:var(--font-mono)] text-sm text-red-700">
                      Ghalti: {error}
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            <div className="flex-1 space-y-3 overflow-auto p-5 text-sm text-muted">
              <p>
                Yeh playground abhi ek{" "}
                <strong className="text-ink">preview interpreter</strong> par
                chalta hai jo wow ki core language seedha browser mein chalata
                hai.
              </p>
              <p>
                Mukammal compiler — jo wahi <code className="rounded bg-wow-50 px-1 text-wow-700">.wow</code>{" "}
                file ko <strong>C</strong>, <strong>Arduino</strong>, aur{" "}
                <strong>Node.js</strong> mein badalta hai — Rust se banaya gaya
                hai aur WebAssembly ke zariye yahan aane wala hai. Tab yeh tab
                generated code dikhayega.
              </p>
              <div className="grid grid-cols-3 gap-2 pt-1">
                {["🖥️ C", "🔌 Arduino", "🌐 Node.js"].map((t) => (
                  <div
                    key={t}
                    className="rounded-xl border border-dashed border-wow-200 bg-wow-50/50 py-4 text-center text-xs font-semibold text-wow-700"
                  >
                    {t}
                    <div className="mt-1 font-normal text-muted">jald</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-muted">
        Preview interpreter core language chalata hai (bol, agar/warna, loops,
        banao/bhejo, auzaar, phir). Poora compiler — teeno targets ke saath — WASM
        ke zariye jald aa raha hai.
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
  children: React.ReactNode;
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
