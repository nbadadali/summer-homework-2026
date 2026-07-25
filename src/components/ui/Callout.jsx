const STYLES = {
  tip: { bg: "bg-sunshine-50", border: "border-sunshine-300", icon: "💡", title: "Helpful Tips" },
  avoid: { bg: "bg-coral-50", border: "border-coral-300", icon: "🚫", title: "Things to Avoid" },
  info: { bg: "bg-sky-50", border: "border-sky-300", icon: "ℹ️", title: "Good to Know" },
  encourage: { bg: "bg-grass-50", border: "border-grass-300", icon: "🌟", title: "You Can Do It!" },
};

export default function Callout({ type = "info", title, items, children }) {
  const style = STYLES[type] || STYLES.info;
  return (
    <div className={`rounded-xl2 border-2 ${style.border} ${style.bg} p-4 sm:p-5`}>
      <p className="font-display font-700 text-ink-800 mb-2 flex items-center gap-2">
        <span className="text-xl">{style.icon}</span>
        {title || style.title}
      </p>
      {items ? (
        <ul className="space-y-1.5 text-ink-800/90">
          {items.map((item, i) => (
            <li key={i} className="flex gap-2">
              <span aria-hidden="true">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-ink-800/90">{children}</div>
      )}
    </div>
  );
}
