import { useEffect, useState } from "react";
import "@/App.css";
import axios from "axios";
import { Printer, GraduationCap, Loader2, Menu, X } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { TopicCard } from "@/components/TopicCard";
import { LastMinuteRevision, MustMemorize } from "@/components/FinalSections";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const SECTION_IDS = ["last-minute", "definitions"];

function App() {
  const [unit, setUnit] = useState(null);
  const [error, setError] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    axios.get(`${API}/units/cg-unit-1`).then((r) => setUnit(r.data)).catch(() => setError(true));
  }, []);

  useEffect(() => {
    if (!unit) return;
    const ids = [...unit.topics.map((t) => t.id), ...SECTION_IDS];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveId(e.target.id)),
      { rootMargin: "-20% 0px -70% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [unit]);

  const navigate = (id) => {
    setMenuOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBFBFA]">
        <p data-testid="load-error" className="text-zinc-600">Could not load notes. Please refresh.</p>
      </div>
    );

  if (!unit)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBFBFA]">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-400" data-testid="loading-spinner" />
      </div>
    );

  const fs = unit.final_sections;

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-zinc-900">
      <header className="no-print sticky top-0 z-40 bg-[#FBFBFA]/90 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button className="lg:hidden p-2 -ml-2 text-zinc-700" data-testid="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <GraduationCap className="w-6 h-6 shrink-0 hidden sm:block" />
            <div className="min-w-0">
              <p className="heading-font font-bold text-sm sm:text-base leading-tight truncate">{unit.title}</p>
              <p className="text-[11px] text-zinc-500 truncate">{unit.course}</p>
            </div>
          </div>
          <button
            data-testid="print-pdf-button"
            onClick={() => window.print()}
            className="shrink-0 inline-flex items-center gap-2 bg-zinc-900 text-white text-sm font-semibold px-4 py-2.5 rounded-full hover:bg-zinc-700 transition-colors duration-150"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Download PDF</span>
            <span className="sm:hidden">PDF</span>
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden border-t border-zinc-200 bg-white max-h-[60vh] overflow-y-auto px-4 py-3" data-testid="mobile-menu">
            {[...unit.topics.map((t) => ({ id: t.id, label: `${String(t.number).padStart(2, "0")}  ${t.title}` })),
              { id: "last-minute", label: "⚡ Last-Minute Revision" },
              { id: "definitions", label: "🧠 Must-Memorize Definitions" }].map((item) => (
              <button key={item.id} onClick={() => navigate(item.id)} className="block w-full text-left px-2 py-2 text-sm text-zinc-700 hover:bg-zinc-100 rounded">
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex gap-10 print:block print:max-w-none print:p-0">
        <Sidebar topics={unit.topics} activeId={activeId} onNavigate={navigate} />

        <main className="flex-1 min-w-0 max-w-3xl print:max-w-none space-y-10 print:space-y-0">
          <section className="cover-block border-2 border-zinc-900 rounded-md p-5 sm:p-6 bg-white" data-testid="cover-section">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-zinc-500 mb-1.5">{unit.subject}</p>
            <h1 className="heading-font text-3xl sm:text-4xl font-extrabold tracking-tight leading-[1.05]">{unit.title}</h1>
            <p className="heading-font text-base sm:text-lg font-semibold text-zinc-600 mt-1">{unit.subtitle}</p>
            <div className="mt-3 flex flex-wrap gap-1.5 text-[11px] font-semibold">
              {["10 Topics · Compact", "DDA Solved", "2 Key Tables", "B&W Print-Ready"].map((b) => (
                <span key={b} className="border border-zinc-900 rounded-full px-2.5 py-0.5">{b}</span>
              ))}
            </div>
          </section>

          {unit.topics.map((t) => (
            <TopicCard key={t.id} topic={t} />
          ))}

          <LastMinuteRevision items={fs.last_minute_revision} />
          <MustMemorize items={fs.must_memorize} />

          <footer className="no-print py-10 text-center text-xs text-zinc-400">
            {unit.course} · All the best for the exam! 🎯
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
