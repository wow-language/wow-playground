"use client";

import Link from "next/link";
import { CodeBlock } from "@/components/CodeBlock";
import { useLang } from "@/components/LanguageProvider";
import { t, dir } from "@/lib/i18n";

const heroCode = `banao salam(naam = "dost") {
    bol "Salam {naam}! Kaise ho?"
}

numbers = [1, 5, 3, 8, 2, 9]

bade = numbers phir chuno(x > 4) phir tarteeb

har n mein bade {
    bol "mila: {n}"
}

salam("Ahmad")`;

const featureEmojis = ["🇵🇰", "🎯", "💬", "🧰"];

const targets = [
  { emoji: "🖥️", name: "Desktop", sub: "C program", tint: "from-wow-100 to-wow-50" },
  { emoji: "🔌", name: "Arduino", sub: ".ino sketch", tint: "from-spark-300/40 to-spark-300/10" },
  { emoji: "🌐", name: "Web", sub: "Node.js server", tint: "from-wow-100 to-wow-50" },
];

export function Landing() {
  const { lang } = useLang();
  const h = t[lang].home;
  const d = dir(lang);

  return (
    <>
      {/* Hero */}
      <section className="glow-bg">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:py-24 lg:grid-cols-2 lg:gap-14">
          <div dir={d}>
            <span className="inline-flex items-center gap-2 rounded-full border border-wow-200 bg-wow-50 px-3.5 py-1.5 text-sm font-semibold text-wow-700">
              <span className="font-[family-name:var(--font-urdu)] text-base leading-none">
                و
              </span>
              {h.badge}
            </span>

            <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl">
              {h.title1}
              <br />
              {h.t2pre}
              <span className="text-wow-600">{h.t2word}</span>
              {h.t2post}
            </h1>

            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
              <strong className="font-bold text-ink">wow</strong>
              {h.leadRest}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/playground"
                className="rounded-full bg-wow-600 px-6 py-3 text-base font-bold text-white shadow-lg shadow-wow-600/30 transition-transform hover:scale-[1.03] hover:bg-wow-700"
              >
                {h.btnPlayground}
              </Link>
              <Link
                href="/docs"
                className="rounded-full border border-wow-200 bg-paper px-6 py-3 text-base font-bold text-wow-700 transition-colors hover:bg-wow-50"
              >
                {h.btnDocs}
              </Link>
            </div>
          </div>

          <div className="relative">
            <span
              aria-hidden
              className="animate-floaty pointer-events-none absolute -right-4 -top-16 select-none font-[family-name:var(--font-urdu)] text-[10rem] leading-none text-wow-600/10 sm:text-[14rem]"
            >
              و
            </span>
            <CodeBlock code={heroCode} caption="salam.wow" />
          </div>
        </div>
      </section>

      {/* Targets */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-wow-600">
          {h.targetsLabel}
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {targets.map((tg) => (
            <div
              key={tg.name}
              className={`rounded-2xl bg-gradient-to-br ${tg.tint} p-6 text-center ring-1 ring-wow-100`}
            >
              <div className="text-4xl">{tg.emoji}</div>
              <h3 className="mt-3 text-lg font-bold text-ink">{tg.name}</h3>
              <p className="font-[family-name:var(--font-mono)] text-sm text-muted">
                {tg.sub}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-5 py-12" dir={d}>
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-ink">
          {h.featuresHeading}
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {h.features.map((f, i) => (
            <div
              key={f.title}
              className="rounded-2xl border border-wow-100 bg-paper p-6 transition-shadow hover:shadow-lg hover:shadow-wow-900/5"
            >
              <div className="text-3xl">{featureEmojis[i]}</div>
              <h3 className="mt-3 text-xl font-bold text-ink">{f.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-20 pt-8">
        <div className="glow-bg overflow-hidden rounded-3xl border border-wow-200 bg-paper p-10 text-center sm:p-14" dir={d}>
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            {h.ctaHeading}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-lg text-muted">{h.ctaSub}</p>
          <Link
            href="/playground"
            className="mt-7 inline-block rounded-full bg-wow-600 px-7 py-3.5 text-lg font-bold text-white shadow-lg shadow-wow-600/30 transition-transform hover:scale-[1.03] hover:bg-wow-700"
          >
            {h.ctaBtn}
          </Link>
        </div>
      </section>
    </>
  );
}
