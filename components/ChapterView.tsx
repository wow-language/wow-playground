"use client";

import Link from "next/link";
import { CodeBlock } from "@/components/CodeBlock";
import { chapters, chapterBySlug, learnUi, type Block } from "@/lib/learn";
import { useLang } from "./LanguageProvider";
import { dir, type Lang } from "@/lib/i18n";

export function ChapterView({ slug }: { slug: string }) {
  const { lang } = useLang();
  const ui = learnUi[lang];
  const d = dir(lang);

  const ch = chapterBySlug(slug);
  if (!ch) return null;

  const idx = chapters.findIndex((c) => c.slug === slug);
  const prev = idx > 0 ? chapters[idx - 1] : null;
  const next = idx < chapters.length - 1 ? chapters[idx + 1] : null;

  return (
    <article className="max-w-2xl" dir={d}>
      <Link
        href="/docs/learn"
        className="text-sm font-semibold text-wow-600 hover:text-wow-700"
      >
        {ui.allLessons}
      </Link>

      <header className="mt-4 flex items-start gap-4">
        <span className="text-4xl">{ch.emoji}</span>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-wow-400">
            {ui.lesson} {idx + 1}
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink">
            {ch.title[lang]}
          </h1>
          <p className="mt-1 text-muted">{ch.concept[lang]}</p>
        </div>
      </header>

      <div className="mt-8 space-y-5">
        {ch.blocks.map((b, i) => (
          <BlockView key={i} block={b} lang={lang} ui={ui} />
        ))}
      </div>

      <nav className="mt-12 flex items-stretch gap-3 border-t border-wow-100 pt-6">
        {prev ? (
          <Link
            href={`/docs/learn/${prev.slug}`}
            className="flex-1 rounded-xl border border-wow-100 bg-paper p-4 transition-colors hover:bg-wow-50"
          >
            <div className="text-xs font-semibold text-muted">← {ui.previous}</div>
            <div className="font-bold text-ink">
              {prev.emoji} {prev.title[lang]}
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {next ? (
          <Link
            href={`/docs/learn/${next.slug}`}
            className="flex-1 rounded-xl border border-wow-100 bg-paper p-4 text-right transition-colors hover:bg-wow-50"
          >
            <div className="text-xs font-semibold text-muted">{ui.next} →</div>
            <div className="font-bold text-ink">
              {next.title[lang]} {next.emoji}
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </nav>
    </article>
  );
}

function BlockView({
  block,
  lang,
  ui,
}: {
  block: Block;
  lang: Lang;
  ui: (typeof learnUi)[Lang];
}) {
  switch (block.t) {
    case "p":
      return <p className="leading-relaxed text-ink/90">{block.text[lang]}</p>;
    case "h":
      return (
        <h2 className="pt-3 text-xl font-bold tracking-tight text-ink">
          {block.text[lang]}
        </h2>
      );
    case "code":
      // code is always left-to-right
      return (
        <div dir="ltr">
          <CodeBlock code={block.code} />
        </div>
      );
    case "tip":
      return (
        <div className="rounded-xl border border-wow-200 bg-wow-50/60 p-4">
          <div className="mb-1 text-sm font-bold text-wow-700">💡 {ui.goodToKnow}</div>
          <p className="text-sm leading-relaxed text-ink/80">{block.text[lang]}</p>
        </div>
      );
    case "try":
      return (
        <div className="rounded-xl border border-spark-300 bg-spark-300/15 p-4">
          <div className="mb-1 flex items-center justify-between gap-2">
            <span className="text-sm font-bold text-spark-600">🚀 {ui.tryIt}</span>
            <Link
              href="/playground"
              className="rounded-full bg-spark-500 px-3 py-1 text-xs font-bold text-white transition-colors hover:bg-spark-600"
            >
              {ui.openPlayground}
            </Link>
          </div>
          <p className="text-sm leading-relaxed text-ink/80">{block.text[lang]}</p>
        </div>
      );
  }
}
