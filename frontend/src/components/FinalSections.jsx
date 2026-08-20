import { Zap, Brain, Target } from "lucide-react";

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

export const CheatCard = ({ data }) => (
  <section id="cheat-card" data-testid="cheat-card-section" className="scroll-mt-24 avoid-break">
    <div className="border-2 border-zinc-900 rounded-md overflow-hidden">
      <div className="bg-zinc-900 text-white px-3 py-1.5 flex items-center justify-between print:bg-zinc-200 print:text-black">
        <p className="font-mono text-[13px] font-bold">🃏 POCKET CHEAT CARD</p>
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300 print:text-zinc-600">{data.read_time}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 bg-white">
        <div className="p-3 border-b md:border-b-0 md:border-r print:border-b-0 print:border-r border-zinc-200">
          <p className="text-[11px] font-bold uppercase tracking-widest text-teal-700 mb-1.5">Formulas</p>
          <ul className="space-y-1">
            {data.formulas.map((f, i) => (
              <li key={i} className="font-mono text-[12px] font-semibold text-zinc-900 leading-snug">{f}</li>
            ))}
          </ul>
        </div>
        <div className="p-3">
          <p className="text-[11px] font-bold uppercase tracking-widest text-amber-700 mb-1.5">Memory Hooks</p>
          <ul className="space-y-1">
            {data.hooks.map((h, i) => (
              <li key={i} className="text-[12px] font-medium text-zinc-800 leading-snug">{h}</li>
            ))}
          </ul>
        </div>
      </div>
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

export const PredictedQuestions = ({ items, topics, onJump }) => (
  <section id="predictions" data-testid="predictions-section" className="scroll-mt-24 avoid-break">
    <div className="border-2 border-zinc-900 rounded-md overflow-hidden">
      <div className="bg-zinc-900 text-white px-3 py-1.5 flex items-center justify-between print:bg-zinc-200 print:text-black">
        <p className="font-mono text-[13px] font-bold flex items-center gap-2">
          <Target className="w-4 h-4" /> TOP 5 PREDICTED QUESTIONS
        </p>
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300 print:text-zinc-600">revise these first</span>
      </div>
      <div className="bg-white">
        {items.map((q, i) => {
          const topic = topics.find((t) => t.id === q.topic_id);
          return (
            <div key={i} className={`flex items-start gap-3 px-3 py-2 ${i > 0 ? "border-t border-zinc-200" : ""} ${i % 2 ? "bg-zinc-50" : ""}`}>
              <span className="shrink-0 font-mono text-sm font-extrabold text-zinc-300 mt-0.5">#{i + 1}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold text-zinc-900 leading-snug">{q.question}</p>
                <p className="text-[11.5px] text-zinc-500 leading-snug mt-0.5">{q.reason}</p>
              </div>
              <div className="shrink-0 flex items-center gap-2 mt-0.5">
                <span className="font-mono text-[10px] font-bold border border-zinc-900 rounded-full px-2 py-0.5">{q.marks} marks</span>
                {topic && (
                  <button
                    data-testid={`prediction-jump-${q.topic_id}`}
                    onClick={() => onJump(q.topic_id)}
                    className="no-print text-[11px] font-bold text-zinc-600 hover:text-zinc-900 underline underline-offset-2"
                  >
                    Revise →
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);
