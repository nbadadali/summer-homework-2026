import { progressStore, accountsStore, defaultProgress } from "./utils/store.js";
import { requireAdmin } from "./utils/requireAdmin.js";
import { json, parseBody } from "./utils/http.js";

export const handler = async (event) => {
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" });

  const admin = await requireAdmin(event);
  if (!admin) return json(403, { error: "Admin access required." });

  const { username } = parseBody(event);
  if (!username) return json(400, { error: "Username is required." });

  const key = String(username).toLowerCase();
  const account = await accountsStore().get(key, { type: "json" });
  if (!account) return json(404, { error: "Student not found." });

  await progressStore().setJSON(key, defaultProgress());

  return json(200, { ok: true });
};
