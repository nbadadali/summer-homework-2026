import { useState } from "react";
import { useAdminStudents } from "./useAdminStudents.js";
import { api } from "../../lib/api.js";
import ProgressBar from "../../components/ui/ProgressBar.jsx";

function ResetPasswordForm({ username, onDone }) {
  const [newPassword, setNewPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      await api.adminResetPassword(username, newPassword);
      setMessage("Password updated!");
      setNewPassword("");
      onDone?.();
    } catch (err) {
      setMessage(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-wrap items-center gap-2">
      <input
        type="text"
        placeholder="New password"
        className="rounded-xl2 border-2 border-ink-800/10 px-3 py-2 text-sm focus:border-sky-400 outline-none"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        minLength={4}
        required
      />
      <button type="submit" disabled={busy} className="btn-secondary !px-3 !py-2 text-sm">
        🔑 Reset Password
      </button>
      {message && <span className="text-xs text-ink-700/70">{message}</span>}
    </form>
  );
}

export default function AdminStudents() {
  const { students, loading, error, refresh } = useAdminStudents();
  const [expanded, setExpanded] = useState(null);
  const [confirmReset, setConfirmReset] = useState(null);

  async function handleResetProgress(username) {
    await api.adminResetProgress(username);
    setConfirmReset(null);
    refresh();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-800 text-3xl text-ink-800">🧑‍🎓 Students</h1>
        <p className="text-ink-700/70 mt-1">View progress, reset passwords, or reset homework progress.</p>
      </div>

      {error && <p className="card text-coral-600">{error}</p>}
      {loading && <p className="text-ink-700/70">Loading...</p>}

      <div className="space-y-4">
        {students?.map((s) => (
          <div key={s.username} className="card">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{s.avatar}</span>
                <div>
                  <p className="font-display font-700 text-ink-800">{s.displayName}</p>
                  <p className="text-xs text-ink-700/60">
                    {s.username} · Last login: {s.lastLogin ? new Date(s.lastLogin).toLocaleString() : "Never"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="chip bg-sky-100 text-sky-700">{s.overallPercent}% done</span>
                <span className="chip bg-sunshine-100 text-sunshine-600">🏅 {s.badgeCount} badges</span>
                <span className="chip bg-grape-100 text-grape-600">🔥 {s.streak}d streak</span>
                <button
                  className="btn-secondary !px-3 !py-2 text-sm"
                  onClick={() => setExpanded(expanded === s.username ? null : s.username)}
                >
                  {expanded === s.username ? "Hide details" : "Manage"}
                </button>
              </div>
            </div>

            <div className="mt-3">
              <ProgressBar percent={s.overallPercent} color="sky" />
            </div>

            {expanded === s.username && (
              <div className="mt-4 border-t border-ink-800/10 pt-4 space-y-4">
                <ResetPasswordForm username={s.username} onDone={refresh} />

                <div className="flex items-center gap-2">
                  {confirmReset === s.username ? (
                    <>
                      <span className="text-sm text-coral-600 font-700">Erase all progress for {s.displayName}?</span>
                      <button className="btn-primary !bg-coral-500 hover:!bg-coral-600 !px-3 !py-2 text-sm" onClick={() => handleResetProgress(s.username)}>
                        Yes, reset it
                      </button>
                      <button className="btn-secondary !px-3 !py-2 text-sm" onClick={() => setConfirmReset(null)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button className="btn-secondary !px-3 !py-2 text-sm" onClick={() => setConfirmReset(s.username)}>
                      ♻️ Reset Homework Progress
                    </button>
                  )}
                </div>

                <div>
                  <p className="font-700 text-ink-800 text-sm mb-2">Recent Activity</p>
                  {s.recentActivity?.length ? (
                    <ul className="space-y-1 text-sm text-ink-800/80">
                      {s.recentActivity.map((a) => (
                        <li key={a.id}>✅ {a.label}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-ink-700/60">No activity yet.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
