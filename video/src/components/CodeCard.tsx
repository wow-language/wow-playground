import { MONO } from "../fonts";
import { C } from "../theme";

// The dark, rounded code card from the site, with traffic-light dots.
export const CodeCard: React.FC<{
  filename?: string;
  children: React.ReactNode;
  width?: number;
  style?: React.CSSProperties;
}> = ({ filename, children, width = 760, style }) => (
  <div
    style={{
      width,
      background: C.codeBg,
      borderRadius: 32,
      boxShadow: "0 40px 90px -30px rgba(4,51,28,0.55)",
      overflow: "hidden",
      ...style,
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "20px 26px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <Dot color="#ff5f57" />
      <Dot color="#febc2e" />
      <Dot color="#28c840" />
      {filename && (
        <span
          style={{
            marginLeft: 14,
            fontFamily: MONO,
            fontSize: 22,
            color: "rgba(255,255,255,0.42)",
          }}
        >
          {filename}
        </span>
      )}
    </div>
    <div style={{ padding: "30px 36px" }}>{children}</div>
  </div>
);

const Dot: React.FC<{ color: string }> = ({ color }) => (
  <span
    style={{
      width: 18,
      height: 18,
      borderRadius: 999,
      background: color,
      display: "inline-block",
    }}
  />
);
