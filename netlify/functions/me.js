import { accountsStore } from "./utils/store.js";
import { resolveSession } from "./utils/session.js";
import { json, getToken } from "./utils/http.js";

export const handler = async (event) => {
  const session = await resolveSession(getToken(event));
  if (!session) return json(401, { error: "Not logged in." });

  const account = await accountsStore().get(session.username.toLowerCase(), { type: "json" });
  if (!account) return json(401, { error: "Account no longer exists." });

  return json(200, {
    user: {
      username: account.username,
      role: account.role,
      displayName: account.displayName,
      avatar: account.avatar,
    },
  });
};
