import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (user) return <Navigate to="/" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(username.trim(), password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-100 via-sky-50 to-sunshine-50 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="text-6xl mb-2 animate-float">☀️</div>
          <h1 className="font-display font-800 text-3xl text-sky-700">Sunny Summer Explorers</h1>
          <p className="text-ink-700/80 mt-1">Grade 2 (French Section) Summer Homework Portal</p>
          <p className="text-xs text-ink-700/60 mt-1">Bright Riders School, Dubai</p>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-4">
          <div>
            <label htmlFor="username" className="block font-display font-700 text-ink-800 mb-1">
              Username
            </label>
            <input
              id="username"
              autoComplete="username"
              className="w-full rounded-2xl border-2 border-ink-800/10 px-4 py-3 text-lg focus:border-sky-400 outline-none"
              placeholder="e.g. Student01"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-display font-700 text-ink-800 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              className="w-full rounded-2xl border-2 border-ink-800/10 px-4 py-3 text-lg focus:border-sky-400 outline-none"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p role="alert" className="rounded-xl2 bg-coral-50 text-coral-600 px-4 py-3 font-700 text-sm">
              {error}
            </p>
          )}

          <button type="submit" disabled={submitting} className="btn-primary w-full text-lg disabled:opacity-60">
            {submitting ? "Logging in..." : "🚀 Let's Go!"}
          </button>
        </form>

        <p className="text-center text-sm text-ink-700/60 mt-4">
          Ask your parent or teacher if you forget your password.
        </p>
      </div>
    </div>
  );
}
