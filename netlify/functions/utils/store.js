import { getStore } from "@netlify/blobs";
import crypto from "node:crypto";
import { SEED_STUDENTS, SEED_ADMIN } from "../../../src/data/students.js";

// A single, low-stakes salt is fine here — this portal protects Grade 2
// homework progress, not sensitive personal data. Do not reuse this pattern
// for anything that actually needs strong security.
const SALT = "brs-grade2-summer-portal-2026";

export function hashPassword(password) {
  return crypto.createHash("sha256").update(`${SALT}:${password}`).digest("hex");
}

// Netlify normally auto-injects Blobs credentials into every Function
// invocation (zero-config mode). On some site/account configurations that
// injection doesn't happen, so BLOBS_SITE_ID / BLOBS_TOKEN (set as site
// environment variables) are used as an explicit fallback — this is
// Netlify's documented "manual configuration" mode for @netlify/blobs.
function makeStore(name) {
  if (process.env.BLOBS_SITE_ID && process.env.BLOBS_TOKEN) {
    return getStore({ name, siteID: process.env.BLOBS_SITE_ID, token: process.env.BLOBS_TOKEN });
  }
  return getStore(name);
}

export const accountsStore = () => makeStore("accounts");
export const progressStore = () => makeStore("progress");
export const sessionsStore = () => makeStore("sessions");
export const tasksStore = () => makeStore("tasks");

let seedPromise = null;

// Idempotent: only writes seed accounts the first time the store is empty.
// Safe to call on every function invocation.
export async function ensureSeeded() {
  if (seedPromise) return seedPromise;
  seedPromise = (async () => {
    const accounts = accountsStore();
    const marker = await accounts.get("__seeded__", { type: "json" });
    if (marker) return;

    const all = [
      ...SEED_STUDENTS.map((s) => ({ ...s, role: "student" })),
      { ...SEED_ADMIN, role: "admin" },
    ];

    for (const account of all) {
      await accounts.setJSON(account.username.toLowerCase(), {
        username: account.username,
        role: account.role,
        displayName: account.displayName,
        avatar: account.avatar || null,
        passwordHash: hashPassword(account.password),
        createdAt: new Date().toISOString(),
      });
    }

    await accounts.setJSON("__seeded__", { seededAt: new Date().toISOString() });
  })();
  return seedPromise;
}

export function defaultProgress() {
  return {
    completedIds: [],
    quizBestScore: 0,
    quizAttempts: [],
    streak: 0,
    lastLogin: null,
    recentActivity: [],
  };
}
