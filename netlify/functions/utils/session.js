import crypto from "node:crypto";
import { sessionsStore } from "./store.js";

const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export async function createSession({ username, role }) {
  const token = crypto.randomBytes(24).toString("hex");
  const sessions = sessionsStore();
  await sessions.setJSON(token, {
    username,
    role,
    expiresAt: Date.now() + SESSION_TTL_MS,
  });
  return token;
}

export async function resolveSession(token) {
  if (!token) return null;
  const sessions = sessionsStore();
  const session = await sessions.get(token, { type: "json" });
  if (!session) return null;
  if (session.expiresAt < Date.now()) {
    await sessions.delete(token);
    return null;
  }
  return session;
}

export async function destroySession(token) {
  if (!token) return;
  await sessionsStore().delete(token);
}
