import { Zap, Brain, CreditCard } from "lucide-react";

const SPECIALS = [
  { id: "cheat-card", label: "Pocket Cheat Card", icon: CreditCard, testid: "cheat-card-btn" },
  { id: "last-minute", label: "Last-Minute Revision", icon: Zap, testid: "last-minute-revision-btn" },
  { id: "definitions", label: "Must-Memorize Definitions", icon: Brain, testid: "definitions-btn" },
];

export const Sidebar = ({ topics, activeId, onNavigate }) => (
  <nav data-testid="nav-sidebar" className="no-print w-[270px] shrink-0 hidden lg:block">
    <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2 space-y-6 sidebar-scroll">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2 px-3">Syllabus Topics</p>
        <ul className="space-y-0.5">
          {topics.map((t) => (
            <li key={t.id}>
              <button
                data-testid={`topic-nav-item-${t.id}`}
                onClick={() => onNavigate(t.id)}
                className={`w-full text-left flex items-baseline gap-2.5 px-3 py-1.5 rounded-md text-sm transition-colors duration-150 ${
                  activeId === t.id ? "bg-zinc-900 text-white font-semibold" : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                }`}
              >
                <span className="font-mono text-[11px] font-bold text-zinc-400">
                  {String(t.number).padStart(2, "0")}
                </span>
                <span className="leading-snug">{t.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2 px-3">Final Sections</p>
        <ul className="space-y-0.5">
          {SPECIALS.map((s) => (
            <li key={s.id}>
              <button
                data-testid={s.testid}
                onClick={() => onNavigate(s.id)}
                className={`w-full text-left flex items-center gap-2.5 px-3 py-1.5 rounded-md text-sm transition-colors duration-150 ${
                  activeId === s.id ? "bg-zinc-900 text-white font-semibold" : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                }`}
              >
                <s.icon className="w-3.5 h-3.5 shrink-0" />
                <span className="leading-snug">{s.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </nav>
);
