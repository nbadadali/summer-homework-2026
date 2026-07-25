import { useEffect, useRef } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getProjectById } from "../data/projects.js";
import { useProgress } from "../context/ProgressContext.jsx";
import ProgressBar from "../components/ui/ProgressBar.jsx";
import ChecklistItem from "../components/ui/ChecklistItem.jsx";
import Callout from "../components/ui/Callout.jsx";
import VocabList from "../components/ui/VocabList.jsx";
import { theme } from "../lib/colors.js";
import { celebrate } from "../lib/confetti.js";

function StepCard({ step, index, done, onToggle, color }) {
  const t = theme(color);
  return (
    <div className={`card border-2 ${done ? "border-grass-300 bg-grass-50/40" : "border-transparent"}`}>
      <div className="flex items-start gap-4">
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full font-display font-800 shrink-0 ${
            done ? "bg-grass-500 text-white" : `${t.solid} text-white`
          }`}
        >
          {done ? "✓" : index + 1}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-display font-700 text-lg text-ink-800">{step.title}</p>
          <p className="mt-1 text-ink-800/90">{step.instruction}</p>
          {step.instructionEn && <p className="mt-1 text-ink-700/70 italic text-sm">{step.instructionEn}</p>}
          {step.hint && (
            <p className="mt-2 text-sm text-sky-700 bg-sky-50 rounded-xl2 px-3 py-2 inline-block">💡 Hint: {step.hint}</p>
          )}
          {step.example && (
            <p className="mt-2 text-sm text-grape-600 bg-grape-50 rounded-xl2 px-3 py-2">✏️ Example: {step.example}</p>
          )}
          <label className="mt-3 flex items-center gap-2 cursor-pointer w-fit">
            <input
              type="checkbox"
              className="h-5 w-5 accent-grass-500 rounded-md cursor-pointer"
              checked={done}
              onChange={(e) => onToggle(e.target.checked)}
            />
            <span className="text-sm font-700 text-ink-700">Mark this step done</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default function ProjectDetail() {
  const { projectId } = useParams();
  const project = getProjectById(projectId);
  const { isDone, toggleItem, evaluation } = useProgress();
  const celebratedRef = useRef(false);

  const stat = evaluation?.byProject?.[projectId];

  useEffect(() => {
    celebratedRef.current = false;
  }, [projectId]);

  useEffect(() => {
    if (stat?.percent === 100 && !celebratedRef.current) {
      celebratedRef.current = true;
      celebrate();
    }
  }, [stat?.percent]);

  if (!project) return <Navigate to="/projects" replace />;

  const t = theme(project.color);

  return (
    <div className="space-y-8">
      <Link to="/projects" className="text-sky-600 font-700 hover:underline">
        ← Back to My Projects
      </Link>

      <header className="card">
        <p className={`chip ${t.chip} mb-2`}>{project.cluster}</p>
        <div className="flex items-start gap-4">
          <span className={`text-5xl rounded-xl2 ${t.bg} p-3`}>{project.icon}</span>
          <div className="min-w-0">
            <h1 className="font-display font-800 text-2xl sm:text-3xl text-ink-800 leading-tight">{project.title}</h1>
            <p className="text-ink-700/70 mt-1">{project.tagline}</p>
          </div>
        </div>
        <div className="mt-5">
          <ProgressBar percent={stat?.percent || 0} color={project.color} showLabel />
        </div>
        {stat?.percent === 100 && (
          <p className="mt-3 font-display font-700 text-grass-600">🎉 Project complete! Amazing work!</p>
        )}
      </header>

      <section className="card">
        <p className="font-display font-700 text-ink-800 mb-2 flex items-center gap-2">
          <span className="text-xl">🎯</span> Objective
        </p>
        <p className="text-ink-800/90">{project.objective}</p>
        {project.objectiveEn && <p className="text-ink-700/70 italic mt-1">{project.objectiveEn}</p>}
      </section>

      {project.problemStatement && (
        <Callout type="info" title="The Challenge">
          {project.problemStatement}
        </Callout>
      )}

      {project.funFacts && (
        <Callout type="info" title="Fun Facts to Get You Started" items={project.funFacts} />
      )}

      {project.materials && (
        <section className="card">
          <p className="font-display font-700 text-ink-800 mb-3 flex items-center gap-2">
            <span className="text-xl">🧰</span> Materials Required
          </p>
          <ul className="space-y-1.5 text-ink-800/90">
            {project.materials.map((m, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden="true">•</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {project.designChoices && (
        <section className="grid sm:grid-cols-2 gap-4">
          {project.designChoices.map((d) => (
            <div key={d.name} className="card">
              <p className="font-display font-700 text-ink-800">{d.name}</p>
              <p className="text-ink-800/80 mt-1 text-sm">{d.description}</p>
            </div>
          ))}
        </section>
      )}

      <VocabList words={project.vocabulary} />

      <section>
        <h2 className="font-display font-800 text-xl text-ink-800 mb-3">📋 Step-by-Step Guide</h2>
        <div className="space-y-4">
          {project.steps.map((step, i) => (
            <StepCard
              key={step.id}
              step={step}
              index={i}
              color={project.color}
              done={isDone(step.id)}
              onToggle={(checked) => toggleItem(step.id, step.title, project.subject, checked)}
            />
          ))}
        </div>
      </section>

      {project.exampleRules && (
        <section>
          <h2 className="font-display font-800 text-xl text-ink-800 mb-3">✨ Example Rules You Can Use</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {project.exampleRules.map((r, i) => (
              <div key={i} className="card">
                <p className="font-700 text-ink-800">{r.french}</p>
                <p className="text-sm text-ink-700/70 italic mt-1">{r.english}</p>
                <p className="text-xs text-grape-600 mt-2">🎨 Draw: {r.drawingIdea}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {project.arabicPhrases && (
        <section>
          <h2 className="font-display font-800 text-xl text-ink-800 mb-3">🔤 Choose Your Arabic Phrase</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {project.arabicPhrases.map((p, i) => (
              <div key={i} className="card text-center">
                <p className="text-2xl font-700 text-ink-800" dir="rtl">{p.arabic}</p>
                <p className="text-xs text-ink-700/60 mt-1">{p.transliteration}</p>
                <p className="text-sm text-sky-600 mt-1">{p.english}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {project.values && (
        <section>
          <h2 className="font-display font-800 text-xl text-ink-800 mb-3">💎 Choose Your Value Word</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {project.values.map((v) => (
              <div key={v.word} className="rounded-xl2 bg-grass-50 px-4 py-3">
                <p className="font-700 text-grass-700">{v.word}</p>
                <p className="text-sm text-ink-800/70">{v.meaning}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {project.mathActivity && (
        <Callout type="info" title={project.mathActivity.title} items={project.mathActivity.options} />
      )}

      {project.guidingQuestions && (
        <section className="card">
          <p className="font-display font-700 text-ink-800 mb-3 flex items-center gap-2">
            <span className="text-xl">🤔</span> Think About It
          </p>
          <div className="grid sm:grid-cols-2 gap-2">
            {project.guidingQuestions.map((q, i) => (
              <p key={i} className="text-ink-800/90 bg-ink-800/5 rounded-xl2 px-3 py-2 text-sm">
                {q}
              </p>
            ))}
          </div>
        </section>
      )}

      {project.conclusionQuestions && (
        <section className="card">
          <p className="font-display font-700 text-ink-800 mb-3 flex items-center gap-2">
            <span className="text-xl">✍️</span> Conclusion — Write Your Answers on Your Poster
          </p>
          <div className="space-y-2">
            {project.conclusionQuestions.map((q, i) => (
              <div key={i} className="bg-ink-800/5 rounded-xl2 px-3 py-2">
                <p className="text-ink-800 font-700 text-sm">{q.fr}</p>
                <p className="text-ink-700/70 text-xs italic">{q.en}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {project.finalProductOptions && (
        <Callout type="info" title="Choose Your Final Product" items={project.finalProductOptions} />
      )}

      {project.selfAssessment && (
        <section className="card overflow-x-auto">
          <p className="font-display font-700 text-ink-800 mb-1">{project.selfAssessment.title}</p>
          <p className="text-sm text-ink-700/70 mb-3">{project.selfAssessment.instructions}</p>
          <table className="w-full text-sm min-w-[420px]">
            <thead>
              <tr className="text-left">
                <th className="py-2">Critère</th>
                {project.selfAssessment.scale.map((s) => (
                  <th key={s} className="py-2 text-center">{s}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {project.selfAssessment.criteria.map((c) => (
                <tr key={c} className="border-t border-ink-800/10">
                  <td className="py-2 pr-4">{c}</td>
                  {project.selfAssessment.scale.map((s) => (
                    <td key={s} className="py-2 text-center">☐</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {project.rubric && (
        <section className="card overflow-x-auto">
          <p className="font-display font-700 text-ink-800 mb-3">{project.rubric.title}</p>
          <table className="w-full text-sm min-w-[380px]">
            <tbody>
              {project.rubric.rows.map((r) => (
                <tr key={r.criterion} className="border-t border-ink-800/10">
                  <td className="py-2 pr-4">{r.criterion}</td>
                  <td className="py-2 text-right font-700 w-16">{r.points} pts</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        {project.tips && <Callout type="tip" items={project.tips} />}
        {project.avoid && <Callout type="avoid" items={project.avoid} />}
      </div>

      <section>
        <h2 className="font-display font-800 text-xl text-ink-800 mb-3">✅ Completion Checklist</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {project.checklist.map((item) => (
            <ChecklistItem
              key={item.id}
              label={item.label}
              checked={isDone(item.id)}
              onChange={(checked) => toggleItem(item.id, item.label, project.subject, checked)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
