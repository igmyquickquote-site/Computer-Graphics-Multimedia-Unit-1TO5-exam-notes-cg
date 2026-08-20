import { Lightbulb, Zap, Flag, Sigma } from "lucide-react";

export const AnalogyLine = ({ text }) => (
  <p className="avoid-break flex gap-2 items-start text-[14px] leading-snug text-amber-900 bg-amber-50/70 border border-amber-200 rounded-md px-3 py-2">
    <Lightbulb className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
    <span><span className="font-bold">Think:</span> {text}</span>
  </p>
);

export const DefinitionBox = ({ text }) => (
  <div className="avoid-break border-l-4 border-l-indigo-600 border border-indigo-100 bg-indigo-50/60 px-3 py-2.5 rounded-r-md">
    <p className="text-[11px] font-bold uppercase tracking-widest text-indigo-700 mb-0.5">Definition (write as-is)</p>
    <p className="font-medium text-[14.5px] leading-snug text-zinc-900">&ldquo;{text}&rdquo;</p>
  </div>
);

export const WorkingList = ({ points }) => (
  <ol className="avoid-break space-y-1">
    {points.map((p, i) => (
      <li key={i} className="flex gap-2 text-[14px] leading-snug text-zinc-800">
        <span className="shrink-0 font-mono text-[11px] font-bold text-zinc-400 mt-0.5 w-3.5">{i + 1}.</span>
        <span>{p}</span>
      </li>
    ))}
  </ol>
);

export const DiagramFrame = ({ caption, children }) => (
  <figure data-testid="diagram-frame" className="avoid-break diagram-container bg-zinc-50 border border-zinc-300 rounded-md p-3 text-center">
    <div className="max-w-xl mx-auto">{children}</div>
    <figcaption className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">{caption}</figcaption>
  </figure>
);

export const QuickFacts = ({ points }) => (
  <ul className="avoid-break space-y-1">
    {points.map((p, i) => (
      <li key={i} className="flex gap-2 text-[14px] leading-snug text-zinc-800">
        <span className="shrink-0 mt-[7px] w-1.5 h-1.5 bg-zinc-900" />
        <span>{p}</span>
      </li>
    ))}
  </ul>
);

export const ComparisonTable = ({ data }) => (
  <div className="avoid-break">
    <p className="text-[13px] font-bold text-zinc-900 mb-1">{data.title}</p>
    <div className="overflow-x-auto border border-zinc-300 rounded-md">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="bg-zinc-900 text-white print:bg-zinc-200 print:text-black">
            {data.headers.map((h, i) => (
              <th key={i} className="text-left px-2.5 py-1.5 font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, i) => (
            <tr key={i} className={i % 2 ? "bg-zinc-50" : "bg-white"}>
              {row.map((cell, j) => (
                <td key={j} className={`px-2.5 py-1 border-t border-zinc-200 ${j === 0 ? "font-semibold text-zinc-900" : "text-zinc-700"}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export const FormulaBox = ({ formulas }) => (
  <div className="avoid-break flex items-center gap-2.5 border-l-4 border-l-teal-600 border border-teal-200 bg-teal-50/70 px-3 py-2 rounded-r-md">
    <Sigma className="w-4 h-4 shrink-0 text-teal-700" />
    <div className="space-y-0.5">
      {formulas.map((f, i) => (
        <p key={i} className="font-mono text-[13px] font-semibold text-teal-950">{f}</p>
      ))}
    </div>
  </div>
);

export const MemoryTrickBox = ({ text }) => (
  <p className="avoid-break flex gap-2 items-start border-l-4 border-l-amber-500 border border-amber-200 bg-amber-100/70 px-3 py-2 rounded-r-md text-[14px] font-medium leading-snug text-amber-950">
    <Zap className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
    <span><span className="font-bold uppercase text-[11px] tracking-widest mr-1.5">Trick</span>{text}</span>
  </p>
);

export const ExamTipBox = ({ text }) => (
  <p className="avoid-break flex gap-2 items-start border-l-4 border-l-rose-600 border border-rose-200 bg-rose-50/70 px-3 py-2 rounded-r-md text-[14px] leading-snug text-rose-950">
    <Flag className="w-4 h-4 shrink-0 mt-0.5 text-rose-700" />
    <span><span className="font-bold uppercase text-[11px] tracking-widest mr-1.5">Exam Tip</span>{text}</span>
  </p>
);

export const SolvedExample = ({ data }) => (
  <div className="avoid-break border-2 border-zinc-900 rounded-md overflow-hidden" data-testid="dda-solved-example">
    <div className="bg-zinc-900 text-white px-3 py-1.5 print:bg-zinc-200 print:text-black">
      <p className="font-mono text-[13px] font-bold">📐 {data.title}</p>
    </div>
    <div className="p-3 space-y-2 bg-white">
      <p className="font-mono text-[13px] font-semibold text-zinc-900">{data.given}</p>
      <div className="overflow-x-auto border border-zinc-300 rounded" data-testid="dda-pixel-table">
        <table className="w-full text-[13px] font-mono">
          <thead>
            <tr className="bg-zinc-100">
              {data.table.headers.map((h, i) => (
                <th key={i} className="text-left px-2.5 py-1 font-bold border-b border-zinc-300">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.table.rows.map((row, i) => (
              <tr key={i} className={i % 2 ? "bg-zinc-50" : ""}>
                {row.map((cell, j) => (
                  <td key={j} className={`px-2.5 py-0.5 border-b border-zinc-100 ${j === row.length - 1 ? "font-bold" : ""}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[13px] text-zinc-700 leading-snug"><span className="font-bold">Note:</span> {data.note}</p>
    </div>
  </div>
);
