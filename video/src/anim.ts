import { interpolate, spring } from "remotion";

const SOFT = { damping: 200, stiffness: 120, mass: 1 };
const POP = { damping: 14, stiffness: 170, mass: 0.9 };

/** A 0→1 eased progress that starts at `delay` frames. */
export const prog = (frame: number, fps: number, delay = 0) =>
  spring({ frame: frame - delay, fps, config: SOFT });

/** A springy 0→1 with a little overshoot, for things that "pop" in. */
export const popProg = (frame: number, fps: number, delay = 0) =>
  spring({ frame: frame - delay, fps, config: POP });

/** Fade + rise. Returns a style object. */
export const fadeUp = (
  frame: number,
  fps: number,
  delay = 0,
  distance = 42
) => {
  const p = prog(frame, fps, delay);
  return {
    opacity: p,
    transform: `translateY(${interpolate(p, [0, 1], [distance, 0])}px)`,
  };
};

/** Fade in over `len` frames, fade out over the last `len` before `end`. */
export const fadeInOut = (
  frame: number,
  end: number,
  len = 12
): number =>
  interpolate(
    frame,
    [0, len, end - len, end],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

export const clampInterp = (
  frame: number,
  input: number[],
  output: number[]
) =>
  interpolate(frame, input, output, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
