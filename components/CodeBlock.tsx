import { highlight } from "@/lib/highlight";

export function CodeBlock({
  code,
  caption,
}: {
  code: string;
  caption?: string;
}) {
  return (
    <div className="code-card overflow-hidden shadow-xl shadow-wow-900/10 ring-1 ring-white/5">
      <div className="flex items-center gap-1.5 border-b border-white/5 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        {caption && (
          <span className="ml-2 font-[family-name:var(--font-mono)] text-xs text-white/40">
            {caption}
          </span>
        )}
      </div>
      <pre className="overflow-x-auto p-5 font-[family-name:var(--font-mono)] text-sm leading-relaxed">
        <code>{highlight(code)}</code>
      </pre>
    </div>
  );
}
