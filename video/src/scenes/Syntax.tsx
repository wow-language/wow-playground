import {
  AbsoluteFill,
  Series,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { fadeInOut, popProg, clampInterp } from "../anim";
import { CodeCard } from "../components/CodeCard";
import { CodeLine } from "../components/Code";
import {
  GlossChip,
  OutputCard,
  OUTPUT_LINE_H,
  OUTPUT_CHROME_H,
} from "../components/Bits";

type SnippetData = {
  filename: string;
  lines: string[];
  gloss: { word: string; meaning: string };
  output?: string[];
  width: number;
  dur: number;
};

const SNIPPETS: SnippetData[] = [
  {
    filename: "hello.wow",
    lines: ['likho "Hello, World!"'],
    gloss: { word: "likho", meaning: "print to the screen" },
    output: ["Hello, World!"],
    width: 760,
    dur: 120,
  },
  {
    filename: "faisla.wow",
    lines: [
      "umar = 12",
      "",
      "agar umar > 10 {",
      '    likho "Tum baray ho!"',
      "} warna {",
      '    likho "Tum chotay ho."',
      "}",
    ],
    gloss: { word: "agar / warna", meaning: "if / else" },
    output: ["Tum baray ho!"],
    width: 820,
    dur: 160,
  },
  {
    filename: "ginti.wow",
    lines: ["1 se 5 tak har i {", "    likho i", "}"],
    gloss: { word: "har … tak", meaning: "loop over a range" },
    output: ["1", "2", "3", "4", "5"],
    width: 760,
    dur: 120,
  },
  {
    filename: "shaks.wow",
    lines: [
      'shaks = { naam: "Sara", umar: 14 }',
      "",
      "likho shaks ka naam",
      "likho shaks ki umar",
    ],
    gloss: { word: "ka · ki · kay", meaning: "safely read a property" },
    output: ["Sara", "14"],
    width: 900,
    dur: 140,
  },
];

const REVEAL = 15;
const LINE_START = 10;
const PER_LINE = 11;
const GAP = 36; // code card → output card

const Snippet: React.FC<{ data: SnippetData }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const io = fadeInOut(frame, durationInFrames, 12);
  const card = popProg(frame, fps, 2);

  const lastLineEnd = LINE_START + (data.lines.length - 1) * PER_LINE + REVEAL + 6;
  const glossA = clampInterp(frame, [lastLineEnd, lastLineEnd + 16], [0, 1]);
  const outA = data.output
    ? clampInterp(frame, [lastLineEnd + 16, lastLineEnd + 40], [0, 1])
    : 0;

  // Target height of the output region; the centred column grows by this,
  // which lifts the code card up to make room.
  const outH = data.output
    ? GAP + OUTPUT_CHROME_H + data.output.length * OUTPUT_LINE_H
    : 0;
  const wrapH = outH * outA;

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", opacity: io }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ marginBottom: 28 }}>
          <GlossChip word={data.gloss.word} meaning={data.gloss.meaning} appear={glossA} />
        </div>

        <div
          style={{
            transform: `translateY(${interpolate(card, [0, 1], [40, 0])}px) scale(${interpolate(
              card,
              [0, 1],
              [0.94, 1]
            )})`,
          }}
        >
          <CodeCard filename={data.filename} width={data.width}>
            {data.lines.map((l, i) => {
              const start = LINE_START + i * PER_LINE;
              const reveal = clampInterp(frame, [start, start + REVEAL], [0, 1]);
              return <CodeLine key={i} line={l} reveal={reveal} />;
            })}
          </CodeCard>
        </div>

        {data.output && (
          <div style={{ height: wrapH, overflow: "visible" }}>
            <div
              style={{
                marginTop: GAP,
                opacity: outA,
                transform: `translateY(${interpolate(outA, [0, 1], [18, 0])}px) scale(${interpolate(
                  outA,
                  [0, 1],
                  [0.96, 1]
                )})`,
              }}
            >
              <OutputCard lines={data.output} width={data.width} />
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

export const Syntax: React.FC = () => {
  return (
    <AbsoluteFill>
      <Series>
        {SNIPPETS.map((s) => (
          <Series.Sequence key={s.filename} durationInFrames={s.dur}>
            <Snippet data={s} />
          </Series.Sequence>
        ))}
      </Series>
    </AbsoluteFill>
  );
};
