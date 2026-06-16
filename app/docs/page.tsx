import type { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";
import { RefTable } from "@/components/RefTable";
import {
  keywordRows,
  operatorRows,
  collectionRows,
  stringRows,
  mathRows,
} from "@/lib/docs";

export const metadata: Metadata = {
  title: "Docs — wow",
  description: "wow language reference: keywords, operators, the auzaar toolbox, and the three targets.",
};

const sections = [
  { id: "shuruaat", label: "Shuruaat" },
  { id: "keywords", label: "Keywords" },
  { id: "operators", label: "Operators" },
  { id: "loops", label: "Loops" },
  { id: "kaam", label: "Functions" },
  { id: "phir", label: "phir pipelines" },
  { id: "auzaar", label: "Auzaar toolbox" },
  { id: "targets", label: "Targets" },
  { id: "ghalti", label: "Error messages" },
];

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <div className="lg:grid lg:grid-cols-[14rem_1fr] lg:gap-12">
        {/* sidebar */}
        <aside className="hidden lg:block">
          <nav className="sticky top-24 space-y-1">
            <p className="px-3 pb-2 text-xs font-bold uppercase tracking-widest text-wow-600">
              Reference
            </p>
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="block rounded-lg px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-wow-50 hover:text-wow-700"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* content */}
        <div className="min-w-0 space-y-16">
          <header>
            <h1 className="text-4xl font-extrabold tracking-tight text-ink">
              wow ka manual
            </h1>
            <p className="mt-3 max-w-xl text-lg text-muted">
              Poori zubaan ek nazar mein. Har lafz Roman Urdu mein, taake aap
              jaisa sochte hain waisa hi likh sakein.
            </p>
          </header>

          <Section id="shuruaat" title="Shuruaat — your first program">
            <p className="text-muted">
              Har program ke andar <Code>bol</Code> sab se zyada kaam aata hai —
              yeh kuch print karta hai. String ke andar{" "}
              <Code>{"{ }"}</Code> ke darmiyan koi bhi value daal sakte hain.
            </p>
            <CodeBlock
              caption="salam.wow"
              code={`naam = "Ahmad"
umar = 12

bol "Salam {naam}!"
bol "Tumhari umar {umar} saal hai."`}
            />
          </Section>

          <Section id="keywords" title="Keywords">
            <p className="text-muted">
              Sab se zyada istemal hone wale lafz sab se chhote hain.
            </p>
            <RefTable rows={keywordRows} head={["wow", "kya karta hai"]} />
          </Section>

          <Section id="operators" title="Operators">
            <RefTable rows={operatorRows} head={["wow", "matlab"]} />
          </Section>

          <Section id="loops" title="Loops — bar bar">
            <p className="text-muted">
              Numbers par, list par, ya bas N dafa — teeno tarah ke loop.
            </p>
            <CodeBlock
              code={`har i 1 se 5 tak {
    bol "Ginti: {i}"
}

phal = ["aam", "kela", "seb"]
har p mein phal {
    bol "Phal: {p}"
}

3 baar {
    bol "wow!"
}`}
            />
          </Section>

          <Section id="kaam" title="Functions — apna kaam banao">
            <p className="text-muted">
              <Code>kaam</Code> se ek function banta hai, aur <Code>do</Code> se
              value wapas milti hai. Default parameters bhi de sakte hain.
            </p>
            <CodeBlock
              code={`kaam jama(a, b = 0) {
    do a + b
}

bol jama(3, 4)
bol jama(10)`}
            />
          </Section>

          <Section id="phir" title="phir — pipelines">
            <p className="text-muted">
              <Code>phir</Code> (yani &quot;then&quot;) bائیں taraf ki value ko
              daائیں taraf ke kaam ko de deta hai. Plain Urdu ki tarah parhta
              hai: list, phir bare chuno, phir tarteeb.
            </p>
            <CodeBlock
              code={`numbers = [1, 5, 3, 8, 2, 9]

nateeja = numbers
    phir chuno(x > 4)
    phir tarteeb
    phir pehla

bol nateeja`}
            />
          </Section>

          <Section id="auzaar" title="Auzaar — built-in toolbox">
            <p className="text-muted">
              <Code>auzaar</Code> khud-ba-khud load ho jata hai — <Code>lao</Code>{" "}
              likhne ki zaroorat nahi. Rozmarra ke kaam ek chhote lafz mein.
            </p>
            <h3 className="pt-2 text-lg font-bold text-ink">Collections</h3>
            <RefTable rows={collectionRows} head={["wow", "kya karta hai"]} />
            <h3 className="pt-2 text-lg font-bold text-ink">Strings</h3>
            <RefTable rows={stringRows} head={["wow", "kya karta hai"]} />
            <h3 className="pt-2 text-lg font-bold text-ink">Math</h3>
            <RefTable rows={mathRows} head={["wow", "kya karta hai"]} />
          </Section>

          <Section id="targets" title="Teen targets">
            <p className="text-muted">
              Wahi <Code>.wow</Code> file teen jagah chal sakti hai. Sirf target
              badlo.
            </p>
            <div className="overflow-hidden rounded-xl border border-wow-100">
              <table className="w-full text-left text-sm">
                <thead className="bg-wow-50 text-wow-800">
                  <tr>
                    <th className="px-4 py-3 font-bold">Command</th>
                    <th className="px-4 py-3 font-bold">Banta hai</th>
                    <th className="px-4 py-3 font-bold">Chalta hai</th>
                  </tr>
                </thead>
                <tbody className="font-[family-name:var(--font-mono)] text-xs">
                  <tr className="border-t border-wow-100">
                    <td className="px-4 py-3">wow build x.wow</td>
                    <td className="px-4 py-3">C program</td>
                    <td className="px-4 py-3">Desktop 🖥️</td>
                  </tr>
                  <tr className="border-t border-wow-100">
                    <td className="px-4 py-3">--target arduino</td>
                    <td className="px-4 py-3">.ino sketch</td>
                    <td className="px-4 py-3">Arduino 🔌</td>
                  </tr>
                  <tr className="border-t border-wow-100">
                    <td className="px-4 py-3">--target node</td>
                    <td className="px-4 py-3">Node.js app</td>
                    <td className="px-4 py-3">Web 🌐</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          <Section id="ghalti" title="Ghalti? Roman Urdu mein samjho">
            <p className="text-muted">
              Jab koi mistake ho, wow seedha point par batata hai ke kya theek
              karna hai.
            </p>
            <CodeBlock
              caption="compiler output"
              code={`Ghalti: 'agar' ke baad condition chahiye
  --> mera_code.wow:5:4
   |
 5 |     agar {
   |          ^ yahan condition honi chahiye
   |
   = madad: agar x > 5 { ... } likho`}
            />
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 space-y-4">
      <h2 className="text-2xl font-extrabold tracking-tight text-ink">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-md bg-wow-50 px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[0.85em] text-wow-700">
      {children}
    </code>
  );
}
