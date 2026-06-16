import Link from "next/link";
import { CodeBlock } from "@/components/CodeBlock";

const heroCode = `kaam salam(naam = "dost") {
    bol "Salam {naam}! Kaise ho?"
}

numbers = [1, 5, 3, 8, 2, 9]

bade = numbers phir chuno(x > 4) phir tarteeb

har n mein bade {
    bol "mila: {n}"
}

salam("Ahmad")`;

const features = [
  {
    emoji: "🇵🇰",
    title: "Roman Urdu mein",
    body: "Keywords aap ki zubaan mein — bol, agar, har, kaam. Jaise aap baat karte hain, waise hi code likhein.",
  },
  {
    emoji: "🎯",
    title: "Ek file, teen jagah",
    body: "Wahi code desktop par, Arduino board par, aur web par chalता hai. Logic dobara likhne ki zaroorat nahi.",
  },
  {
    emoji: "💬",
    title: "Ghalti samajh aati hai",
    body: "Error messages Roman Urdu mein, seedha point par — taake bachhe khud apni ghalti theek kar sakein.",
  },
  {
    emoji: "🧰",
    title: "Auzaar saath mein",
    body: "Ginti, tarteeb, chuno, jama — rozmarra ke kaam ek chhote lafz mein, bina kisi library ke.",
  },
];

const targets = [
  { emoji: "🖥️", name: "Desktop", sub: "C program", tint: "from-wow-100 to-wow-50" },
  { emoji: "🔌", name: "Arduino", sub: ".ino sketch", tint: "from-spark-300/40 to-spark-300/10" },
  { emoji: "🌐", name: "Web", sub: "Node.js server", tint: "from-wow-100 to-wow-50" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="glow-bg">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:py-24 lg:grid-cols-2 lg:gap-14">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-wow-200 bg-wow-50 px-3.5 py-1.5 text-sm font-semibold text-wow-700">
              <span className="font-[family-name:var(--font-urdu)] text-base leading-none">
                و
              </span>
              naye coders ke liye banayi gayi
            </span>

            <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl">
              Code likho.
              <br />
              <span className="text-wow-600">Wow</span> bolo.
            </h1>

            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
              <strong className="font-bold text-ink">wow</strong> ek programming
              language hai Roman Urdu lafzon ke saath — Pakistan ke bachhon ko
              coding sikhane ke liye. Teen lines likho, aur LED jhilmilaye ya
              webpage khule.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/playground"
                className="rounded-full bg-wow-600 px-6 py-3 text-base font-bold text-white shadow-lg shadow-wow-600/30 transition-transform hover:scale-[1.03] hover:bg-wow-700"
              >
                Playground kholo →
              </Link>
              <Link
                href="/docs"
                className="rounded-full border border-wow-200 bg-paper px-6 py-3 text-base font-bold text-wow-700 transition-colors hover:bg-wow-50"
              >
                Docs parho
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
          Ek zubaan · teen targets
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {targets.map((t) => (
            <div
              key={t.name}
              className={`rounded-2xl bg-gradient-to-br ${t.tint} p-6 text-center ring-1 ring-wow-100`}
            >
              <div className="text-4xl">{t.emoji}</div>
              <h3 className="mt-3 text-lg font-bold text-ink">{t.name}</h3>
              <p className="font-[family-name:var(--font-mono)] text-sm text-muted">
                {t.sub}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-ink">
          Bachhon ke liye, bachhon ki tarah
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-wow-100 bg-paper p-6 transition-shadow hover:shadow-lg hover:shadow-wow-900/5"
            >
              <div className="text-3xl">{f.emoji}</div>
              <h3 className="mt-3 text-xl font-bold text-ink">{f.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-20 pt-8">
        <div className="glow-bg overflow-hidden rounded-3xl border border-wow-200 bg-paper p-10 text-center sm:p-14">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Tayyar ho? Pehla program likho.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-lg text-muted">
            Kuch install karne ki zaroorat nahi — seedha browser mein likho aur
            chalao.
          </p>
          <Link
            href="/playground"
            className="mt-7 inline-block rounded-full bg-wow-600 px-7 py-3.5 text-lg font-bold text-white shadow-lg shadow-wow-600/30 transition-transform hover:scale-[1.03] hover:bg-wow-700"
          >
            Chalo shuru karein →
          </Link>
        </div>
      </section>
    </>
  );
}
