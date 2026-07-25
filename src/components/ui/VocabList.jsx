export default function VocabList({ words }) {
  if (!words?.length) return null;
  return (
    <div className="card">
      <p className="font-display font-700 text-ink-800 mb-3 flex items-center gap-2">
        <span className="text-xl">📚</span> Tricky Words Explained
      </p>
      <dl className="grid sm:grid-cols-2 gap-3">
        {words.map((w) => (
          <div key={w.word} className="rounded-xl2 bg-grape-50 px-4 py-3">
            <dt className="font-700 text-grape-600">{w.word}</dt>
            <dd className="text-sm text-ink-800/80">{w.meaning}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
