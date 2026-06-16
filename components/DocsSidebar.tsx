"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { overviewSections } from "@/lib/docs";
import { chapters, learnUi } from "@/lib/learn";
import { useLang } from "./LanguageProvider";

export function DocsSidebar() {
  const pathname = usePathname();
  const { lang } = useLang();
  const ui = learnUi[lang];
  const onOverview = pathname === "/docs";
  const onLearn = pathname.startsWith("/docs/learn");

  return (
    <nav className="space-y-7 text-sm">
      {/* Overview */}
      <div>
        <Link
          href="/docs"
          className={`block rounded-lg px-3 py-1.5 font-bold transition-colors ${
            onOverview ? "text-wow-700" : "text-ink hover:text-wow-700"
          }`}
        >
          {ui.overview}
        </Link>
        <div className="mt-1 space-y-0.5 border-l border-wow-100 pl-3">
          {overviewSections.map((s) => (
            <Link
              key={s.id}
              href={`/docs#${s.id}`}
              className="block rounded-md px-2 py-1 font-medium text-muted transition-colors hover:bg-wow-50 hover:text-wow-700"
            >
              {s.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Learn */}
      <div>
        <Link
          href="/docs/learn"
          className={`block rounded-lg px-3 py-1.5 font-bold transition-colors ${
            onLearn ? "text-wow-700" : "text-ink hover:text-wow-700"
          }`}
        >
          {ui.learn}
          <span className="ml-2 rounded-full bg-spark-300/40 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-spark-600">
            {ui.forKids}
          </span>
        </Link>
        <div className="mt-1 space-y-0.5 border-l border-wow-100 pl-3">
          {chapters.map((c, i) => {
            const active = pathname === `/docs/learn/${c.slug}`;
            return (
              <Link
                key={c.slug}
                href={`/docs/learn/${c.slug}`}
                className={`block rounded-md px-2 py-1 font-medium transition-colors ${
                  active
                    ? "bg-wow-50 text-wow-700"
                    : "text-muted hover:bg-wow-50 hover:text-wow-700"
                }`}
              >
                <span className="mr-1.5 text-xs text-wow-400">{i + 1}.</span>
                {c.title[lang]}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
