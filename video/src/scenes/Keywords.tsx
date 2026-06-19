import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { MONO, SANS } from "../fonts";
import { C } from "../theme";
import { fadeInOut, fadeUp } from "../anim";

type Kw = { w: string; x: number; y: number; size: number; color: string };

// Hand-placed scatter (x/y in %, balanced so nothing collides). Real wow
// keywords from lib/highlight.tsx + a few auzaar tools.
const KW: Kw[] = [
  { w: "likho", x: 22, y: 26, size: 70, color: C.wow600 },
  { w: "agar", x: 60, y: 20, size: 56, color: C.wow700 },
  { w: "warna", x: 80, y: 30, size: 44, color: C.spark600 },
  { w: "har", x: 12, y: 44, size: 48, color: C.wow400 },
  { w: "se", x: 30, y: 52, size: 34, color: C.ink },
  { w: "tak", x: 41, y: 42, size: 38, color: C.wow600 },
  { w: "banao", x: 64, y: 44, size: 64, color: C.wow600 },
  { w: "bhejo", x: 86, y: 50, size: 42, color: C.wow700 },
  { w: "phir", x: 50, y: 60, size: 52, color: C.spark600 },
  { w: "koshish", x: 20, y: 66, size: 50, color: C.wow700 },
  { w: "pakro", x: 40, y: 74, size: 40, color: C.wow400 },
  { w: "jabtak", x: 74, y: 63, size: 46, color: C.ink },
  { w: "rakho", x: 88, y: 70, size: 38, color: C.wow600 },
  { w: "sahi", x: 14, y: 76, size: 34, color: C.wow400 },
  { w: "ghalat", x: 33, y: 80, size: 36, color: C.spark600 },
  { w: "khali", x: 56, y: 76, size: 40, color: C.wow700 },
  { w: "aur", x: 72, y: 78, size: 34, color: C.ink },
  { w: "baar", x: 87, y: 80, size: 38, color: C.wow600 },
  { w: "chuno", x: 30, y: 14, size: 40, color: C.wow400 },
  { w: "tarteeb", x: 78, y: 14, size: 36, color: C.wow700 },
];

const Word: React.FC<{ kw: Kw; i: number }> = ({ kw, i }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delay = 6 + i * 3;
  const p = spring({
    frame: frame - delay,
    fps,
    config: { damping: 13, stiffness: 150, mass: 0.8 },
  });
  const t = frame / fps;
  // gentle continuous drift, phase-shifted per word
  const dx = Math.sin(t * 0.9 + i) * 7;
  const dy = Math.cos(t * 0.8 + i * 1.3) * 7;
  const scale = interpolate(p, [0, 1], [0.4, 1]);
  return (
    <span
      style={{
        position: "absolute",
        left: `${kw.x}%`,
        top: `${kw.y}%`,
        transform: `translate(-50%, -50%) translate(${dx}px, ${dy}px) scale(${scale})`,
        opacity: p,
        fontFamily: MONO,
        fontWeight: 700,
        fontSize: kw.size,
        color: kw.color,
        whiteSpace: "nowrap",
      }}
    >
      {kw.w}
    </span>
  );
};

export const Keywords: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const io = fadeInOut(frame, durationInFrames, 16);

  return (
    <AbsoluteFill style={{ opacity: io }}>
      {KW.map((kw, i) => (
        <Word key={kw.w} kw={kw} i={i} />
      ))}

      {/* caption settles in last */}
      <div
        style={{
          position: "absolute",
          bottom: 70,
          width: "100%",
          textAlign: "center",
          ...fadeUp(frame, fps, KW.length * 3 + 10, 26),
        }}
      >
        <span style={{ fontFamily: SANS, fontSize: 40, fontWeight: 700, color: C.ink }}>
          20+ keywords — all in{" "}
          <span style={{ color: C.wow600 }}>Roman Urdu</span>.
        </span>
      </div>
    </AbsoluteFill>
  );
};
