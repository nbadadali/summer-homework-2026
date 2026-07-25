import { accountsStore, ensureSeeded, hashPassword, progressStore, defaultProgress } from "./utils/store.js";
import { createSession } from "./utils/session.js";
import { json, parseBody } from "./utils/http.js";
import { updateStreak } from "./utils/streak.js";

export const handler = async (event) => {
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" });

  await ensureSeeded();

  const { username, password } = parseBody(event);
  if (!username || !password) return json(400, { error: "Username and password are required." });

  const accounts = accountsStore();
  const account = await accounts.get(String(username).toLowerCase(), { type: "json" });

  if (!account || account.passwordHash !== hashPassword(password)) {
    return json(401, { error: "Incorrect username or password. Ask a grown-up for help." });
  }

  const token = await createSession({ username: account.username, role: account.role });

  if (account.role === "student") {
    const progress = progressStore();
    const key = account.username.toLowerCase();
    const current = (await progress.get(key, { type: "json" })) || defaultProgress();
    current.streak = updateStreak(current);
    current.lastLogin = new Date().toISOString();
    await progress.setJSON(key, current);
  }

  return json(200, {
    token,
    user: {
      username: account.username,
      role: account.role,
      displayName: account.displayName,
      avatar: account.avatar,
    },
  });
};
