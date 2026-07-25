// Seed roster for the portal. Used once by the backend to initialize
// Netlify Blobs storage on first run. The admin can reset passwords
// and progress later from the Parent/Teacher Dashboard.
export const AVATAR_EMOJIS = ["🦁", "🐼", "🦊", "🐸", "🦄", "🐧", "🐨", "🦋", "🐢", "🦉"];

export const SEED_STUDENTS = Array.from({ length: 10 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    username: `Student${n}`,
    password: `Student${n}`,
    displayName: `Student ${n}`,
    avatar: AVATAR_EMOJIS[i % AVATAR_EMOJIS.length],
  };
});

export const SEED_ADMIN = {
  username: "admin",
  password: "BrightRiders2026",
  displayName: "Parent / Teacher",
};
