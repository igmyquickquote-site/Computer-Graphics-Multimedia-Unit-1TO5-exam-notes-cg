import { AnalogyLine, DefinitionBox, WorkingList, DiagramFrame, QuickFacts, ComparisonTable, FormulaBox, MemoryTrickBox, ExamTipBox, SolvedExample } from "./Boxes";
import { DIAGRAMS } from "./diagrams";

export const TopicCard = ({ topic }) => {
  const Diagram = DIAGRAMS[topic.diagram_key];
  return (
    <article id={topic.id} data-testid={`topic-card-${topic.id}`} className="topic-card scroll-mt-24 space-y-3">
      <header className="flex items-baseline gap-3 border-b-2 border-zinc-900 pb-1.5">
        <span className="font-mono text-2xl font-extrabold text-zinc-300 print:text-zinc-400 leading-none">
          {String(topic.number).padStart(2, "0")}
        </span>
        <h2 className="heading-font text-xl sm:text-2xl font-bold tracking-tight text-zinc-900">{topic.title}</h2>
      </header>
      <AnalogyLine text={topic.analogy} />
      <DefinitionBox text={topic.definition} />
      <WorkingList points={topic.working} />
      {Diagram && (
        <DiagramFrame caption={topic.diagram_caption}>
          <Diagram />
        </DiagramFrame>
      )}
      {topic.quick_facts?.length > 0 && <QuickFacts points={topic.quick_facts} />}
      {topic.comparison && <ComparisonTable data={topic.comparison} />}
      {topic.formulas?.length > 0 && <FormulaBox formulas={topic.formulas} />}
      {topic.solved_example && <SolvedExample data={topic.solved_example} />}
      <MemoryTrickBox text={topic.memory_trick} />
      {topic.exam_tip && <ExamTipBox text={topic.exam_tip} />}
    </article>
  );
};
