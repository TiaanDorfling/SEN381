import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Auth() {
  const nav = useNavigate();
  const loc = useLocation();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("student");

  function signIn(e) {
    e.preventDefault();
    const auth = { token: "dev-token", user: { email, role } };
    localStorage.setItem("cl_auth", JSON.stringify(auth));
    const next = loc.state?.from?.pathname || "/calendar";
    nav(next, { replace: true });
  }

  return (
    <section className="max-w-md mx-auto px-4 py-12">
      <h2 className="text-2xl font-heading text-primary mb-4">Sign in</h2>
      <form onSubmit={signIn} className="space-y-3 bg-white p-4 rounded border border-primary/10">
        <label className="block">
          <span className="font-sans text-primary-900">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="mt-1 w-full rounded border border-primary/20 px-3 py-2 font-sans"
            placeholder="you@belgiumcampus.ac.za"
          />
        </label>

        <label className="block">
          <span className="font-sans text-primary-900">Role</span>
          <select
            value={role}
            onChange={(e)=>setRole(e.target.value)}
            className="mt-1 w-full rounded border border-primary/20 px-3 py-2 font-sans bg-white"
          >
            <option value="student">Student</option>
            <option value="tutor">Tutor</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        <button className="px-4 py-2 rounded font-button bg-accent text-primary-900">
          Continue
        </button>
      </form>
      <p className="mt-3 text-sm font-sans text-primary-900">
        Or go back <Link to="/" className="underline">Home</Link>.
      </p>
    </section>
  );
}
