import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/CodeBlock";
import { RefTable } from "@/components/RefTable";
import {
  keywordRows,
  operatorRows,
  collectionRows,
  stringRows,
  mathRows,
  objectRows,
  objectAuzaarRows,
  esp32Rows,
} from "@/lib/docs";

export const metadata: Metadata = {
  title: "Docs — wow",
  description:
    "The wow language reference: keywords, operators, the auzaar toolbox, the three targets, and error messages.",
};

export default function DocsPage() {
  return (
    <div className="min-w-0 space-y-16">
      <header>
        <p className="text-sm font-bold uppercase tracking-widest text-wow-600">
          Reference
        </p>
        <h1 className="mt-1 text-4xl font-extrabold tracking-tight text-ink">
          Overview
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">
          The whole language at a glance — every keyword, operator, and built-in
          tool. New to coding? Start with the{" "}
          <Link href="/docs/learn" className="font-semibold text-wow-700 underline decoration-wow-200 underline-offset-2">
            Learn track
          </Link>{" "}
          instead, which teaches the concepts step by step.
        </p>
      </header>

      <Section id="getting-started" title="Getting started">
        <p className="text-muted">
          Every line is one instruction, and the most useful one is{" "}
          <Code>bol</Code> — it prints to the screen. You can drop any value into
          text with curly braces <Code>{"{ }"}</Code>.
        </p>
        <CodeBlock
          caption="hello.wow"
          code={`naam = "Ahmad"
umar = 12

bol "Salam {naam}!"
bol "You are {umar} years old."`}
        />
      </Section>

      <Section id="keywords" title="Keywords">
        <p className="text-muted">
          The actions you reach for most have the shortest words.
        </p>
        <RefTable rows={keywordRows} head={["wow", "What it does"]} />
      </Section>

      <Section id="operators" title="Operators">
        <p className="text-muted">
          Words for logic, symbols for maths — whichever reads more clearly.
        </p>
        <RefTable rows={operatorRows} head={["wow", "Meaning"]} />
      </Section>

      <Section id="loops" title="Loops">
        <p className="text-muted">
          Over a range, over a list, or just a fixed number of times.
        </p>
        <CodeBlock
          code={`har i 1 se 5 tak {
    bol "Count: {i}"
}

fruits = ["aam", "kela", "seb"]
har f mein fruits {
    bol "Fruit: {f}"
}

3 baar {
    bol "wow!"
}`}
        />
      </Section>

      <Section id="functions" title="Functions">
        <p className="text-muted">
          Define one with <Code>banao</Code>, send a value back with{" "}
          <Code>bhejo</Code>. Default parameters are supported.
        </p>
        <CodeBlock
          code={`banao jama(a, b = 0) {
    bhejo a + b
}

bol jama(3, 4)
bol jama(10)`}
        />
      </Section>

      <Section id="phir" title="phir pipelines">
        <p className="text-muted">
          <Code>phir</Code> (&quot;then&quot;) passes the value on its left into
          the tool on its right, so a chain reads like a sentence.
        </p>
        <CodeBlock
          code={`numbers = [1, 5, 3, 8, 2, 9]

result = numbers
    phir chuno(x > 4)
    phir tarteeb
    phir pehla

bol result`}
        />
      </Section>

      <Section id="auzaar" title="auzaar — built-in toolbox">
        <p className="text-muted">
          <Code>auzaar</Code> loads automatically — no <Code>lao</Code> needed.
          Everyday operations are one short word away.
        </p>
        <h3 className="pt-2 text-lg font-bold text-ink">Collections</h3>
        <RefTable rows={collectionRows} head={["wow", "What it does"]} />
        <h3 className="pt-2 text-lg font-bold text-ink">Strings</h3>
        <RefTable rows={stringRows} head={["wow", "What it does"]} />
        <h3 className="pt-2 text-lg font-bold text-ink">Math</h3>
        <RefTable rows={mathRows} head={["wow", "What it does"]} />
      </Section>

      <Section id="objects" title="Objects — structured data">
        <p className="text-muted">
          Objects group related values under named keys. Use dot access or
          the Urdu possessives <Code>ka</Code> / <Code>ki</Code> / <Code>kay</Code>{" "}
          for safe access that returns <Code>khali</Code> instead of crashing.
          Objects are available on the <strong>C</strong> and <strong>Node</strong> targets;
          Arduino gives a friendly "memory kam hai" error.
        </p>
        <CodeBlock
          caption="shaks.wow"
          code={`shaks = { naam: "Ahmad", umar: 14, shahar: "Karachi" }

bol "Salam {shaks.naam}!"
bol "Umar: {shaks ka umar}"

shaks.umar = 15
bol "Agla saal: {shaks.umar}"

# Safe access — returns khali if key doesn't exist
bol shaks ka email

# Only assigns if currently khali
shaks.email ?= "ahmad@example.com"
bol shaks.email

# Nested objects
shaks.adres = { shahar: "Karachi", gali: "Model Town" }
bol shaks.adres.shahar
bol shaks ka adres ka gali

# List of objects
log = [
    { naam: "Ahmad", umar: 10 },
    { naam: "Sara",  umar: 12 },
]
har p mein log {
    bol "{p.naam}: {p ka umar} saal"
}`}
        />
        <h3 className="pt-2 text-lg font-bold text-ink">Syntax quick-reference</h3>
        <RefTable rows={objectRows} head={["wow", "What it does"]} />
        <h3 className="pt-2 text-lg font-bold text-ink">Object auzaar</h3>
        <p className="text-muted text-sm">
          These four functions work on C and Node targets. On Arduino, objects are not supported.
        </p>
        <RefTable rows={objectAuzaarRows} head={["wow", "What it does"]} />
      </Section>

      <Section id="targets" title="Three targets">
        <p className="text-muted">
          The same <Code>.wow</Code> file can run in three places — just change
          the target.
        </p>
        <div className="overflow-hidden rounded-xl border border-wow-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-wow-700 text-white">
              <tr>
                <th className="px-4 py-3 font-bold">Command</th>
                <th className="px-4 py-3 font-bold">Produces</th>
                <th className="px-4 py-3 font-bold">Runs on</th>
              </tr>
            </thead>
            <tbody className="font-[family-name:var(--font-mono)] text-xs">
              <tr className="border-t border-wow-100">
                <td className="px-4 py-3">wow build x.wow</td>
                <td className="px-4 py-3">C program</td>
                <td className="px-4 py-3">Desktop 🖥️</td>
              </tr>
              <tr className="border-t border-wow-100 bg-wow-50/50">
                <td className="px-4 py-3">--target arduino</td>
                <td className="px-4 py-3">.ino sketch</td>
                <td className="px-4 py-3">Arduino / ESP32 🔌</td>
              </tr>
              <tr className="border-t border-wow-100">
                <td className="px-4 py-3">--target node</td>
                <td className="px-4 py-3">Node.js app</td>
                <td className="px-4 py-3">Web 🌐</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="pt-4 text-lg font-bold text-ink">Arduino / ESP32</h3>
        <p className="text-muted">
          The Arduino target supports both classic Arduino boards and ESP32
          modules. On an ESP32 you get six extra built-ins for WiFi and a
          built-in web server — no libraries to import, wow handles it
          automatically.
        </p>
        <RefTable rows={esp32Rows} head={["wow", "What it does"]} />
        <p className="text-muted text-sm">
          When your sketch uses any WiFi built-in, wow automatically emits{" "}
          <Code>#define AUZAAR_ESP32</Code> at the top of the generated{" "}
          <Code>.ino</Code> file so the runtime header picks up the right WiFi
          and WebServer code regardless of toolchain settings.
        </p>
        <CodeBlock
          caption="esp32_server.wow"
          code={`SSID = "apna_wifi"
PASSWORD = "apna_password"

banao ghar() {
    jawab_bhejo(200, "text/html", "<h1>Salam Duniya!</h1>")
}

banao shuru() {
    wifi_jodo(SSID, PASSWORD)
    bol("Jud gaya! IP:")
    bol(wifi_ip())
    server_rasta("/", ghar)
    server_shuru(80)
}

banao chalao() {
    server_parho()
}`}
        />
      </Section>

      <Section id="errors" title="Error messages">
        <p className="text-muted">
          When something is wrong, wow points at the exact spot and explains it
          in plain Roman Urdu.
        </p>
        <CodeBlock
          caption="compiler output"
          code={`Ghalti: 'agar' ke baad condition chahiye
  --> my_code.wow:5:4
   |
 5 |     agar {
   |          ^ yahan condition honi chahiye
   |
   = madad: agar x > 5 { ... } likho`}
        />
      </Section>
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
      <h2 className="text-2xl font-extrabold tracking-tight text-ink">{title}</h2>
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
