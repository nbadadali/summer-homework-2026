const COLOR_MAP = {
  sky: "bg-sky-500",
  sunshine: "bg-sunshine-400",
  grass: "bg-grass-500",
  coral: "bg-coral-500",
  grape: "bg-grape-500",
};

export default function ProgressBar({ percent = 0, color = "sky", height = "h-3", showLabel = false }) {
  const pct = Math.min(100, Math.max(0, percent));
  return (
    <div className="w-full">
      <div className={`w-full ${height} rounded-full bg-ink-800/10 overflow-hidden`}>
        <div
          className={`${height} ${COLOR_MAP[color] || COLOR_MAP.sky} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      {showLabel && <p className="mt-1 text-sm font-700 text-ink-700">{pct}% complete</p>}
    </div>
  );
}
