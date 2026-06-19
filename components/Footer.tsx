"use client";

import Link from "next/link";
import { WowLogo } from "./WowLogo";
import { useLang } from "./LanguageProvider";
import { t, dir } from "@/lib/i18n";

export function Footer() {
  const { lang } = useLang();
  const f = t[lang].footer;
  const nav = t[lang].nav;

  return (
    <footer className="border-t border-wow-100/70 bg-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2" dir={dir(lang)}>
          <WowLogo size="sm" />
          <p className="max-w-xs text-sm text-muted">
            {f.desc}{" "}
            <span className="font-semibold text-wow-700">{f.slogan}</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-muted">
          <Link href="/docs" className="hover:text-wow-700">
            {nav.docs}
          </Link>
          <Link href="/docs/learn" className="hover:text-wow-700">
            {nav.learn}
          </Link>
          <Link href="/playground" className="hover:text-wow-700">
            {nav.playground}
          </Link>
          <a
            href="https://github.com/wow-language/wow"
            target="_blank"
            rel="noreferrer"
            className="hover:text-wow-700"
          >
            GitHub
          </a>
        </div>
      </div>
      <div className="border-t border-wow-100/50 py-4 text-center text-xs text-muted">
        {t.en.footer.credit}
      </div>
    </footer>
  );
}
