export default function Badge({ icon, title, description, earned = true }) {
  return (
    <div
      className={`card flex flex-col items-center text-center gap-2 py-6 transition-transform ${
        earned ? "hover:-translate-y-1" : "grayscale opacity-50"
      }`}
      title={description}
    >
      <div className={`text-5xl ${earned ? "animate-float" : ""}`}>{icon}</div>
      <p className="font-display font-700 text-ink-800">{title}</p>
      <p className="text-sm text-ink-700/70">{description}</p>
      {!earned && <span className="chip bg-ink-800/5 text-ink-700/60">Locked</span>}
    </div>
  );
}
