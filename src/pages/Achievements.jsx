import { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useProgress } from "../context/ProgressContext.jsx";
import { BADGES } from "../data/badges.js";
import Badge from "../components/ui/Badge.jsx";
import { celebrate, bigCelebrate } from "../lib/confetti.js";
import { openCertificate } from "../lib/certificate.js";

export default function Achievements() {
  const { user } = useAuth();
  const { evaluation } = useProgress();
  const celebratedRef = useRef(false);

  useEffect(() => {
    if (evaluation?.overallPercent === 100 && !celebratedRef.current) {
      celebratedRef.current = true;
      bigCelebrate();
    }
  }, [evaluation?.overallPercent]);

  if (!evaluation) return null;
  const earnedIds = new Set(evaluation.earned.map((b) => b.id));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-800 text-3xl text-ink-800">🏆 My Achievements</h1>
        <p className="text-ink-700/70 mt-1">Collect badges as you complete your summer homework!</p>
      </div>

      <section className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {BADGES.map((b) => (
          <Badge key={b.id} icon={b.icon} title={b.title} description={b.description} earned={earnedIds.has(b.id)} />
        ))}
      </section>

      <section className="card bg-gradient-to-br from-sunshine-100 to-sky-100 text-center">
        <div className="text-5xl mb-2">🎓</div>
        <h2 className="font-display font-800 text-xl text-ink-800">Certificate of Achievement</h2>
        <p className="text-ink-700/70 mt-1 mb-4">
          {evaluation.overallPercent >= 100
            ? "Amazing work! You finished all your summer homework. Print your certificate!"
            : `Complete 100% of your homework to unlock your printable certificate. You're at ${evaluation.overallPercent}%!`}
        </p>
        <button
          className="btn-warm disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={evaluation.overallPercent < 100}
          onClick={() => {
            celebrate();
            openCertificate({
              studentName: user.displayName,
              subtitle: "for completing the Grade 2 Summer Homework with curiosity, creativity, and hard work!",
              date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
            });
          }}
        >
          🖨️ Print My Certificate
        </button>
      </section>
    </div>
  );
}
