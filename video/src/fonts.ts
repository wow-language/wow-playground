// Load the three brand fonts through Remotion's Google Fonts integration so
// they are embedded deterministically in every rendered frame.
import { loadFont as loadJakarta } from "@remotion/google-fonts/PlusJakartaSans";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";
import { loadFont as loadNaskh } from "@remotion/google-fonts/NotoNaskhArabic";

export const SANS = loadJakarta("normal", {
  weights: ["400", "600", "700", "800"],
}).fontFamily;

export const MONO = loadMono("normal", {
  weights: ["400", "700"],
}).fontFamily;

export const URDU = loadNaskh("normal", {
  weights: ["400", "700"],
  subsets: ["arabic"],
}).fontFamily;
