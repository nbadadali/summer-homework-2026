import { SUMMER_PROJECT_DATES, SA1_EXAM_TIMETABLE, SA1_NOTES, SA1_SYLLABUS, CODAIR_INFO } from "../data/examInfo.js";
import Callout from "../components/ui/Callout.jsx";

export default function ImportantDates() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-800 text-3xl text-ink-800">📅 Important Dates</h1>
        <p className="text-ink-700/70 mt-1">
          Your summer project due dates, plus a look at what's coming up in Term 1 — for reference only.
        </p>
      </div>

      <section className="card bg-sky-50 border-2 border-sky-200">
        <p className="font-display font-700 text-ink-800 mb-2">☀️ Summer Project Submission</p>
        <ul className="space-y-1 text-ink-800/90">
          {SUMMER_PROJECT_DATES.map((d) => (
            <li key={d.label}>
              <span className="font-700">{d.label}:</span> {d.date}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-display font-800 text-xl text-ink-800 mb-3">📝 SA1 Exam Timetable — September 2026</h2>
        <div className="card overflow-x-auto">
          <table className="w-full text-sm min-w-[520px]">
            <thead>
              <tr className="text-left border-b border-ink-800/10">
                <th className="py-2 pr-3">Date</th>
                <th className="py-2 pr-3">Day</th>
                <th className="py-2 pr-3">Subject</th>
                <th className="py-2 pr-3">Marks</th>
                <th className="py-2">Duration</th>
              </tr>
            </thead>
            <tbody>
              {SA1_EXAM_TIMETABLE.map((row) => (
                <tr key={row.date} className="border-b border-ink-800/5 last:border-0">
                  <td className="py-2 pr-3 font-700 whitespace-nowrap">{row.date}</td>
                  <td className="py-2 pr-3">{row.day}</td>
                  <td className="py-2 pr-3">{row.subject}</td>
                  <td className="py-2 pr-3">{row.marks ?? "—"}</td>
                  <td className="py-2">{row.duration ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Callout type="info" title="Good to Know" items={SA1_NOTES} />
      </section>

      <section>
        <h2 className="font-display font-800 text-xl text-ink-800 mb-3">💻 CODAIR@BRS (Computer Class) Exam</h2>
        <div className="card">
          <p className="text-ink-800/90">
            <span className="font-700">{CODAIR_INFO.examDate}</span> · {CODAIR_INFO.marks} marks · {CODAIR_INFO.duration} ·{" "}
            {CODAIR_INFO.location}
          </p>
          <ul className="mt-3 space-y-1">
            {CODAIR_INFO.projects.map((p) => (
              <li key={p.title}>
                <span className="font-700">{p.title}:</span> {p.description}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <h2 className="font-display font-800 text-xl text-ink-800 mb-3">📚 What's Coming Up Next Term (SA1 Syllabus)</h2>
        <p className="text-ink-700/70 mb-4 text-sm">
          These topics will be taught and revised in class after the summer — this is just a reference list so you
          know what's ahead. For the actual lesson content, please check your textbook, notebook, or ask your
          teacher.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {SA1_SYLLABUS.map((subject) => (
            <div key={subject.subject} className="card">
              <p className="font-display font-700 text-ink-800 mb-2 flex items-center gap-2">
                <span className="text-xl">{subject.icon}</span> {subject.subject}
              </p>
              <ul className="space-y-1 text-sm text-ink-800/80">
                {subject.topics.map((topic) => (
                  <li key={topic} className="flex gap-2">
                    <span aria-hidden="true">•</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
