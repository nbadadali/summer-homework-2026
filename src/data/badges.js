import { PROJECTS } from "./projects.js";

// Badge rules are evaluated client-side against a student's progress map.
// Keeping them declarative here means new badges can be added without
// touching any component code.
export const BADGES = [
  {
    id: "first-step",
    title: "First Step",
    icon: "👣",
    description: "Complete your very first activity.",
    check: (completedCount) => completedCount >= 1,
  },
  {
    id: "photo-diary-done",
    title: "Memory Keeper",
    icon: "📔",
    description: "Finish the whole Photo Diary project.",
    check: (_c, byProject) => byProject["photo-diary"]?.percent === 100,
  },
  {
    id: "solar-oven-done",
    title: "Solar Engineer",
    icon: "☀️",
    description: "Finish the whole Solar Oven Challenge.",
    check: (_c, byProject) => byProject["solar-oven"]?.percent === 100,
  },
  {
    id: "save-water-done",
    title: "Water Guardian",
    icon: "💧",
    description: "Finish the Sauvons l'eau French poster.",
    check: (_c, byProject) => byProject["save-water"]?.percent === 100,
  },
  {
    id: "uae-handprint-done",
    title: "Proud Emirati Friend",
    icon: "🖐️",
    description: "Finish the My UAE Handprint project.",
    check: (_c, byProject) => byProject["uae-handprint"]?.percent === 100,
  },
  {
    id: "halfway",
    title: "Halfway Hero",
    icon: "⭐",
    description: "Reach 50% of all summer homework.",
    check: (_c, _b, overallPercent) => overallPercent >= 50,
  },
  {
    id: "all-done",
    title: "Summer Champion",
    icon: "🏆",
    description: "Complete 100% of your summer homework!",
    check: (_c, _b, overallPercent) => overallPercent >= 100,
  },
  {
    id: "quiz-whiz",
    title: "Quiz Whiz",
    icon: "🧠",
    description: "Score 8 or more out of 10 in any Science quiz round.",
    check: (_c, _b, _o, bestQuizScore) => bestQuizScore >= 8,
  },
  {
    id: "streak-3",
    title: "3-Day Streak",
    icon: "🔥",
    description: "Log in and do homework 3 days in a row.",
    check: (_c, _b, _o, _q, streak) => streak >= 3,
  },
];

export function evaluateBadges({ completedIds, quizBestScore = 0, streak = 0 }) {
  const completedSet = new Set(completedIds);
  const byProject = {};
  let totalItems = 0;
  let totalDone = 0;

  for (const project of PROJECTS) {
    const items = [...project.steps.map((s) => s.id), ...project.checklist.map((c) => c.id)];
    const done = items.filter((id) => completedSet.has(id)).length;
    byProject[project.id] = {
      done,
      total: items.length,
      percent: items.length ? Math.round((done / items.length) * 100) : 0,
    };
    totalItems += items.length;
    totalDone += done;
  }

  const overallPercent = totalItems ? Math.round((totalDone / totalItems) * 100) : 0;

  const earned = BADGES.filter((b) => b.check(completedIds.length, byProject, overallPercent, quizBestScore, streak));

  return { byProject, overallPercent, totalDone, totalItems, earned };
}
