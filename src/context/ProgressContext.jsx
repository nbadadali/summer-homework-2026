import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../lib/api.js";
import { useAuth } from "./AuthContext.jsx";
import { evaluateBadges } from "../data/badges.js";

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const { user } = useAuth();
  const [progress, setProgress] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!user || user.role !== "student") return;
    setLoading(true);
    try {
      const [{ progress }, { tasks }] = await Promise.all([api.getProgress(), api.getTasks()]);
      setProgress(progress);
      setTasks(tasks);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user?.role === "student") refresh();
    else {
      setProgress(null);
      setTasks([]);
    }
  }, [user, refresh]);

  const toggleItem = useCallback(
    async (id, label, subject, completed) => {
      setProgress((prev) => {
        if (!prev) return prev;
        const set = new Set(prev.completedIds);
        if (completed) set.add(id);
        else set.delete(id);
        return { ...prev, completedIds: [...set] };
      });
      try {
        const { progress } = await api.toggleItem(id, label, subject, completed);
        setProgress(progress);
      } catch {
        refresh();
      }
    },
    [refresh]
  );

  const submitQuizScore = useCallback(async (partId, score, total) => {
    const { progress } = await api.submitQuiz(partId, score, total);
    setProgress(progress);
    return progress;
  }, []);

  const isDone = useCallback((id) => !!progress?.completedIds?.includes(id), [progress]);

  const evaluation = useMemo(() => {
    if (!progress) return null;
    return evaluateBadges({
      completedIds: progress.completedIds || [],
      quizBestScore: progress.quizBestScore || 0,
      streak: progress.streak || 0,
    });
  }, [progress]);

  return (
    <ProgressContext.Provider
      value={{ progress, tasks, loading, refresh, toggleItem, submitQuizScore, isDone, evaluation }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
