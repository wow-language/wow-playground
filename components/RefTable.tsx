import type { Row } from "@/lib/docs";

export function RefTable({ rows, head }: { rows: Row[]; head: [string, string] }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-wow-200">
      <table className="w-full text-left text-sm">
        <thead className="bg-wow-700 text-white">
          <tr>
            <th className="px-4 py-3 font-bold">{head[0]}</th>
            <th className="px-4 py-3 font-bold">{head[1]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.code}
              className={`border-t border-wow-100 align-top ${
                i % 2 === 1 ? "bg-wow-50/50" : ""
              }`}
            >
              <td className="px-4 py-2.5">
                <code className="font-[family-name:var(--font-mono)] text-xs text-wow-700">
                  {row.code}
                </code>
              </td>
              <td className="px-4 py-2.5 text-muted">{row.meaning}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
