// frontend/src/pages/student/StudentDashboard.jsx
import { useEffect, useState } from "react";
import { getMyStudent, updateMyStudent } from "../../api/students";
import Loader from "../../components/ui/Loader";
import Empty from "../../components/ui/Empty";

export default function StudentDashboard() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [student, setStudent] = useState(null);

  // editable fields local state
  const [form, setForm] = useState({
    phone: "",
    year: "",
    about: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
  });

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setError("");
        const res = await getMyStudent();
        if (!alive) return;
        setStudent(res.student || null);
        setForm((f) => ({
          ...f,
          phone: res.student?.phone || "",
          year: res.student?.year || "",
          about: res.student?.about || "",
          emergencyContactName: res.student?.emergencyContact?.name || "",
          emergencyContactPhone: res.student?.emergencyContact?.phone || "",
        }));
      } catch (err) {
        setError(err?.friendlyMessage || err?.message || "Failed to load your profile.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  async function onSave(e) {
    e?.preventDefault();
    setSaving(true);
    setError("");
    const patch = {
      phone: form.phone,
      year: form.year,
      about: form.about,
      emergencyContact: {
        name: form.emergencyContactName,
        phone: form.emergencyContactPhone,
      },
    };
    const prev = student;
    try {
      setStudent((s) => ({ ...s, ...patch }));
      const res = await updateMyStudent(patch);
      setStudent(res.student || prev);
    } catch (err) {
      setStudent(prev);
      setError(err?.friendlyMessage || "Could not save changes.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <Loader label="Fetching your student profile..." />;
  if (!student) return <Empty title="No student profile" hint="Ask admin to attach your user to a student record." />;

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Student Dashboard</h1>
          <p className="text-primary/70 text-sm">Welcome, {student.name || student.fullName || "Student"}.</p>
        </div>
      </header>

      {error ? (
        <div className="rounded border border-red-400/60 p-3 text-sm text-red-700 bg-red-50">{error}</div>
      ) : null}

      <section className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border p-4">
          <h3 className="font-semibold mb-2">Profile</h3>
          <div className="text-sm space-y-1">
            <p><span className="font-medium">Email:</span> {student.email}</p>
            <p><span className="font-medium">Student #:</span> {student.studentNumber ?? "—"}</p>
            <p><span className="font-medium">Year:</span> {student.year || "—"}</p>
            <p><span className="font-medium">Phone:</span> {student.phone || "—"}</p>
          </div>
        </div>

        <form onSubmit={onSave} className="rounded-xl border p-4">
          <h3 className="font-semibold mb-2">Edit details</h3>
          <div className="space-y-3">
            <label className="block text-sm">
              <span>Phone</span>
              <input className="mt-1 w-full rounded border px-3 py-2" value={form.phone}
                     onChange={(e)=>setForm({...form, phone:e.target.value})}/>
            </label>
            <label className="block text-sm">
              <span>Year</span>
              <input className="mt-1 w-full rounded border px-3 py-2" value={form.year}
                     onChange={(e)=>setForm({...form, year:e.target.value})}/>
            </label>
            <label className="block text-sm">
              <span>About</span>
              <textarea className="mt-1 w-full rounded border px-3 py-2" rows="3" value={form.about}
                        onChange={(e)=>setForm({...form, about:e.target.value})}/>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block text-sm">
                <span>Emergency contact name</span>
                <input className="mt-1 w-full rounded border px-3 py-2" value={form.emergencyContactName}
                       onChange={(e)=>setForm({...form, emergencyContactName:e.target.value})}/>
              </label>
              <label className="block text-sm">
                <span>Emergency contact phone</span>
                <input className="mt-1 w-full rounded border px-3 py-2" value={form.emergencyContactPhone}
                       onChange={(e)=>setForm({...form, emergencyContactPhone:e.target.value})}/>
              </label>
            </div>
            <button className="px-4 py-2 rounded bg-accent text-primary-900 disabled:opacity-60" disabled={saving}>
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </section>

      <section className="rounded-xl border p-4">
        <h3 className="font-semibold mb-2">Enrolled Courses</h3>
        {Array.isArray(student.courses) && student.courses.length ? (
          <ul className="text-sm list-disc pl-5 space-y-1">
            {student.courses.map((c) => (
              <li key={c._id || c.id}>{c.code} — {c.name}</li>
            ))}
          </ul>
        ) : (
          <Empty title="No courses" hint="Once your admin enrolls you, they’ll appear here." />
        )}
      </section>
    </div>
  );
}
