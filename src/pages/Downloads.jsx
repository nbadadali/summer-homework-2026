import { DOWNLOADS } from "../data/downloads.js";

export default function Downloads() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-800 text-3xl text-ink-800">📁 Downloads</h1>
        <p className="text-ink-700/70 mt-1">
          Original documents from school, for parents and students who want the source files.
        </p>
      </div>

      {DOWNLOADS.map((section) => (
        <section key={section.category}>
          <h2 className="font-display font-800 text-xl text-ink-800 mb-3">{section.category}</h2>
          <div className="space-y-3">
            {section.files.map((file) => (
              <a
                key={file.file}
                href={file.file}
                download
                className="card flex items-center justify-between gap-4 hover:-translate-y-0.5 transition-transform"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{file.type === "PDF" ? "📕" : "📘"}</span>
                  <p className="font-700 text-ink-800">{file.title}</p>
                </div>
                <span className="chip bg-sky-100 text-sky-700 shrink-0">⬇ {file.type}</span>
              </a>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
