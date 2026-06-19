"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Languages, Target, MessageCircle, Wrench, Monitor, Globe } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
import { AppleIcon, LinuxIcon, WindowsIcon, ArduinoIcon } from "@/components/BrandIcon";
import { useLang } from "@/components/LanguageProvider";
import { t, dir } from "@/lib/i18n";

const heroCode = `banao salam(naam = "dost") {
    bol "Salam {naam}! Kaise ho?"
}

numbers = [1, 5, 3, 8, 2, 9]

bade = numbers phir chuno(x > 4) phir tarteeb

har bade mein n {
    bol "mila: {n}"
}

salam("Ahmad")`;

const featureIcons = [Languages, Target, MessageCircle, Wrench];

type OsId = "mac" | "linux" | "windows";

const installOptions: { id: OsId; label: string; icon: React.ComponentType<{ className?: string }>; steps: { caption: string; cmd: string }[]; guide: string }[] = [
  {
    id: "mac",
    label: "macOS",
    icon: AppleIcon,
    steps: [
      { caption: "Homebrew (recommended)", cmd: "brew install wow-language/tap/wow" },
      { caption: "or via curl", cmd: "curl -fsSL https://raw.githubusercontent.com/wow-language/wow/main/install.sh | sh" },
    ],
    guide: "https://github.com/wow-language/wow#installation",
  },
  {
    id: "linux",
    label: "Linux",
    icon: LinuxIcon,
    steps: [
      { caption: "curl one-liner", cmd: "curl -fsSL https://raw.githubusercontent.com/wow-language/wow/main/install.sh | sh" },
    ],
    guide: "https://github.com/wow-language/wow#installation",
  },
  {
    id: "windows",
    label: "Windows",
    icon: WindowsIcon,
    steps: [
      { caption: "PowerShell", cmd: "irm https://raw.githubusercontent.com/wow-language/wow/main/install.ps1 | iex" },
    ],
    guide: "https://github.com/wow-language/wow#installation",
  },
];

const targets = [
  { Icon: Monitor, name: "Desktop", sub: "C program", tint: "from-wow-100 to-wow-50" },
  { Icon: ArduinoIcon, name: "Arduino", sub: ".ino sketch", tint: "from-spark-300/40 to-spark-300/10" },
  { Icon: Globe, name: "Web", sub: "Node.js server", tint: "from-wow-100 to-wow-50" },
];

function InstallSection() {
  const [active, setActive] = useState<OsId>("mac");
  const option = installOptions.find((o) => o.id === active)!;

  return (
    <section className="border-b border-wow-100 bg-wow-50/60 py-10">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-10">
          {/* Left: heading */}
          <div className="shrink-0 text-center sm:text-left">
            <p className="text-sm font-bold uppercase tracking-widest text-wow-600">
              Install
            </p>
            <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-ink">
              Get wow on your machine
            </h2>
            <p className="mt-2 max-w-xs text-sm text-muted">
              One command. No Rust needed. Binaries for every platform.
            </p>
            <a
              href="https://github.com/wow-language/wow/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-wow-200 bg-paper px-4 py-2 text-sm font-semibold text-wow-700 transition-colors hover:bg-wow-100"
            >
              ↓ Download binary
            </a>
          </div>

          {/* Right: tabs + command */}
          <div className="w-full min-w-0 flex-1">
            {/* OS tabs */}
            <div className="flex gap-2">
              {installOptions.map((o) => (
                <button
                  key={o.id}
                  onClick={() => setActive(o.id)}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                    active === o.id
                      ? "bg-wow-600 text-white shadow"
                      : "border border-wow-200 bg-paper text-muted hover:bg-wow-50"
                  }`}
                >
                  <o.icon className="h-4 w-4" />
                  {o.label}
                </button>
              ))}
            </div>

            {/* Commands */}
            <div className="mt-4 space-y-3">
              {option.steps.map((step) => (
                <div key={step.caption}>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted">
                    {step.caption}
                  </p>
                  <div className="flex items-center gap-2 overflow-x-auto rounded-xl border border-wow-200 bg-ink px-4 py-3">
                    <span className="select-none text-wow-400">$</span>
                    <code className="flex-1 font-[family-name:var(--font-mono)] text-sm text-green-300">
                      {step.cmd}
                    </code>
                    <CopyButton text={step.cmd} />
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-3 text-xs text-muted">
              After install, run{" "}
              <code className="rounded bg-wow-100 px-1 py-0.5 font-[family-name:var(--font-mono)] text-wow-700">
                wow --help
              </code>{" "}
              to verify.{" "}
              <a
                href={option.guide}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-wow-700 underline decoration-wow-200 underline-offset-2"
              >
                Full install guide →
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };
  return (
    <button
      onClick={copy}
      title="Copy"
      className="shrink-0 rounded-md px-2 py-1 text-xs font-semibold text-wow-400 transition-colors hover:bg-white/10 hover:text-white"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

export function Landing() {
  const { lang } = useLang();
  const h = t[lang].home;
  const d = dir(lang);
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".hero-item", {
        opacity: 0,
        y: 22,
        duration: 0.55,
        stagger: 0.1,
        ease: "power2.out",
      });
      gsap.from(".hero-code", {
        opacity: 0,
        y: 30,
        scale: 0.97,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.15,
      });
    },
    { scope: heroRef }
  );

  return (
    <>
      {/* Hero */}
      <section className="glow-bg" ref={heroRef}>
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:py-24 lg:grid-cols-2 lg:gap-14">
          <div dir={d}>
            <span className="hero-item inline-flex items-center gap-2 rounded-full border border-wow-200 bg-wow-50 px-3.5 py-1.5 text-sm font-semibold text-wow-700">
              <span className="font-[family-name:var(--font-urdu)] text-base leading-none">
                و
              </span>
              {h.badge}
            </span>

            <h1 className="hero-item mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl">
              {h.title1}
              <br />
              {h.t2pre}
              <span className="text-wow-600">{h.t2word}</span>
              {h.t2post}
            </h1>

            <p className="hero-item mt-5 max-w-md text-lg leading-relaxed text-muted">
              <strong className="font-bold text-ink">wow</strong>
              {h.leadRest}
            </p>

            <div className="hero-item mt-8 flex flex-wrap gap-3">
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

          <div className="hero-code relative">
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

      {/* Install */}
      <InstallSection />

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
              <tg.Icon className="h-10 w-10 mx-auto text-wow-600" />
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
          {h.features.map((f, i) => {
            const Icon = featureIcons[i];
            return (
            <div
              key={f.title}
              className="rounded-2xl border border-wow-100 bg-paper p-6 transition-shadow hover:shadow-lg hover:shadow-wow-900/5"
            >
              <Icon className="h-8 w-8 text-wow-600" />
              <h3 className="mt-3 text-xl font-bold text-ink">{f.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{f.body}</p>
            </div>
            );
          })}
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
