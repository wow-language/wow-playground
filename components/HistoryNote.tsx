"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollText, Plus } from "lucide-react";
import { useLang } from "./LanguageProvider";
import { dir } from "@/lib/i18n";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * A collapsible "story behind the idea" card. Starts closed so it never gets
 * in the way of the lesson, and opens with a gentle GSAP slide.
 */
export function HistoryNote({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text: string;
}) {
  const { lang } = useLang();
  const d = dir(lang);
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    const el = bodyRef.current;
    const willOpen = !open;
    setOpen(willOpen);
    if (!el) return;
    gsap.killTweensOf(el);
    if (prefersReduced()) {
      gsap.set(el, { height: willOpen ? "auto" : 0, opacity: willOpen ? 1 : 0 });
      return;
    }
    if (willOpen) {
      gsap.set(el, { height: "auto", opacity: 1 });
      const h = el.offsetHeight;
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        {
          height: h,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => gsap.set(el, { height: "auto" }),
        }
      );
    } else {
      const h = el.offsetHeight;
      gsap.fromTo(
        el,
        { height: h, opacity: 1 },
        { height: 0, opacity: 0, duration: 0.28, ease: "power2.in" }
      );
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-spark-300/70 bg-spark-300/10">
      <button
        onClick={toggle}
        className="flex w-full items-center gap-3 px-4 py-3 text-left"
        dir={d}
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-spark-300/30 text-spark-600">
          <ScrollText className="h-4 w-4" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[11px] font-bold uppercase tracking-widest text-spark-600">
            {label}
          </span>
          <span className="block font-bold text-ink">{title}</span>
        </span>
        <Plus
          className={`h-4 w-4 shrink-0 text-spark-600 transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        />
      </button>
      <div
        ref={bodyRef}
        style={{ height: 0, opacity: 0, overflow: "hidden" }}
      >
        <p
          dir={d}
          className="px-4 pb-4 pt-0 text-sm leading-relaxed text-ink/80"
        >
          {text}
        </p>
      </div>
    </div>
  );
}
