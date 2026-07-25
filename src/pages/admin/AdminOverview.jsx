import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useAdminStudents } from "./useAdminStudents.js";
import ProgressBar from "../../components/ui/ProgressBar.jsx";

export default function AdminOverview() {
  const { user } = useAuth();
  const { students, loading, error } = useAdminStudents();

  const avgPercent =
    students?.length ? Math.round(students.reduce((sum, s) => sum + s.overallPercent, 0) / students.length) : 0;
  const fullyDone = students?.filter((s) => s.overallPercent === 100).length || 0;
  const notStarted = students?.filter((s) => s.overallPercent === 0).length || 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-800 text-3xl text-ink-800">👋 Welcome, {user.displayName}</h1>
        <p className="text-ink-700/70 mt-1">Here's how the class is doing with their Grade 2 Summer Homework.</p>
      </div>

      {error && <p className="card text-coral-600">{error}</p>}
      {loading && <p className="text-ink-700/70">Loading class stats...</p>}

      {students && (
        <>
          <section className="grid sm:grid-cols-4 gap-4">
            <div className="card text-center">
              <p className="text-3xl font-display font-800 text-sky-600">{students.length}</p>
              <p className="text-sm text-ink-700/70">Students</p>
            </div>
            <div className="card text-center">
              <p className="text-3xl font-display font-800 text-grass-600">{avgPercent}%</p>
              <p className="text-sm text-ink-700/70">Class average</p>
            </div>
            <div className="card text-center">
              <p className="text-3xl font-display font-800 text-sunshine-600">{fullyDone}</p>
              <p className="text-sm text-ink-700/70">Fully complete</p>
            </div>
            <div className="card text-center">
              <p className="text-3xl font-display font-800 text-coral-600">{notStarted}</p>
              <p className="text-sm text-ink-700/70">Not started yet</p>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display font-800 text-xl text-ink-800">Class Progress</h2>
              <Link to="/students" className="text-sky-600 font-700 hover:underline">
                Manage students →
              </Link>
            </div>
            <div className="card space-y-4">
              {students.map((s) => (
                <div key={s.username}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-700 text-ink-800">
                      {s.avatar} {s.displayName}
                    </span>
                    <span className="text-sm text-ink-700/70">{s.overallPercent}%</span>
                  </div>
                  <ProgressBar percent={s.overallPercent} color="sky" />
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
