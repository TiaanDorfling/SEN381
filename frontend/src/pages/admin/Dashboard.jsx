import React from "react";

export default function Dashboard() {
  const approvals = [
    { id: "t-001", name: "Jane Smith", department: "CS", status: "Pending" },
    { id: "t-002", name: "John Doe", department: "Math", status: "Pending" }
  ];
  const moderation = [
    { id: "q-10", type: "Question", reason: "Flagged: spam" },
    { id: "r-22", type: "Response", reason: "Flagged: abusive" }
  ];

  return (
    <section className="grid gap-6">
      <h1 className="font-heading text-3xl text-primary">Admin Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-lavender/50 bg-white/80 p-5">
          <h3 className="font-semibold text-primary mb-3">Tutor Approvals</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-cream">
                <tr className="text-left text-gray-700">
                  <th className="px-4 py-2 font-medium">ID</th>
                  <th className="px-4 py-2 font-medium">Name</th>
                  <th className="px-4 py-2 font-medium">Department</th>
                  <th className="px-4 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {approvals.map(a => (
                  <tr key={a.id} className="border-t border-lavender/30">
                    <td className="px-4 py-2">{a.id}</td>
                    <td className="px-4 py-2">{a.name}</td>
                    <td className="px-4 py-2">{a.department}</td>
                    <td className="px-4 py-2">{a.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl border border-lavender/50 bg-white/80 p-5">
          <h3 className="font-semibold text-primary mb-3">Moderation Queue</h3>
          <ul className="space-y-2 text-sm">
            {moderation.map(m => (
              <li key={m.id} className="border border-lavender/40 rounded-md p-3 bg-white flex items-center justify-between">
                <div>
                  <div className="font-medium">{m.type}</div>
                  <div className="text-gray-600 text-xs">{m.reason}</div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded-md border">Review</button>
                  <button className="px-3 py-1 rounded-md bg-primary text-white">Resolve</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
