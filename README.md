# Sunny Summer Explorers 🌞
### Grade 2 (French Section) Summer Homework Portal — Bright Riders School, Dubai

An interactive, gamified web portal that turns the official Grade 2 Summer Project
documents into guided, step-by-step lessons a 7-year-old can follow independently —
with progress tracking, badges, a printable certificate, and a parent/teacher
dashboard.

## What's inside

- **4 fully guided projects**, built directly from the school's own documents:
  - 📔 *My Summer Photo Diary* (English)
  - ☀️ *Save Energy, Save Our Future! — Solar Oven Challenge* (Science & Maths)
  - 💧 *Sauvons l'eau* — Save Water French poster
  - 🖐️ *My UAE Handprint* (Arabic / Islamic Studies / MSCS)
- **Science Fun Quiz** — a 200-question flashcard/quiz game built from the school's
  Grade 1 & 2 Science Question Bank, split into 4 topic decks.
- **Important Dates** — summer project due dates plus a reference-only look at the
  Term 1 SA1 exam calendar and syllabus topic list (no invented worksheet content —
  each topic just points back to the textbook/teacher, as requested).
- **Downloads** — the original school PDFs/DOCX for parents who want the source.
- **Student accounts** (`Student01`…`Student10`, matching password) with independent,
  cross-device progress tracking, streaks, badges, and a printable certificate.
- **Parent/Teacher admin account** (`admin`) to view every student's progress, reset
  passwords/progress, and add brand-new homework items on the fly — no redesign
  needed.

## Tech stack

- **Frontend:** React 18 + Vite + Tailwind CSS + React Router
- **Backend:** Netlify Functions (Node, ESM) + **Netlify Blobs** for persistent,
  cross-device data storage — no external database or paid service required, it's
  built into Netlify's free tier.

## Project structure

```
portal/
├── netlify/functions/     # Serverless API (auth, progress, admin, custom tasks)
├── public/downloads/      # Original school documents, served as static files
├── src/
│   ├── components/        # Reusable UI (layout shell, cards, progress bars...)
│   ├── context/           # AuthContext + ProgressContext (React Context + hooks)
│   ├── data/               # All homework content, as structured JS — single
│   │                        source of truth for both the UI and the backend
│   ├── lib/                # API client, confetti, certificate generator
│   └── pages/               # One file per route (student pages + admin/*)
└── netlify.toml
```

### Why a `src/data/` content layer?

Every project, quiz question, exam date, and seed student account lives in plain
JS objects in `src/data/`. That's the single source of truth — components render
it, and the Netlify Functions import the same files for seeding and badge
calculations. **To add new homework after launch, you don't need to touch this
code at all** — use the "Manage Homework" screen in the admin dashboard, which
stores new items in Netlify Blobs and merges them into every student's dashboard
automatically.

## Local development

```bash
npm install
npx netlify-cli dev
```

This starts Vite (`:5173`) behind the Netlify dev proxy (`:8888`), which also
emulates Netlify Blobs locally — no account needed to develop.

Visit **http://localhost:8888**, and log in with any seed account — current
usernames and passwords are in `src/data/students.js` (not reproduced here to
avoid this file becoming a second, easily-stale copy of live credentials).

> `npm run dev` alone only starts the Vite frontend — the `/api/*` calls will
> 404 without `netlify dev` also running the Functions + Blobs emulation.

## Deploying to Netlify

1. Push this `portal/` folder to a GitHub repo (or run `netlify deploy` directly
   from this folder with the Netlify CLI — a git repo isn't required).
2. In Netlify: **Add new site → Import from Git** (or `netlify deploy --prod` from
   the CLI), pointing the **base directory** at `portal/` if your repo has other
   folders alongside it.
3. Netlify reads `netlify.toml` automatically — build command `npm run build`,
   publish directory `dist`, functions directory `netlify/functions`. Netlify
   Blobs works out of the box on any Netlify site, no extra setup or env vars.
4. First login (any account) automatically seeds the 10 student accounts and the
   admin account into Blobs — no manual database setup step.

## Changing passwords / accounts after launch

- **Change the admin password:** there's no in-app self-service admin password
  change yet. On an already-deployed site, this requires calling the
  `admin-reset-password` function directly (with `username: "admin"`) while
  authenticated as admin — that's how the live password was last updated.
  `SEED_ADMIN` in `src/data/students.js` is kept in sync for documentation and
  disaster-recovery re-seeding, but editing it alone does **not** change an
  already-seeded live site.
- **Change a student's password:** use "Manage" next to their name in the admin
  **Students** page — no redeploy needed.
- **Add more than 10 students:** extend `SEED_STUDENTS` in
  `src/data/students.js` before first deploy (seeding is one-time), or manually
  add an entry to the `accounts` Blobs store afterwards.

## A note on security

Login uses a simple hashed-password check (SHA-256 with a static salt) and an
opaque session token stored in Netlify Blobs — appropriate for a low-stakes,
non-sensitive classroom homework tracker, **not** for anything that needs real
security guarantees. Don't reuse this pattern for anything handling sensitive
personal data.

## Accessibility & responsiveness

- Large touch targets (44px+) throughout, high-contrast color pairs, and a
  keyboard-focusable UI (`:focus-visible` outline on every interactive element).
- Mobile-first layout: a collapsible sidebar becomes a top bar with a hamburger
  menu below the `md` breakpoint; every grid reflows to a single column on
  small screens; all tables scroll horizontally inside their own container
  instead of breaking the page layout.
