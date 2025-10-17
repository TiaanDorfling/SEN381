import React from "react";

export default function Dashboard() {
  const queue = [
    { id: "sub-101", student: "Alice", course: "SEN381", status: "Submitted" },
    { id: "sub-102", student: "Ben", course: "DBS200", status: "Resubmitted" }
  ];
  const questions = [
    { id: "q-1", title: "REST vs SOAP", course: "SEN381" },
    { id: "q-2", title: "Normalization 3NF", course: "DBS200" }
  ];

  return (
    <section className="grid gap-6">
      <h1 className="font-heading text-3xl text-primary">Tutor Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 rounded-xl border border-lavender/50 bg-white/80 p-5">
          <h3 className="font-semibold text-primary mb-3">Grading Queue</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-cream">
                <tr className="text-left text-gray-700">
                  <th className="px-4 py-2 font-medium">ID</th>
                  <th className="px-4 py-2 font-medium">Student</th>
                  <th className="px-4 py-2 font-medium">Course</th>
                  <th className="px-4 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {queue.map((s) => (
                  <tr key={s.id} className="border-t border-lavender/30">
                    <td className="px-4 py-2">{s.id}</td>
                    <td className="px-4 py-2">{s.student}</td>
                    <td className="px-4 py-2">{s.course}</td>
                    <td className="px-4 py-2">{s.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl border border-lavender/50 bg-white/80 p-5">
          <h3 className="font-semibold text-primary mb-3">Questions to Answer</h3>
          <ul className="space-y-2 text-sm">
            {questions.map((q) => (
              <li key={q.id} className="border border-lavender/40 rounded-md p-3 bg-white">
                <div className="font-medium">{q.title}</div>
                <div className="text-gray-600 text-xs">{q.course}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
