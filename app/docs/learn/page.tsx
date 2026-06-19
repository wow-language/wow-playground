import type { Metadata } from "next";
import { LearnIndex } from "@/components/LearnIndex";

export const metadata: Metadata = {
  title: "Learn to code · wow",
  description:
    "A friendly, step-by-step path into programming for kids, using the wow language. Available in English, Roman Urdu, and Urdu.",
};

export default function LearnIndexPage() {
  return <LearnIndex />;
}
