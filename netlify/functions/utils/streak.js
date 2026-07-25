function dayKey(date) {
  return date.toISOString().slice(0, 10);
}

// Simple consecutive-calendar-day streak, based on UTC dates. Good enough
// for a homework motivation feature — not meant to be timezone-perfect.
export function updateStreak(progress) {
  const today = dayKey(new Date());
  const lastLogin = progress.lastLogin ? dayKey(new Date(progress.lastLogin)) : null;

  if (lastLogin === today) {
    return progress.streak || 1;
  }

  if (lastLogin) {
    const yesterday = dayKey(new Date(Date.now() - 24 * 60 * 60 * 1000));
    if (lastLogin === yesterday) {
      return (progress.streak || 0) + 1;
    }
  }

  return 1;
}
