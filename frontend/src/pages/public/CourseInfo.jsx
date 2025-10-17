import { useParams, Link } from "react-router-dom";

export default function CourseInfo() {
  const { id } = useParams();
  return (
    <section className="max-w-6xl mx-auto px-4 py-10 space-y-4">
      <h2 className="text-2xl font-heading text-primary">Course: {id?.toUpperCase()}</h2>
      <p className="font-sans text-primary-900">
        Course detail page for <span className="font-semibold">{id}</span>.
      </p>
      <Link to="/courses" className="underline text-primary-900">
        ← Back to Courses
      </Link>
    </section>
  );
}
