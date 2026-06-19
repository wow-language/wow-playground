import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { MONO, SANS } from "../fonts";
import { C } from "../theme";
import { fadeInOut, fadeUp, popProg, clampInterp } from "../anim";

const FILE = { x: 540, y: 360 };
const CARDS = [
  { x: 250, y: 720, name: "Desktop", sub: "C program", icon: "monitor" as const, tint: C.wow100 },
  { x: 540, y: 720, name: "Arduino", sub: ".ino sketch", icon: "arduino" as const, tint: C.spark300 },
  { x: 830, y: 720, name: "Web", sub: "Node.js server", icon: "globe" as const, tint: C.wow100 },
];

const Icon: React.FC<{ kind: "monitor" | "arduino" | "globe"; color: string }> = ({
  kind,
  color,
}) => {
  const common = { width: 64, height: 64, fill: "none", stroke: color, strokeWidth: 2.4 };
  if (kind === "arduino") {
    return (
      <svg viewBox="0 0 24 24" width={64} height={64} fill={color}>
        <path d="M18.087 6.146c-.3 0-.607.017-.907.069-2.532.367-4.23 2.239-5.18 3.674-.95-1.435-2.648-3.307-5.18-3.674a6.49 6.49 0 0 0-.907-.069C2.648 6.146 0 8.77 0 12s2.656 5.854 5.913 5.854c.3 0 .607-.017.916-.069 2.531-.376 4.23-2.247 5.18-3.683.949 1.436 2.647 3.307 5.18 3.683.299.043.607.069.915.069C21.344 17.854 24 15.23 24 12s-2.656-5.854-5.913-5.854zM6.53 15.734a3.837 3.837 0 0 1-.625.043c-2.148 0-3.889-1.7-3.889-3.777 0-2.085 1.749-3.777 3.898-3.777.208 0 .416.017.624.043 2.39.35 3.847 2.768 4.347 3.734-.508.974-1.974 3.384-4.355 3.734zm11.558.043c-.208 0-.416-.017-.624-.043-2.39-.35-3.856-2.768-4.347-3.734.491-.966 1.957-3.384 4.347-3.734.208-.026.416-.043.624-.043 2.149 0 3.89 1.7 3.89 3.777 0 2.085-1.75 3.777-3.89 3.777zm1.65-4.404v1.134h-1.205v1.182h-1.156v-1.182H16.17v-1.134h1.206V10.19h1.156v1.183h1.206zM4.246 12.498H7.82v-1.125H4.245v1.125z" />
      </svg>
    );
  }
  if (kind === "globe") {
    return (
      <svg viewBox="0 0 24 24" {...common} strokeLinecap="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" {...common} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="3.5" width="19" height="13" rx="2" />
      <path d="M8.5 20.5h7M12 16.5v4" />
    </svg>
  );
};

export const Targets: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const io = fadeInOut(frame, durationInFrames, 14);
  const fileP = popProg(frame, fps, 6);

  return (
    <AbsoluteFill style={{ opacity: io }}>
      {/* heading */}
      <div
        style={{
          position: "absolute",
          top: 130,
          width: "100%",
          textAlign: "center",
          ...fadeUp(frame, fps, 2, 30),
        }}
      >
        <div style={{ fontFamily: SANS, fontSize: 60, fontWeight: 800, color: C.ink }}>
          One file. <span style={{ color: C.wow600 }}>Runs everywhere.</span>
        </div>
      </div>

      {/* connectors */}
      <svg width={1080} height={1080} style={{ position: "absolute", inset: 0 }}>
        {CARDS.map((card, i) => {
          const len = 460;
          const draw = clampInterp(frame, [22 + i * 6, 60 + i * 6], [0, 1]);
          return (
            <line
              key={i}
              x1={FILE.x}
              y1={FILE.y + 70}
              x2={card.x}
              y2={card.y - 70}
              stroke={C.wow300}
              strokeWidth={4}
              strokeLinecap="round"
              strokeDasharray={len}
              strokeDashoffset={len * (1 - draw)}
              opacity={0.7}
            />
          );
        })}
      </svg>

      {/* the .wow file */}
      <div
        style={{
          position: "absolute",
          left: FILE.x,
          top: FILE.y,
          transform: `translate(-50%, -50%) scale(${interpolate(fileP, [0, 1], [0.7, 1])})`,
          opacity: fileP,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          padding: "26px 40px",
          background: C.codeBg,
          borderRadius: 26,
          boxShadow: "0 30px 70px -28px rgba(4,51,28,0.6)",
        }}
      >
        <span style={{ fontFamily: SANS, fontSize: 80, fontWeight: 800, color: C.wow300 }}>
          و
        </span>
        <span style={{ fontFamily: MONO, fontSize: 30, color: C.codeText }}>salam.wow</span>
      </div>

      {/* target cards */}
      {CARDS.map((card, i) => {
        const p = popProg(frame, fps, 52 + i * 8);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: card.x,
              top: card.y,
              transform: `translate(-50%, -50%) translateY(${interpolate(
                p,
                [0, 1],
                [40, 0]
              )}px) scale(${interpolate(p, [0, 1], [0.8, 1])})`,
              opacity: p,
              width: 280,
              padding: "30px 22px",
              background: C.paper,
              border: `1px solid ${C.wow100}`,
              borderRadius: 28,
              boxShadow: "0 26px 60px -30px rgba(4,51,28,0.4)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div
              style={{
                width: 110,
                height: 110,
                borderRadius: 26,
                background: card.tint,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: C.wow600,
              }}
            >
              <Icon kind={card.icon} color={C.wow600} />
            </div>
            <span style={{ fontFamily: SANS, fontSize: 34, fontWeight: 700, color: C.ink }}>
              {card.name}
            </span>
            <span style={{ fontFamily: MONO, fontSize: 23, color: C.muted }}>{card.sub}</span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
