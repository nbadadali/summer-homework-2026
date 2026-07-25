import { Link } from "react-router-dom";
import { VISION_PAPER } from "../data/projects.js";

export default function VisionPaperPage() {
  return (
    <div className="space-y-6">
      <Link to="/projects" className="text-sky-600 font-700 hover:underline">
        ← Back to My Projects
      </Link>

      <div>
        <h1 className="font-display font-800 text-3xl text-ink-800">📄 {VISION_PAPER.title}</h1>
        <p className="text-ink-700/70 mt-1">
          Due {VISION_PAPER.dueDate} · Worth {VISION_PAPER.marks} marks
        </p>
      </div>

      <div className="card bg-sunshine-50 border-2 border-sunshine-300 text-center py-10">
        <div className="text-5xl mb-3">📬</div>
        <p className="font-display font-700 text-lg text-ink-800 mb-2">Coming Soon!</p>
        <p className="text-ink-800/80 max-w-md mx-auto">{VISION_PAPER.placeholder}</p>
      </div>

      <div className="card">
        <p className="font-700 text-ink-800 mb-2">What we do know:</p>
        <ul className="space-y-1.5 text-ink-800/90">
          <li>• You'll work in a group to investigate a theme, propose solutions, and create a product.</li>
          <li>• A Vision Paper explaining your group's plan must be submitted along with Part 1.</li>
          <li>• This counts for 5 of the 10 total Summer Project marks.</li>
        </ul>
      </div>
    </div>
  );
}
