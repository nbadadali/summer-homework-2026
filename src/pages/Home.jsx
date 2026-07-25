import { useAuth } from "../context/AuthContext.jsx";
import StudentDashboard from "./StudentDashboard.jsx";
import AdminOverview from "./admin/AdminOverview.jsx";

export default function Home() {
  const { user } = useAuth();
  return user.role === "admin" ? <AdminOverview /> : <StudentDashboard />;
}
