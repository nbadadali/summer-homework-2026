import { Link } from "react-router-dom";
import { useProgress } from "../context/ProgressContext.jsx";
import { PROJECTS } from "../data/projects.js";
import ProgressBar from "../components/ui/ProgressBar.jsx";
import ProgressRing from "../components/ui/ProgressRing.jsx";

function timeAgo(iso) {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

export default function MyProgress() {
  const { progress, evaluation } = useProgress();
  if (!evaluation) return null;

  const { byProject, overallPercent, totalDone, totalItems } = evaluation;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-800 text-3xl text-ink-800">📊 My Progress</h1>
        <p className="text-ink-700/70 mt-1">See how much of your summer homework you've completed.</p>
      </div>

      <section className="card flex flex-col sm:flex-row items-center gap-6">
        <ProgressRing percent={overallPercent} size={140} label="overall" />
        <div className="grid grid-cols-2 gap-4 flex-1 w-full">
          <div className="rounded-xl2 bg-sky-50 p-4 text-center">
            <p className="text-3xl font-display font-800 text-sky-600">{totalDone}</p>
            <p className="text-sm text-ink-700/70">Tasks completed</p>
          </div>
          <div className="rounded-xl2 bg-grass-50 p-4 text-center">
            <p className="text-3xl font-display font-800 text-grass-600">{totalItems - totalDone}</p>
            <p className="text-sm text-ink-700/70">Tasks remaining</p>
          </div>
          <div className="rounded-xl2 bg-sunshine-50 p-4 text-center">
            <p className="text-3xl font-display font-800 text-sunshine-600">{progress?.streak || 0}</p>
            <p className="text-sm text-ink-700/70">Day streak</p>
          </div>
          <div className="rounded-xl2 bg-grape-50 p-4 text-center">
            <p className="text-3xl font-display font-800 text-grape-600">{progress?.quizBestScore || 0}/10</p>
            <p className="text-sm text-ink-700/70">Best quiz score</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display font-800 text-xl text-ink-800 mb-3">By Project</h2>
        <div className="space-y-4">
          {PROJECTS.map((project) => {
            const stat = byProject[project.id];
            return (
              <Link key={project.id} to={`/projects/${project.id}`} className="card block hover:-translate-y-0.5 transition-transform">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-display font-700 text-ink-800">
                    {project.icon} {project.title}
                  </p>
                  <span className="text-sm font-700 text-ink-700/70">
                    {stat.done}/{stat.total}
                  </span>
                </div>
                <ProgressBar percent={stat.percent} color={project.color} />
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="font-display font-800 text-xl text-ink-800 mb-3">Recently Completed</h2>
        {progress?.recentActivity?.length ? (
          <ul className="card divide-y divide-ink-800/10">
            {progress.recentActivity.map((a) => (
              <li key={a.id} className="py-3 flex items-center justify-between gap-3">
                <div>
                  <p className="font-700 text-ink-800">✅ {a.label}</p>
                  {a.subject && <p className="text-xs text-ink-700/60">{a.subject}</p>}
                </div>
                <span className="text-xs text-ink-700/60 whitespace-nowrap">{timeAgo(a.completedAt)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="card text-center text-ink-700/70">
            Nothing completed yet — go finish your first activity! 🚀
          </div>
        )}
      </section>
    </div>
  );
}
