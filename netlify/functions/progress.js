import { progressStore, defaultProgress } from "./utils/store.js";
import { resolveSession } from "./utils/session.js";
import { json, parseBody, getToken } from "./utils/http.js";

const MAX_RECENT_ACTIVITY = 12;
const MAX_QUIZ_ATTEMPTS = 20;

export const handler = async (event) => {
  const session = await resolveSession(getToken(event));
  if (!session) return json(401, { error: "Please log in again." });

  const key = session.username.toLowerCase();
  const store = progressStore();

  if (event.httpMethod === "GET") {
    const progress = (await store.get(key, { type: "json" })) || defaultProgress();
    return json(200, { progress });
  }

  if (event.httpMethod === "POST") {
    const body = parseBody(event);
    const progress = (await store.get(key, { type: "json" })) || defaultProgress();

    if (body.action === "toggle") {
      const { id, label, subject, completed } = body;
      if (!id) return json(400, { error: "Missing id." });

      const set = new Set(progress.completedIds);
      if (completed) set.add(id);
      else set.delete(id);
      progress.completedIds = [...set];

      if (completed) {
        progress.recentActivity = [
          { id, label: label || id, subject: subject || "", completedAt: new Date().toISOString() },
          ...progress.recentActivity.filter((a) => a.id !== id),
        ].slice(0, MAX_RECENT_ACTIVITY);
      } else {
        progress.recentActivity = progress.recentActivity.filter((a) => a.id !== id);
      }
    } else if (body.action === "quiz") {
      const { partId, score, total } = body;
      if (typeof score !== "number" || typeof total !== "number") {
        return json(400, { error: "Missing quiz score." });
      }
      progress.quizBestScore = Math.max(progress.quizBestScore || 0, score);
      progress.quizAttempts = [
        { partId, score, total, at: new Date().toISOString() },
        ...(progress.quizAttempts || []),
      ].slice(0, MAX_QUIZ_ATTEMPTS);
    } else {
      return json(400, { error: "Unknown action." });
    }

    await store.setJSON(key, progress);
    return json(200, { progress });
  }

  return json(405, { error: "Method not allowed" });
};
