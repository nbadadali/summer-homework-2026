import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { STUDENT_NAV, ADMIN_NAV } from "./navConfig.js";

function NavItems({ items, onNavigate }) {
  return (
    <nav className="flex flex-col gap-1">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-2xl px-4 py-3 font-display font-700 text-base transition-colors
             ${isActive ? "bg-sky-500 text-white shadow-pop" : "text-ink-800 hover:bg-sky-100"}`
          }
        >
          <span className="text-xl" aria-hidden="true">
            {item.icon}
          </span>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default function AppShell({ children }) {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const items = user?.role === "admin" ? ADMIN_NAV : STUDENT_NAV;

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile top bar */}
      <header className="md:hidden sticky top-0 z-30 flex items-center justify-between bg-white shadow-card px-4 py-3">
        <div className="flex items-center gap-2 font-display font-800 text-lg text-sky-600">
          <span>☀️</span> Sunny Summer Explorers
        </div>
        <button
          aria-label="Open menu"
          className="btn-secondary !px-3 !py-2"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`bg-white md:w-72 md:min-h-screen md:sticky md:top-0 border-r border-ink-800/5 flex-col
          ${menuOpen ? "flex" : "hidden"} md:flex px-4 py-6 gap-6`}
      >
        <div className="hidden md:flex items-center gap-2 font-display font-800 text-xl text-sky-600 px-2">
          <span className="text-2xl">☀️</span> Sunny Summer Explorers
        </div>

        {user && (
          <div className="flex items-center gap-3 rounded-2xl bg-sky-50 px-4 py-3">
            <span className="text-3xl">{user.avatar || (user.role === "admin" ? "🧑‍🏫" : "🙂")}</span>
            <div>
              <p className="font-display font-700 text-ink-800 leading-tight">{user.displayName}</p>
              <p className="text-xs text-ink-700/70">{user.role === "admin" ? "Parent / Teacher" : "Grade 2 Student"}</p>
            </div>
          </div>
        )}

        <NavItems items={items} onNavigate={() => setMenuOpen(false)} />

        <div className="mt-auto">
          <button className="btn-secondary w-full" onClick={logout}>
            🚪 Log out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 px-4 py-6 sm:px-6 md:px-10 md:py-10 max-w-6xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
