// Seed roster for the portal. Used once by the backend to initialize
// Netlify Blobs storage on first run. The admin can reset passwords
// and progress later from the Parent/Teacher Dashboard.
//
// NOTE: Seeding is one-time — it only runs the first time the "accounts"
// Blobs store is empty. On an already-deployed site, editing the passwords
// here does NOT change the live passwords; that must be done via the admin
// "Reset Password" action (or the admin-reset-password API) instead. This
// file is kept in sync anyway so it stays accurate for documentation and for
// disaster-recovery re-seeding if the store is ever wiped.
export const AVATAR_EMOJIS = ["🦁", "🐼", "🦊", "🐸", "🦄", "🐧", "🐨", "🦋", "🐢", "🦉"];

const STUDENT_PASSWORDS = {
  Student01: "Sunny123",
  Student02: "Apple123",
  Student03: "Rocket123",
  Student04: "Tiger123",
  Student05: "Rainbow123",
  Student06: "Panda123",
  Student07: "Ocean123",
  Student08: "Bunny123",
  Student09: "Castle123",
  Student10: "Galaxy123",
};

export const SEED_STUDENTS = Array.from({ length: 10 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  const username = `Student${n}`;
  return {
    username,
    password: STUDENT_PASSWORDS[username],
    displayName: `Student ${n}`,
    avatar: AVATAR_EMOJIS[i % AVATAR_EMOJIS.length],
  };
});

export const SEED_ADMIN = {
  username: "admin",
  password: "AdminLrn2026",
  displayName: "Parent / Teacher",
};
