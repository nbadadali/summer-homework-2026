import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import AppShell from "./AppShell.jsx";

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sky-50">
        <p className="font-display text-xl text-sky-600 animate-pulse">Loading your portal... ☀️</p>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;

  return <AppShell>{children}</AppShell>;
}
