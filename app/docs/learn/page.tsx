import type { Metadata } from "next";
import Link from "next/link";
import { chapters } from "@/lib/learn";

export const metadata: Metadata = {
  title: "Learn to code — wow",
  description:
    "A friendly, step-by-step path into programming for kids, using the wow language. Learn the ideas behind code, not just the keywords.",
};

export default function LearnIndex() {
  return (
    <div className="space-y-10">
      <header className="rounded-3xl border border-wow-200 bg-paper p-8 sm:p-10 glow-bg">
        <p className="text-sm font-bold uppercase tracking-widest text-wow-600">
          Learn · for kids
        </p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink">
          Learn to code with wow
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">
          A gentle path from &quot;what even is a program?&quot; to writing your
          own. Each lesson explains one idea in plain words, shows a real
          example, and gives you something to try. No experience needed — just
          curiosity.
        </p>
        <Link
          href={`/docs/learn/${chapters[0].slug}`}
          className="mt-6 inline-block rounded-full bg-wow-600 px-6 py-3 text-base font-bold text-white shadow-lg shadow-wow-600/30 transition-transform hover:scale-[1.03] hover:bg-wow-700"
        >
          Start lesson 1 →
        </Link>
      </header>

      <ol className="grid gap-4 sm:grid-cols-2">
        {chapters.map((c, i) => (
          <li key={c.slug}>
            <Link
              href={`/docs/learn/${c.slug}`}
              className="group flex h-full gap-4 rounded-2xl border border-wow-100 bg-paper p-5 transition-shadow hover:shadow-lg hover:shadow-wow-900/5"
            >
              <div className="text-3xl">{c.emoji}</div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-wow-400">
                    Lesson {i + 1}
                  </span>
                </div>
                <h2 className="mt-0.5 text-lg font-bold text-ink group-hover:text-wow-700">
                  {c.title}
                </h2>
                <p className="mt-1 text-sm text-muted">{c.concept}</p>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
