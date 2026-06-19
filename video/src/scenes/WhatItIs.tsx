import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { SANS } from "../fonts";
import { C } from "../theme";
import { fadeUp, fadeInOut } from "../anim";

type Word = { t: string; color?: string };

const LINE1: Word[] = [
  { t: "A programming language" },
  { t: "with" },
  { t: "Roman Urdu", color: C.wow600 },
  { t: "keywords." },
];
const LINE2: Word[] = [
  { t: "Built to get" },
  { t: "kids", color: C.spark600 },
  { t: "in Pakistan into coding." },
];

const WordRow: React.FC<{ words: Word[]; baseDelay: number; size: number }> = ({
  words,
  baseDelay,
  size,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "0 16px",
        maxWidth: 900,
      }}
    >
      {words.map((w, i) => (
        <span
          key={i}
          style={{
            fontFamily: SANS,
            fontWeight: w.color ? 800 : 600,
            fontSize: size,
            color: w.color ?? C.ink,
            ...fadeUp(frame, fps, baseDelay + i * 6, 28),
          }}
        >
          {w.t}
        </span>
      ))}
    </div>
  );
};

export const WhatItIs: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const io = fadeInOut(frame, durationInFrames, 14);
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: io,
        padding: 90,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 30, textAlign: "center" }}>
        <WordRow words={LINE1} baseDelay={6} size={64} />
        <WordRow words={LINE2} baseDelay={34} size={48} />
      </div>
    </AbsoluteFill>
  );
};
