import { useEffect, useState } from "react";
import { api } from "../../lib/api.js";

const emptyForm = { subject: "", title: "", description: "", dueDate: "" };

export default function AdminManageHomework() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    try {
      const { tasks } = await api.getTasks();
      setTasks(tasks);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    setError("");
    if (!form.subject.trim() || !form.title.trim()) {
      setError("Subject and title are required.");
      return;
    }
    setBusy(true);
    try {
      const { tasks } = await api.addTask(form);
      setTasks(tasks);
      setForm(emptyForm);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(id) {
    const { tasks } = await api.deleteTask(id);
    setTasks(tasks);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-800 text-3xl text-ink-800">📝 Manage Homework</h1>
        <p className="text-ink-700/70 mt-1">
          Add new homework here at any time — it instantly appears on every student's dashboard as a new
          checklist item, without needing any redesign of the portal.
        </p>
      </div>

      <form onSubmit={handleAdd} className="card space-y-3">
        <p className="font-display font-700 text-ink-800">➕ Add New Homework Item</p>
        <div className="grid sm:grid-cols-2 gap-3">
          <input
            className="rounded-xl2 border-2 border-ink-800/10 px-4 py-2.5 focus:border-sky-400 outline-none"
            placeholder="Subject (e.g. Mathematics)"
            value={form.subject}
            onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
          />
          <input
            className="rounded-xl2 border-2 border-ink-800/10 px-4 py-2.5 focus:border-sky-400 outline-none"
            placeholder="Title (e.g. Times Table Practice)"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          />
        </div>
        <textarea
          className="w-full rounded-xl2 border-2 border-ink-800/10 px-4 py-2.5 focus:border-sky-400 outline-none"
          placeholder="Description / instructions (optional)"
          rows={3}
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
        />
        <input
          type="text"
          className="rounded-xl2 border-2 border-ink-800/10 px-4 py-2.5 focus:border-sky-400 outline-none"
          placeholder="Due date (optional, e.g. 5 September 2026)"
          value={form.dueDate}
          onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))}
        />
        {error && <p className="text-coral-600 text-sm">{error}</p>}
        <button type="submit" disabled={busy} className="btn-primary">
          {busy ? "Adding..." : "Add Homework"}
        </button>
      </form>

      <section>
        <h2 className="font-display font-800 text-xl text-ink-800 mb-3">Current Additional Homework</h2>
        {loading && <p className="text-ink-700/70">Loading...</p>}
        {!loading && tasks.length === 0 && (
          <p className="card text-ink-700/70">No additional homework added yet.</p>
        )}
        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task.id} className="card flex items-start justify-between gap-4">
              <div>
                <p className="chip bg-grape-100 text-grape-600 mb-1">{task.subject}</p>
                <p className="font-700 text-ink-800">{task.title}</p>
                {task.description && <p className="text-sm text-ink-700/70 mt-1">{task.description}</p>}
                {task.dueDate && <p className="text-xs text-ink-700/60 mt-1">Due: {task.dueDate}</p>}
              </div>
              <button className="btn-secondary !px-3 !py-2 text-sm shrink-0" onClick={() => handleDelete(task.id)}>
                🗑️ Remove
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
