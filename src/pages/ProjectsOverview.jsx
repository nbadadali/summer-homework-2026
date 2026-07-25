import { Link } from "react-router-dom";
import { PROJECTS, VISION_PAPER } from "../data/projects.js";
import { SUMMER_PROJECT_DATES } from "../data/examInfo.js";
import { useProgress } from "../context/ProgressContext.jsx";
import ProgressBar from "../components/ui/ProgressBar.jsx";
import { theme } from "../lib/colors.js";

export default function ProjectsOverview() {
  const { evaluation } = useProgress();
  if (!evaluation) return null;
  const { byProject } = evaluation;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-800 text-3xl text-ink-800">🎒 My Summer Projects</h1>
        <p className="text-ink-700/70 mt-1">
          These are your real Grade 2 Summer Project activities from Bright Riders School — turned into
          step-by-step guided lessons. Work through them one at a time, at your own pace!
        </p>
      </div>

      <section className="card bg-sky-50 border-2 border-sky-200">
        <p className="font-display font-700 text-ink-800 mb-2">📅 Submission Dates</p>
        <ul className="space-y-1 text-ink-800/90">
          {SUMMER_PROJECT_DATES.map((d) => (
            <li key={d.label}>
              <span className="font-700">{d.label}:</span> {d.date}
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-5 sm:grid-cols-2">
        {PROJECTS.map((project) => {
          const t = theme(project.color);
          const stat = byProject[project.id];
          return (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="card block hover:-translate-y-1 transition-transform"
            >
              <p className={`chip ${t.chip} mb-2`}>{project.cluster}</p>
              <div className="flex items-start gap-3">
                <span className={`text-4xl rounded-xl2 ${t.bg} p-3`}>{project.icon}</span>
                <div className="min-w-0">
                  <p className="font-display font-800 text-lg text-ink-800 leading-tight">{project.title}</p>
                  <p className="text-sm text-ink-700/70 mt-1">{project.tagline}</p>
                </div>
              </div>
              <div className="mt-4">
                <ProgressBar percent={stat.percent} color={project.color} showLabel />
              </div>
            </Link>
          );
        })}

        <Link to="/vision-paper" className="card block hover:-translate-y-1 transition-transform border-2 border-dashed border-ink-800/20">
          <p className="chip bg-ink-800/5 text-ink-700 mb-2">Part 2 · Group Research Project</p>
          <div className="flex items-start gap-3">
            <span className="text-4xl rounded-xl2 bg-ink-800/5 p-3">📄</span>
            <div>
              <p className="font-display font-800 text-lg text-ink-800 leading-tight">{VISION_PAPER.title}</p>
              <p className="text-sm text-ink-700/70 mt-1">Due {VISION_PAPER.dueDate} · {VISION_PAPER.marks} marks</p>
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
}
