import { AbsoluteFill } from "remotion";
import { C } from "../theme";

// The soft sunrise glow from the site (.glow-bg), as a full-frame background.
export const GlowBg: React.FC = () => (
  <AbsoluteFill
    style={{
      backgroundColor: C.cream,
      backgroundImage: [
        `radial-gradient(60rem 44rem at 78% -8%, rgba(249,168,38,0.18), transparent 60%)`,
        `radial-gradient(54rem 44rem at 8% 4%, rgba(22,165,99,0.16), transparent 55%)`,
        `radial-gradient(40rem 40rem at 50% 120%, rgba(4,106,56,0.10), transparent 60%)`,
      ].join(","),
    }}
  />
);
