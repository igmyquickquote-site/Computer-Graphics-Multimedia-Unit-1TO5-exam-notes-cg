import { Zap, Brain } from "lucide-react";

const SectionHeader = ({ icon: Icon, title, sub }) => (
  <header className="border-b-2 border-zinc-900 pb-1.5 mb-4">
    <div className="flex items-center gap-2.5">
      <Icon className="w-5 h-5 text-zinc-900" strokeWidth={2.2} />
      <h2 className="heading-font text-xl sm:text-2xl font-bold tracking-tight text-zinc-900">{title}</h2>
    </div>
    <p className="text-[13px] text-zinc-500 mt-0.5">{sub}</p>
  </header>
);

export const LastMinuteRevision = ({ items }) => (
  <section id="last-minute" data-testid="last-minute-section" className="print-section scroll-mt-24">
    <SectionHeader icon={Zap} title="Last-Minute Revision" sub="Read this table 10 minutes before entering the hall" />
    <div className="border-2 border-zinc-900 rounded-md overflow-hidden">
      {items.map((it, i) => (
        <div key={i} className={`avoid-break flex flex-col sm:flex-row print:flex-row ${i % 2 ? "bg-zinc-50" : "bg-white"} ${i > 0 ? "border-t border-zinc-200" : ""}`}>
          <div className="sm:w-40 print:w-36 shrink-0 px-3 py-1.5 font-bold text-[13px] text-zinc-900 flex items-center gap-1.5">
            <span className="font-mono text-[10px] text-zinc-400">{String(i + 1).padStart(2, "0")}</span>
            {it.topic}
          </div>
          <p className="flex-1 px-3 py-1.5 text-[13px] leading-snug text-zinc-700 sm:border-l print:border-l border-zinc-200">{it.line}</p>
        </div>
      ))}
    </div>
  </section>
);

export const MustMemorize = ({ items }) => (
  <section id="definitions" data-testid="definitions-section" className="scroll-mt-24">
    <SectionHeader icon={Brain} title="Must-Memorize Definitions" sub="Write these exact lines in the exam" />
    <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-2.5">
      {items.map((d, i) => (
        <div key={i} className="avoid-break border border-zinc-300 border-l-4 border-l-indigo-600 rounded-r-md bg-white px-3 py-2">
          <p className="font-bold text-[13px] text-zinc-900">{d.term}</p>
          <p className="text-[12.5px] leading-snug text-zinc-700">{d.definition}</p>
        </div>
      ))}
    </div>
  </section>
);
