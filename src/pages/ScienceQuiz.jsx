import { useMemo, useState } from "react";
import { SCIENCE_PARTS, buildMCQ } from "../data/scienceBank.js";
import { useProgress } from "../context/ProgressContext.jsx";
import { theme } from "../lib/colors.js";
import { celebrate } from "../lib/confetti.js";

const ROUND_SIZE = 10;

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function DeckPicker({ onPick, bestScores }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-800 text-3xl text-ink-800">🧠 Science Fun Quiz</h1>
        <p className="text-ink-700/70 mt-1">
          200 real science questions from your Grade 1 &amp; 2 Science Question Bank. Pick a deck and test
          yourself — 10 questions per round!
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {SCIENCE_PARTS.map((part) => {
          const t = theme(part.color);
          const best = bestScores[part.id];
          return (
            <button key={part.id} onClick={() => onPick(part)} className="card text-left hover:-translate-y-1 transition-transform">
              <span className={`text-4xl rounded-xl2 ${t.bg} p-3 inline-block`}>{part.icon}</span>
              <p className="font-display font-700 text-lg text-ink-800 mt-3">{part.title}</p>
              <p className="text-sm text-ink-700/70">{part.questions.length} questions</p>
              {best != null && <p className="text-sm mt-2 font-700 text-grass-600">🏅 Best: {best}/10</p>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ScienceQuiz() {
  const { progress, submitQuizScore } = useProgress();
  const [part, setPart] = useState(null);
  const [round, setRound] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const bestScores = useMemo(() => {
    const map = {};
    for (const attempt of progress?.quizAttempts || []) {
      map[attempt.partId] = Math.max(map[attempt.partId] || 0, attempt.score);
    }
    return map;
  }, [progress]);

  function startRound(p) {
    const questions = shuffle(p.questions).slice(0, ROUND_SIZE).map((q) => buildMCQ(p, q));
    setPart(p);
    setRound(questions);
    setIndex(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
    setSubmitted(false);
  }

  function pickAnswer(option) {
    if (selected) return;
    setSelected(option);
    const correct = option === round[index].answer;
    if (correct) {
      setScore((s) => s + 1);
      celebrate();
    }
  }

  function next() {
    if (index + 1 >= round.length) {
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
      setSelected(null);
    }
  }

  async function handleSubmitScore() {
    setSubmitted(true);
    await submitQuizScore(part.id, score, round.length);
  }

  if (!part) return <DeckPicker onPick={startRound} bestScores={bestScores} />;

  if (finished) {
    const t = theme(part.color);
    return (
      <div className="max-w-lg mx-auto text-center space-y-6">
        <div className="text-6xl">{score >= 8 ? "🏆" : score >= 5 ? "🌟" : "💪"}</div>
        <h1 className="font-display font-800 text-2xl text-ink-800">Round Complete!</h1>
        <p className="text-ink-700/70">
          You scored <span className="font-800 text-sky-600">{score}</span> out of {round.length} on{" "}
          <span className="font-700">{part.title}</span>.
        </p>
        <p className="font-700 text-ink-800">
          {score === round.length
            ? "Perfect score! Incredible! 🎉"
            : score >= 8
            ? "Fantastic job!"
            : score >= 5
            ? "Great effort — keep practising!"
            : "Good try! Play again to beat your score."}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {!submitted && (
            <button className="btn-success" onClick={handleSubmitScore}>
              💾 Save My Score
            </button>
          )}
          {submitted && <p className="chip bg-grass-100 text-grass-700">Score saved!</p>}
          <button className={`btn-primary ${t.chip}`} onClick={() => startRound(part)}>
            🔁 Play Again
          </button>
          <button className="btn-secondary" onClick={() => setPart(null)}>
            📚 Choose Another Deck
          </button>
        </div>
      </div>
    );
  }

  const q = round[index];
  const t = theme(part.color);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <button className="text-sky-600 font-700 hover:underline" onClick={() => setPart(null)}>
          ← Choose another deck
        </button>
        <span className="chip bg-ink-800/5 text-ink-700">
          Question {index + 1} / {round.length}
        </span>
      </div>

      <div className="w-full h-2 rounded-full bg-ink-800/10 overflow-hidden">
        <div className={`h-2 ${t.solid} transition-all`} style={{ width: `${((index + (selected ? 1 : 0)) / round.length) * 100}%` }} />
      </div>

      <div className="card text-center">
        <span className={`text-3xl rounded-xl2 ${t.bg} p-3 inline-block mb-4`}>{part.icon}</span>
        <p className="font-display font-700 text-xl text-ink-800">{q.question}</p>
      </div>

      <div className="grid gap-3">
        {q.options.map((opt) => {
          const isCorrect = opt === q.answer;
          const isSelected = opt === selected;
          let style = "border-ink-800/10 bg-white hover:border-sky-300";
          if (selected) {
            if (isCorrect) style = "border-grass-400 bg-grass-50";
            else if (isSelected) style = "border-coral-400 bg-coral-50";
          }
          return (
            <button
              key={opt}
              onClick={() => pickAnswer(opt)}
              disabled={!!selected}
              className={`rounded-xl2 border-2 px-5 py-4 text-left font-700 text-ink-800 transition-colors ${style}`}
            >
              {selected && isCorrect && "✅ "}
              {selected && isSelected && !isCorrect && "❌ "}
              {opt}
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="text-center">
          <button className="btn-primary" onClick={next}>
            {index + 1 >= round.length ? "See My Result 🎉" : "Next Question →"}
          </button>
        </div>
      )}
    </div>
  );
}
