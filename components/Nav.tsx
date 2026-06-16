"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WowLogo } from "./WowLogo";

const links = [
  { href: "/docs", label: "Docs" },
  { href: "/playground", label: "Playground" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-wow-100/70 bg-cream/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <WowLogo />
        <div className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors sm:px-4 ${
                  active
                    ? "bg-wow-600 text-white shadow-sm shadow-wow-600/30"
                    : "text-muted hover:bg-wow-50 hover:text-wow-700"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href="https://github.com/wow-language/wow"
            target="_blank"
            rel="noreferrer"
            className="ml-1 hidden rounded-full border border-wow-200 px-4 py-1.5 text-sm font-semibold text-wow-700 transition-colors hover:bg-wow-50 sm:inline-block"
          >
            GitHub
          </a>
        </div>
      </nav>
    </header>
  );
}
