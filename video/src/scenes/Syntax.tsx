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
import { GlossChip, OutputBubble } from "../components/Bits";

type SnippetData = {
  filename: string;
  lines: string[];
  gloss: { word: string; meaning: string };
  output?: string[];
  cardWidth?: number;
};

const SNIPPETS: SnippetData[] = [
  {
    filename: "salam.wow",
    lines: ['likho "Salam Duniya!"'],
    gloss: { word: "likho", meaning: "print to the screen" },
    output: ["Salam Duniya!"],
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
    cardWidth: 820,
  },
  {
    filename: "ginti.wow",
    lines: ["1 se 5 tak har i {", "    likho i", "}"],
    gloss: { word: "har … tak", meaning: "loop over a range" },
    output: ["1", "2", "3", "4", "5"],
  },
  {
    filename: "auzaar.wow",
    lines: [
      "banao jama(a, b) {",
      "    bhejo a + b",
      "}",
      "",
      "likho jama(3, 4)",
    ],
    gloss: { word: "banao / bhejo", meaning: "make / return a value" },
    output: ["7"],
    cardWidth: 820,
  },
];

const REVEAL = 16;
const LINE_START = 10;
const PER_LINE = 12;

const Snippet: React.FC<{ data: SnippetData }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const io = fadeInOut(frame, durationInFrames, 12);
  const card = popProg(frame, fps, 2);

  const lastLineEnd =
    LINE_START + (data.lines.length - 1) * PER_LINE + REVEAL + 6;
  const glossA = clampInterp(frame, [lastLineEnd, lastLineEnd + 16], [0, 1]);
  const outA = data.output
    ? clampInterp(frame, [lastLineEnd + 16, lastLineEnd + 34], [0, 1])
    : 0;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: io,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
        }}
      >
        <GlossChip word={data.gloss.word} meaning={data.gloss.meaning} appear={glossA} />

        <div
          style={{
            transform: `translateY(${interpolate(card, [0, 1], [40, 0])}px) scale(${interpolate(
              card,
              [0, 1],
              [0.94, 1]
            )})`,
          }}
        >
          <CodeCard filename={data.filename} width={data.cardWidth ?? 760}>
            {data.lines.map((l, i) => {
              const start = LINE_START + i * PER_LINE;
              const reveal = clampInterp(frame, [start, start + REVEAL], [0, 1]);
              return <CodeLine key={i} line={l} reveal={reveal} />;
            })}
          </CodeCard>
        </div>

        {data.output && (
          <OutputBubble lines={data.output} appear={outA} />
        )}
      </div>
    </AbsoluteFill>
  );
};

export const Syntax: React.FC = () => {
  // 4 snippets share the scene equally.
  return (
    <AbsoluteFill>
      <Series>
        {SNIPPETS.map((s, i) => (
          <Series.Sequence key={i} durationInFrames={120}>
            <Snippet data={s} />
          </Series.Sequence>
        ))}
      </Series>
    </AbsoluteFill>
  );
};
