import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { SANS } from "../fonts";
import { C } from "../theme";
import { fadeUp, fadeInOut, prog } from "../anim";
import { GlyphWow } from "../components/GlyphWow";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const io = fadeInOut(frame, durationInFrames, 16);
  const underline = prog(frame, fps, 30);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: io,
      }}
    >
      {/* faint glyph backdrop */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <GlyphWow size={620} opacity={0.08} />
      </AbsoluteFill>

      <div style={{ textAlign: "center", position: "relative" }}>
        <div
          style={{
            fontFamily: SANS,
            fontWeight: 800,
            fontSize: 250,
            letterSpacing: -8,
            color: C.wow600,
            lineHeight: 1,
            ...fadeUp(frame, fps, 6, 50),
          }}
        >
          wow
        </div>

        <div
          style={{
            height: 8,
            borderRadius: 99,
            background: C.spark500,
            margin: "18px auto 0",
            width: interpolate(underline, [0, 1], [0, 320]),
          }}
        />

        <div
          style={{
            marginTop: 34,
            fontFamily: SANS,
            fontSize: 52,
            fontWeight: 600,
            color: C.ink,
            ...fadeUp(frame, fps, 24, 36),
          }}
        >
          Code <span style={{ color: C.wow600 }}>likho</span>. Wow{" "}
          <span style={{ color: C.spark600 }}>bolo</span>.
        </div>
      </div>
    </AbsoluteFill>
  );
};
