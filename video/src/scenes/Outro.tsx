import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { MONO, SANS } from "../fonts";
import { C } from "../theme";
import { fadeUp, fadeInOut, prog } from "../anim";
import { GlyphWow } from "../components/GlyphWow";

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const io = fadeInOut(frame, durationInFrames, 16);
  const underline = prog(frame, fps, 26);

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", opacity: io }}
    >
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <GlyphWow size={560} opacity={0.07} />
      </AbsoluteFill>

      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontFamily: SANS,
            fontWeight: 800,
            fontSize: 150,
            letterSpacing: -6,
            color: C.wow600,
            lineHeight: 1,
            ...fadeUp(frame, fps, 4, 40),
          }}
        >
          wow
        </div>

        <div
          style={{
            marginTop: 26,
            fontFamily: SANS,
            fontSize: 46,
            fontWeight: 600,
            color: C.ink,
            ...fadeUp(frame, fps, 16, 32),
          }}
        >
          Code <span style={{ color: C.wow600 }}>likho</span>. Wow{" "}
          <span style={{ color: C.spark600 }}>bolo</span>.
        </div>

        <div
          style={{
            height: 6,
            borderRadius: 99,
            background: C.spark500,
            margin: "30px auto",
            width: interpolate(underline, [0, 1], [0, 260]),
          }}
        />

        <div
          style={{
            fontFamily: MONO,
            fontSize: 32,
            color: C.wow700,
            ...fadeUp(frame, fps, 30, 28),
          }}
        >
          github.com/wow-language/wow
        </div>
      </div>
    </AbsoluteFill>
  );
};
