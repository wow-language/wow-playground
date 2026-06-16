import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CodeBlock } from "@/components/CodeBlock";
import { chapters, chapterBySlug, type Block } from "@/lib/learn";

export function generateStaticParams() {
  return chapters.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ch = chapterBySlug(slug);
  if (!ch) return { title: "Learn — wow" };
  return { title: `${ch.title} — Learn wow`, description: ch.concept };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ch = chapterBySlug(slug);
  if (!ch) notFound();

  const idx = chapters.findIndex((c) => c.slug === slug);
  const prev = idx > 0 ? chapters[idx - 1] : null;
  const next = idx < chapters.length - 1 ? chapters[idx + 1] : null;

  return (
    <article className="max-w-2xl">
      <Link
        href="/docs/learn"
        className="text-sm font-semibold text-wow-600 hover:text-wow-700"
      >
        ← All lessons
      </Link>

      <header className="mt-4 flex items-start gap-4">
        <span className="text-4xl">{ch.emoji}</span>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-wow-400">
            Lesson {idx + 1}
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink">
            {ch.title}
          </h1>
          <p className="mt-1 text-muted">{ch.concept}</p>
        </div>
      </header>

      <div className="mt-8 space-y-5">
        {ch.blocks.map((b, i) => (
          <BlockView key={i} block={b} />
        ))}
      </div>

      {/* prev / next */}
      <nav className="mt-12 flex items-stretch gap-3 border-t border-wow-100 pt-6">
        {prev ? (
          <Link
            href={`/docs/learn/${prev.slug}`}
            className="flex-1 rounded-xl border border-wow-100 bg-paper p-4 transition-colors hover:bg-wow-50"
          >
            <div className="text-xs font-semibold text-muted">← Previous</div>
            <div className="font-bold text-ink">
              {prev.emoji} {prev.title}
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
            <div className="text-xs font-semibold text-muted">Next →</div>
            <div className="font-bold text-ink">
              {next.title} {next.emoji}
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </nav>
    </article>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.t) {
    case "p":
      return <p className="leading-relaxed text-ink/90">{block.text}</p>;
    case "h":
      return (
        <h2 className="pt-3 text-xl font-bold tracking-tight text-ink">
          {block.text}
        </h2>
      );
    case "code":
      return <CodeBlock code={block.code} />;
    case "tip":
      return (
        <div className="rounded-xl border border-wow-200 bg-wow-50/60 p-4">
          <div className="mb-1 text-sm font-bold text-wow-700">💡 Good to know</div>
          <p className="text-sm leading-relaxed text-ink/80">{block.text}</p>
        </div>
      );
    case "try":
      return (
        <div className="rounded-xl border border-spark-300 bg-spark-300/15 p-4">
          <div className="mb-1 flex items-center justify-between gap-2">
            <span className="text-sm font-bold text-spark-600">🚀 Try it</span>
            <Link
              href="/playground"
              className="rounded-full bg-spark-500 px-3 py-1 text-xs font-bold text-white transition-colors hover:bg-spark-600"
            >
              Open playground
            </Link>
          </div>
          <p className="text-sm leading-relaxed text-ink/80">{block.text}</p>
        </div>
      );
  }
}
