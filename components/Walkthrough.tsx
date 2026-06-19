"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronRight, ListTree } from "lucide-react";
import { highlight } from "@/lib/highlight";
import { useLang } from "./LanguageProvider";
import { dir } from "@/lib/i18n";
import type { WalkStep } from "@/lib/learn";

type UI = {
  walkthrough: string;
  walkHint: string;
  expandAll: string;
  collapseAll: string;
};

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * An interactive, line-by-line breakdown of a code snippet. Each line that
 * carries an explanation becomes tappable; tapping slides the explanation
 * open (GSAP). Lines without text — blank lines, closing braces — are shown
 * for context but stay quiet.
 */
export function Walkthrough({
  steps,
  intro,
  ui,
}: {
  steps: WalkStep[];
  intro?: string;
  ui: UI;
}) {
  const { lang } = useLang();
  const d = dir(lang);
  const interactive = steps
    .map((s, i) => (s.text ? i : -1))
    .filter((i) => i >= 0);

  const [open, setOpen] = useState<Set<number>>(new Set());
  const bodyRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const animate = (i: number, show: boolean) => {
    const el = bodyRefs.current[i];
    if (!el) return;
    gsap.killTweensOf(el);
    if (prefersReduced()) {
      gsap.set(el, { height: show ? "auto" : 0, opacity: show ? 1 : 0 });
      return;
    }
    if (show) {
      gsap.set(el, { height: "auto", opacity: 1 });
      const h = el.offsetHeight;
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        {
          height: h,
          opacity: 1,
          duration: 0.34,
          ease: "power2.out",
          onComplete: () => gsap.set(el, { height: "auto" }),
        }
      );
    } else {
      const h = el.offsetHeight;
      gsap.fromTo(
        el,
        { height: h, opacity: 1 },
        { height: 0, opacity: 0, duration: 0.24, ease: "power2.in" }
      );
    }
  };

  const toggle = (i: number) => {
    setOpen((prev) => {
      const next = new Set(prev);
      const willOpen = !next.has(i);
      if (willOpen) next.add(i);
      else next.delete(i);
      requestAnimationFrame(() => animate(i, willOpen));
      return next;
    });
  };

  const allOpen =
    interactive.length > 0 && interactive.every((i) => open.has(i));

  const toggleAll = () => {
    const willOpen = !allOpen;
    setOpen(() => {
      const next = new Set<number>(willOpen ? interactive : []);
      requestAnimationFrame(() =>
        interactive.forEach((i) => animate(i, willOpen))
      );
      return next;
    });
  };

  return (
    <div className="overflow-hidden rounded-[1.25rem] border border-wow-200 bg-paper shadow-lg shadow-wow-900/5">
      {/* header */}
      <div
        className="flex items-center justify-between gap-3 border-b border-wow-100 px-4 py-2.5"
        dir={d}
      >
        <div className="flex items-center gap-2 min-w-0">
          <ListTree className="h-4 w-4 shrink-0 text-wow-600" />
          <span className="text-sm font-bold text-wow-700">
            {ui.walkthrough}
          </span>
          <span className="hidden truncate text-xs text-muted sm:inline">
            · {ui.walkHint}
          </span>
        </div>
        <button
          onClick={toggleAll}
          className="shrink-0 rounded-full border border-wow-200 px-3 py-1 text-xs font-semibold text-wow-700 transition-colors hover:bg-wow-50"
        >
          {allOpen ? ui.collapseAll : ui.expandAll}
        </button>
      </div>

      {intro && (
        <p className="px-4 pt-3 text-sm leading-relaxed text-ink/80" dir={d}>
          {intro}
        </p>
      )}

      {/* code, line by line — always left-to-right */}
      <div className="m-3 overflow-hidden rounded-xl bg-[#0b2018] py-2" dir="ltr">
        {steps.map((s, i) => {
          const has = !!s.text;
          const isOpen = open.has(i);
          return (
            <div key={i}>
              <div
                role={has ? "button" : undefined}
                tabIndex={has ? 0 : undefined}
                onClick={has ? () => toggle(i) : undefined}
                onKeyDown={
                  has
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          toggle(i);
                        }
                      }
                    : undefined
                }
                className={`flex items-start gap-2 px-3 py-1 font-[family-name:var(--font-mono)] text-[13px] leading-relaxed transition-colors ${
                  has ? "cursor-pointer hover:bg-white/[0.06]" : ""
                } ${isOpen ? "bg-white/[0.06]" : ""}`}
              >
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center">
                  {has && (
                    <ChevronRight
                      className={`h-3.5 w-3.5 text-wow-300 transition-transform duration-200 ${
                        isOpen ? "rotate-90" : ""
                      }`}
                    />
                  )}
                </span>
                <code className="whitespace-pre text-[#e7f5ee]">
                  {s.code === "" ? " " : highlight(s.code)}
                </code>
              </div>
              {has && (
                <div
                  ref={(el) => {
                    bodyRefs.current[i] = el;
                  }}
                  style={{ height: 0, opacity: 0, overflow: "hidden" }}
                >
                  <p
                    dir={d}
                    className="mx-3 my-1.5 rounded-lg border-l-2 border-wow-400 bg-black/25 px-3 py-2 text-[13px] leading-relaxed text-wow-50/85"
                  >
                    {s.text![lang]}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
