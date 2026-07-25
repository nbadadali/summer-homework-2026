import { destroySession } from "./utils/session.js";
import { json, getToken } from "./utils/http.js";

export const handler = async (event) => {
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" });
  await destroySession(getToken(event));
  return json(200, { ok: true });
};
