import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useProgress } from "../context/ProgressContext.jsx";
import { PROJECTS } from "../data/projects.js";
import { quoteForToday, factForToday } from "../data/quotes.js";
import ProgressRing from "../components/ui/ProgressRing.jsx";
import ProgressBar from "../components/ui/ProgressBar.jsx";
import { theme } from "../lib/colors.js";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function StudentDashboard() {
  const { user } = useAuth();
  const { progress, tasks, evaluation, isDone, toggleItem, loading } = useProgress();

  if (loading || !evaluation) {
    return <p className="font-display text-lg text-sky-600 animate-pulse">Loading your dashboard... 🎒</p>;
  }

  const { byProject, overallPercent } = evaluation;

  return (
    <div className="space-y-8">
      <section className="card bg-gradient-to-br from-sky-500 to-grape-500 text-white overflow-hidden relative">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
          <div>
            <p className="text-sky-50/90 font-700">{greeting()},</p>
            <h1 className="font-display font-800 text-3xl sm:text-4xl">
              {user.avatar} {user.displayName}!
            </h1>
            <p className="mt-2 text-sky-50/90 max-w-md">{quoteForToday()}</p>
          </div>
          <div className="bg-white/15 backdrop-blur rounded-xl3 p-4 flex flex-col items-center gap-2">
            <ProgressRing percent={overallPercent} color="#ffffff" size={110} label="done" />
            <span className="text-sm font-700">Summer Homework</span>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3 relative z-10">
          <span className="chip bg-white/20">🔥 {progress?.streak || 0} day streak</span>
          <span className="chip bg-white/20">⭐ {evaluation.earned.length} badges earned</span>
          <span className="chip bg-white/20">🧠 Best quiz score: {progress?.quizBestScore || 0}/10</span>
        </div>
      </section>

      <section className="card bg-sunshine-50 border-2 border-sunshine-300">
        <p className="font-display font-700 text-ink-800 flex items-center gap-2">
          <span className="text-xl">🌞</span> Fun Fact of the Day
        </p>
        <p className="mt-1 text-ink-800/90">{factForToday()}</p>
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-800 text-xl text-ink-800">🎒 My Projects</h2>
          <Link to="/projects" className="text-sky-600 font-700 hover:underline">
            See all →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {PROJECTS.map((project) => {
            const t = theme(project.color);
            const stat = byProject[project.id];
            return (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="card hover:-translate-y-1 transition-transform block"
              >
                <div className="flex items-start gap-3">
                  <span className={`text-4xl rounded-xl2 ${t.bg} p-3`}>{project.icon}</span>
                  <div className="min-w-0 flex-1">
                    <p className={`chip ${t.chip} mb-1`}>{project.subject}</p>
                    <p className="font-display font-700 text-ink-800 leading-tight">{project.title}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <ProgressBar percent={stat.percent} color={project.color} showLabel />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {tasks?.length > 0 && (
        <section>
          <h2 className="font-display font-800 text-xl text-ink-800 mb-3">📝 New From Your Teacher</h2>
          <div className="space-y-3">
            {tasks.map((task) => (
              <label key={task.id} className="card flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-1 h-6 w-6 accent-grass-500 rounded-md"
                  checked={isDone(task.id)}
                  onChange={(e) => toggleItem(task.id, task.title, task.subject, e.target.checked)}
                />
                <div>
                  <p className="chip bg-grape-100 text-grape-600 mb-1">{task.subject}</p>
                  <p className="font-700 text-ink-800">{task.title}</p>
                  {task.description && <p className="text-sm text-ink-700/70 mt-1">{task.description}</p>}
                  {task.dueDate && <p className="text-xs text-ink-700/60 mt-1">Due: {task.dueDate}</p>}
                </div>
              </label>
            ))}
          </div>
        </section>
      )}

      <section className="grid sm:grid-cols-3 gap-4">
        <Link to="/science-quiz" className="card text-center hover:-translate-y-1 transition-transform">
          <div className="text-4xl mb-2">🧠</div>
          <p className="font-display font-700">Science Fun Quiz</p>
        </Link>
        <Link to="/my-progress" className="card text-center hover:-translate-y-1 transition-transform">
          <div className="text-4xl mb-2">📊</div>
          <p className="font-display font-700">My Progress</p>
        </Link>
        <Link to="/achievements" className="card text-center hover:-translate-y-1 transition-transform">
          <div className="text-4xl mb-2">🏆</div>
          <p className="font-display font-700">Achievements</p>
        </Link>
      </section>
    </div>
  );
}
