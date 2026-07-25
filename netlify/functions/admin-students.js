import { accountsStore, progressStore, ensureSeeded, defaultProgress } from "./utils/store.js";
import { requireAdmin } from "./utils/requireAdmin.js";
import { json } from "./utils/http.js";
import { evaluateBadges } from "../../src/data/badges.js";

export const handler = async (event) => {
  if (event.httpMethod !== "GET") return json(405, { error: "Method not allowed" });

  const admin = await requireAdmin(event);
  if (!admin) return json(403, { error: "Admin access required." });

  await ensureSeeded();

  const accounts = accountsStore();
  const progress = progressStore();
  const { blobs } = await accounts.list();

  const students = [];
  for (const { key } of blobs) {
    if (key === "__seeded__") continue;
    const account = await accounts.get(key, { type: "json" });
    if (!account || account.role !== "student") continue;

    const p = (await progress.get(key, { type: "json" })) || defaultProgress();
    const { overallPercent, totalDone, totalItems, earned } = evaluateBadges({
      completedIds: p.completedIds || [],
      quizBestScore: p.quizBestScore || 0,
      streak: p.streak || 0,
    });

    students.push({
      username: account.username,
      displayName: account.displayName,
      avatar: account.avatar,
      overallPercent,
      totalDone,
      totalItems,
      badgeCount: earned.length,
      quizBestScore: p.quizBestScore || 0,
      streak: p.streak || 0,
      lastLogin: p.lastLogin,
      recentActivity: p.recentActivity || [],
    });
  }

  students.sort((a, b) => a.username.localeCompare(b.username, undefined, { numeric: true }));

  return json(200, { students });
};
