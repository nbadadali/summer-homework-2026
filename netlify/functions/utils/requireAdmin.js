import { resolveSession } from "./session.js";
import { getToken } from "./http.js";

export async function requireAdmin(event) {
  const session = await resolveSession(getToken(event));
  if (!session || session.role !== "admin") return null;
  return session;
}
