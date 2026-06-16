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
