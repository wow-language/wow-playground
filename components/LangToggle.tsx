"use client";

import { LANGS, type Lang } from "@/lib/i18n";

export function LangToggle({
  lang,
  onChange,
}: {
  lang: Lang;
  onChange: (l: Lang) => void;
}) {
  return (
    <div
      className="inline-flex items-center gap-0.5 rounded-full border border-wow-200 bg-paper p-0.5"
      role="group"
      aria-label="Language"
    >
      {LANGS.map((l) => {
        const active = l.id === lang;
        return (
          <button
            key={l.id}
            onClick={() => onChange(l.id)}
            aria-pressed={active}
            className={`rounded-full px-3 py-1 text-xs font-bold transition-colors ${
              active
                ? "bg-wow-600 text-white shadow-sm shadow-wow-600/30"
                : "text-muted hover:bg-wow-50 hover:text-wow-700"
            } ${l.id === "ur" ? "font-[family-name:var(--font-urdu)] text-sm" : ""}`}
            title={l.label}
          >
            {l.short}
          </button>
        );
      })}
    </div>
  );
}
