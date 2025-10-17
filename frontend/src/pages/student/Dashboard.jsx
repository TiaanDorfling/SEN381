import React from "react";

export default function Dashboard() {
  const progress = 65;
  const completedCourses = ["Web Development", "Database Systems"];
  const grades = [
    { course: "Web Development", grade: "A" },
    { course: "Database Systems", grade: "B+" },
  ];

  return (
    <section className="grid gap-6">
      <div className="grid gap-2">
        <h1 className="font-heading text-3xl text-primary">Overview</h1>
        <p className="text-gray-700">
          Here’s a quick overview of your learning progress. Stay motivated and keep pushing forward.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-lavender/50 bg-white/80 p-5 md:col-span-2">
          <h3 className="font-semibold text-primary mb-3">Your Course Progress</h3>
          <div className="w-full h-3 rounded-full bg-lavender/40 overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2 text-sm text-gray-700">{progress}% completed</p>
        </div>

        <div className="rounded-xl border border-lavender/50 bg-white/80 p-5">
          <h3 className="font-semibold text-primary mb-3">Completed Courses</h3>
          {completedCourses.length ? (
            <ul className="list-disc list-inside space-y-1 text-gray-800">
              {completedCourses.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          ) : (
            <p className="text-sm text-gray-700">No completed courses yet.</p>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-lavender/50 bg-white/80 p-5">
        <h3 className="font-semibold text-primary mb-3">Your Grades</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-cream">
              <tr className="text-left text-gray-700">
                <th className="px-4 py-2 font-medium">Course</th>
                <th className="px-4 py-2 font-medium">Grade</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((g, i) => (
                <tr key={i} className="border-t border-lavender/30">
                  <td className="px-4 py-2">{g.course}</td>
                  <td className="px-4 py-2">{g.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
