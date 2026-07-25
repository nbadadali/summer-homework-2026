export default function ChecklistItem({ label, checked, onChange, disabled = false }) {
  return (
    <label
      className={`flex items-start gap-3 rounded-xl2 border-2 p-3 sm:p-4 cursor-pointer transition-colors
        ${checked ? "border-grass-400 bg-grass-50" : "border-ink-800/10 bg-white hover:border-sky-300"}
        ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
    >
      <input
        type="checkbox"
        className="mt-1 h-6 w-6 shrink-0 accent-grass-500 rounded-md cursor-pointer"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span className={`text-base sm:text-lg leading-snug ${checked ? "text-grass-700 font-700" : "text-ink-800"}`}>
        {checked ? "✅ " : ""}
        {label}
      </span>
    </label>
  );
}
