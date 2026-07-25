// Extra homework items the admin (parent/teacher) adds after the initial
// launch — this is how future homework gets added "without redesigning the
// portal" per the brief. Each custom task is a single trackable checklist
// item that shows up on every student's dashboard.
import crypto from "node:crypto";
import { tasksStore } from "./utils/store.js";
import { resolveSession } from "./utils/session.js";
import { requireAdmin } from "./utils/requireAdmin.js";
import { json, parseBody, getToken } from "./utils/http.js";

const KEY = "custom-tasks";

async function readTasks() {
  return (await tasksStore().get(KEY, { type: "json" })) || [];
}

export const handler = async (event) => {
  if (event.httpMethod === "GET") {
    const session = await resolveSession(getToken(event));
    if (!session) return json(401, { error: "Please log in again." });
    return json(200, { tasks: await readTasks() });
  }

  if (event.httpMethod === "POST") {
    const admin = await requireAdmin(event);
    if (!admin) return json(403, { error: "Admin access required." });

    const { subject, title, description, dueDate } = parseBody(event);
    if (!subject || !title) return json(400, { error: "Subject and title are required." });

    const tasks = await readTasks();
    const task = {
      id: `custom.${crypto.randomBytes(6).toString("hex")}`,
      subject,
      title,
      description: description || "",
      dueDate: dueDate || null,
      createdAt: new Date().toISOString(),
    };
    tasks.unshift(task);
    await tasksStore().setJSON(KEY, tasks);
    return json(200, { tasks });
  }

  if (event.httpMethod === "DELETE") {
    const admin = await requireAdmin(event);
    if (!admin) return json(403, { error: "Admin access required." });

    const { id } = parseBody(event);
    if (!id) return json(400, { error: "Task id is required." });

    const tasks = (await readTasks()).filter((t) => t.id !== id);
    await tasksStore().setJSON(KEY, tasks);
    return json(200, { tasks });
  }

  return json(405, { error: "Method not allowed" });
};
