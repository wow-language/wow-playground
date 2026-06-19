import { interpolate } from "remotion";
import { MONO, SANS } from "../fonts";
import { C } from "../theme";

// A floating "keyword = meaning" chip used in the syntax scene.
export const GlossChip: React.FC<{
  word: string;
  meaning: string;
  appear: number; // 0→1
  style?: React.CSSProperties;
}> = ({ word, meaning, appear, style }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 12,
      padding: "12px 20px",
      background: C.paper,
      border: `2px solid ${C.wow200}`,
      borderRadius: 999,
      boxShadow: "0 18px 40px -22px rgba(4,51,28,0.5)",
      opacity: appear,
      transform: `translateY(${interpolate(appear, [0, 1], [16, 0])}px) scale(${interpolate(
        appear,
        [0, 1],
        [0.9, 1]
      )})`,
      ...style,
    }}
  >
    <span style={{ fontFamily: MONO, fontSize: 26, fontWeight: 700, color: C.wow700 }}>
      {word}
    </span>
    <span style={{ color: C.wow300, fontSize: 24 }}>→</span>
    <span style={{ fontFamily: SANS, fontSize: 25, fontWeight: 600, color: C.ink }}>
      {meaning}
    </span>
  </div>
);

// A full-width "output" card (matches the code card width) that the program
// prints. Vivid wow-green so it pulls focus once it slides in.
export const OUTPUT_LINE_H = 44;
export const OUTPUT_CHROME_H = 92; // padding + label + gaps

export const OutputCard: React.FC<{
  lines: string[];
  width: number;
  style?: React.CSSProperties;
}> = ({ lines, width, style }) => (
  <div
    style={{
      width,
      boxSizing: "border-box",
      padding: "22px 36px 26px",
      background: C.wow600,
      borderRadius: 28,
      boxShadow: "0 30px 70px -26px rgba(4,106,56,0.7)",
      ...style,
    }}
  >
    <div
      style={{
        fontFamily: SANS,
        fontSize: 17,
        fontWeight: 700,
        letterSpacing: 2.5,
        textTransform: "uppercase",
        color: C.wow100,
        marginBottom: 10,
      }}
    >
      ▶ output
    </div>
    {lines.map((l, i) => (
      <div
        key={i}
        style={{ fontFamily: MONO, fontSize: 32, lineHeight: `${OUTPUT_LINE_H}px`, color: "#eafff2" }}
      >
        {l}
      </div>
    ))}
  </div>
);

// A green "output" pill that the program prints.
export const OutputBubble: React.FC<{
  lines: string[];
  appear: number;
  style?: React.CSSProperties;
}> = ({ lines, appear, style }) => (
  <div
    style={{
      display: "inline-flex",
      flexDirection: "column",
      gap: 4,
      padding: "16px 24px",
      background: C.wow600,
      borderRadius: 20,
      boxShadow: "0 22px 50px -22px rgba(4,106,56,0.7)",
      opacity: appear,
      transform: `translateY(${interpolate(appear, [0, 1], [18, 0])}px) scale(${interpolate(
        appear,
        [0, 1],
        [0.92, 1]
      )})`,
      ...style,
    }}
  >
    <span
      style={{
        fontFamily: SANS,
        fontSize: 16,
        fontWeight: 700,
        letterSpacing: 2,
        textTransform: "uppercase",
        color: C.wow100,
        marginBottom: 4,
      }}
    >
      ▶ output
    </span>
    {lines.map((l, i) => (
      <span key={i} style={{ fontFamily: MONO, fontSize: 30, color: "#eafff2" }}>
        {l}
      </span>
    ))}
  </div>
);
