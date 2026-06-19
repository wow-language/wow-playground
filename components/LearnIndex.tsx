"use client";

import Link from "next/link";
import { chapters, learnUi } from "@/lib/learn";
import { WowIcon } from "@/components/BrandIcon";
import { useLang } from "./LanguageProvider";
import { dir } from "@/lib/i18n";

export function LearnIndex() {
  const { lang } = useLang();
  const ui = learnUi[lang];
  const d = dir(lang);

  return (
    <div className="space-y-10" dir={d}>
      <header className="glow-bg rounded-3xl border border-wow-200 bg-paper p-8 sm:p-10">
        <p className="text-sm font-bold uppercase tracking-widest text-wow-600">
          {ui.kicker}
        </p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink">
          {ui.heroTitle}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">{ui.heroSub}</p>
        <Link
          href={`/docs/learn/${chapters[0].slug}`}
          className="mt-6 inline-block rounded-full bg-wow-600 px-6 py-3 text-base font-bold text-white shadow-lg shadow-wow-600/30 transition-transform hover:scale-[1.03] hover:bg-wow-700"
        >
          {ui.start}
        </Link>
      </header>

      <ol className="grid gap-4 sm:grid-cols-2">
        {chapters.map((c, i) => (
          <li key={c.slug}>
            <Link
              href={`/docs/learn/${c.slug}`}
              className="group flex h-full gap-4 rounded-3xl border border-wow-100 bg-paper p-5 transition-shadow hover:shadow-lg hover:shadow-wow-900/5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-wow-50 text-wow-600"><WowIcon name={c.icon} size={22} /></div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-wow-400">
                  {ui.lesson} {i + 1}
                </span>
                <h2 className="mt-0.5 text-lg font-bold text-ink group-hover:text-wow-700">
                  {c.title[lang]}
                </h2>
                <p className="mt-1 text-sm text-muted">{c.concept[lang]}</p>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
