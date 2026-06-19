import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { URDU } from "../fonts";
import { C } from "../theme";

// The big floating و glyph — the brand mark. Gently bobs and rotates forever.
export const GlyphWow: React.FC<{
  size?: number;
  color?: string;
  opacity?: number;
  style?: React.CSSProperties;
}> = ({ size = 360, color = C.wow600, opacity = 0.12, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const y = Math.sin(t * 1.1) * 14;
  const rot = Math.sin(t * 0.8) * 2.5;
  return (
    <span
      style={{
        fontFamily: URDU,
        fontSize: size,
        lineHeight: 1,
        color,
        opacity,
        display: "inline-block",
        transform: `translateY(${y}px) rotate(${rot}deg)`,
        userSelect: "none",
        ...style,
      }}
    >
      و
    </span>
  );
};

// A version that draws itself in (scale + fade) for entrances.
export const GlyphWowIntro: React.FC<{
  size?: number;
  color?: string;
  delay?: number;
}> = ({ size = 360, color = C.wow600, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = (frame - delay) / fps;
  const appear = interpolate(frame, [delay, delay + 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(appear, [0, 1], [0.4, 1]);
  const y = Math.sin(t * 1.1) * 12;
  const rot = Math.sin(t * 0.8) * 2.5;
  return (
    <span
      style={{
        fontFamily: URDU,
        fontSize: size,
        lineHeight: 1,
        color,
        opacity: appear,
        display: "inline-block",
        transform: `translateY(${y}px) rotate(${rot}deg) scale(${scale})`,
        userSelect: "none",
      }}
    >
      و
    </span>
  );
};
