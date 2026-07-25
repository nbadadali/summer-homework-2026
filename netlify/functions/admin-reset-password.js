import { accountsStore, hashPassword } from "./utils/store.js";
import { requireAdmin } from "./utils/requireAdmin.js";
import { json, parseBody } from "./utils/http.js";

export const handler = async (event) => {
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" });

  const admin = await requireAdmin(event);
  if (!admin) return json(403, { error: "Admin access required." });

  const { username, newPassword } = parseBody(event);
  if (!username || !newPassword || newPassword.length < 4) {
    return json(400, { error: "Username and a password of at least 4 characters are required." });
  }

  const accounts = accountsStore();
  const key = String(username).toLowerCase();
  const account = await accounts.get(key, { type: "json" });
  if (!account) return json(404, { error: "Student not found." });

  account.passwordHash = hashPassword(newPassword);
  await accounts.setJSON(key, account);

  return json(200, { ok: true });
};
