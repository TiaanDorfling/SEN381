import { Link } from "react-router-dom";

const mockCourses = [
  { id: "sen381", title: "SEN381 – Software Engineering", tag: "Project-based" },
  { id: "lpr381", title: "LPR381 – Linear Programming", tag: "Operations Research" },
  { id: "mat281", title: "MAT281 – Applied Mathematics", tag: "STEM Core" },
];

export default function Courses() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-heading text-primary mb-6">Courses</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockCourses.map((c) => (
          <Link
            key={c.id}
            to={`/courses/${c.id}`}
            className="rounded border border-primary/10 bg-white p-4 hover:bg-cream transition"
          >
            <div className="font-heading text-primary">{c.title}</div>
            <div className="text-sm font-sans text-primary-900">{c.tag}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
