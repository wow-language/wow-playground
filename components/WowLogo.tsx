import Link from "next/link";

/**
 * The wow wordmark. The glyph is the Urdu letter و (wow / waw) — the
 * letter the language is named after, set in a Nastaliq face so it
 * keeps its calligraphic personality.
 */
export function WowLogo({
  size = "md",
  withWord = true,
}: {
  size?: "sm" | "md" | "lg";
  withWord?: boolean;
}) {
  const glyph =
    size === "lg" ? "text-4xl" : size === "sm" ? "text-xl" : "text-2xl";
  const word =
    size === "lg" ? "text-3xl" : size === "sm" ? "text-lg" : "text-xl";

  return (
    <Link href="/" className="group inline-flex items-center gap-2.5">
      <span
        className={`${glyph} font-[family-name:var(--font-urdu)] leading-none text-wow-600 transition-transform group-hover:-rotate-6`}
        aria-hidden
      >
        و
      </span>
      {withWord && (
        <span
          className={`${word} font-extrabold tracking-tight text-ink lowercase`}
        >
          wow
        </span>
      )}
    </Link>
  );
}
