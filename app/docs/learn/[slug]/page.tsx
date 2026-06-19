import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { chapters, chapterBySlug } from "@/lib/learn";
import { ChapterView } from "@/components/ChapterView";

export function generateStaticParams() {
  return chapters.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ch = chapterBySlug(slug);
  if (!ch) return { title: "Learn · wow" };
  return { title: `${ch.title.en} · Learn wow`, description: ch.concept.en };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!chapterBySlug(slug)) notFound();
  return <ChapterView slug={slug} />;
}
