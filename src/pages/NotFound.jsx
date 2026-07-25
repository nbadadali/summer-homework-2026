import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-sky-50 px-4 text-center">
      <div className="text-6xl">🧭</div>
      <h1 className="font-display font-800 text-2xl text-ink-800">Oops! This page took a summer holiday.</h1>
      <Link to="/" className="btn-primary">
        🏠 Back to Home
      </Link>
    </div>
  );
}
