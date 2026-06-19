import { AbsoluteFill, Series } from "remotion";
import { SANS } from "./fonts";
import { GlowBg } from "./components/GlowBg";
import { Intro } from "./scenes/Intro";
import { WhatItIs } from "./scenes/WhatItIs";
import { Keywords } from "./scenes/Keywords";
import { Syntax } from "./scenes/Syntax";
import { Targets } from "./scenes/Targets";
import { Outro } from "./scenes/Outro";

// Scene durations (frames @ 30fps). Total = 1270 frames ≈ 42s.
export const SCENES = {
  intro: 120,
  whatItIs: 120,
  keywords: 130,
  syntax: 540, // 120 + 160 + 120 + 140 (per-snippet, see Syntax.tsx)
  targets: 210,
  outro: 150,
} as const;

export const TOTAL =
  SCENES.intro +
  SCENES.whatItIs +
  SCENES.keywords +
  SCENES.syntax +
  SCENES.targets +
  SCENES.outro;

export const WowDemo: React.FC = () => {
  return (
    <AbsoluteFill style={{ fontFamily: SANS, backgroundColor: "#fdf8f0" }}>
      {/* persistent brand background for continuity across cuts */}
      <GlowBg />
      <Series>
        <Series.Sequence durationInFrames={SCENES.intro}>
          <Intro />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENES.whatItIs}>
          <WhatItIs />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENES.keywords}>
          <Keywords />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENES.syntax}>
          <Syntax />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENES.targets}>
          <Targets />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENES.outro}>
          <Outro />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
