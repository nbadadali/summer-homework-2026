import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./components/layout/ProtectedRoute.jsx";
import Home from "./pages/Home.jsx";
import ProjectsOverview from "./pages/ProjectsOverview.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import VisionPaperPage from "./pages/VisionPaperPage.jsx";
import ScienceQuiz from "./pages/ScienceQuiz.jsx";
import ImportantDates from "./pages/ImportantDates.jsx";
import Downloads from "./pages/Downloads.jsx";
import MyProgress from "./pages/MyProgress.jsx";
import Achievements from "./pages/Achievements.jsx";
import AdminStudents from "./pages/admin/AdminStudents.jsx";
import AdminManageHomework from "./pages/admin/AdminManageHomework.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/projects" element={<ProtectedRoute role="student"><ProjectsOverview /></ProtectedRoute>} />
      <Route path="/projects/:projectId" element={<ProtectedRoute role="student"><ProjectDetail /></ProtectedRoute>} />
      <Route path="/vision-paper" element={<ProtectedRoute role="student"><VisionPaperPage /></ProtectedRoute>} />
      <Route path="/science-quiz" element={<ProtectedRoute role="student"><ScienceQuiz /></ProtectedRoute>} />
      <Route path="/dates" element={<ProtectedRoute><ImportantDates /></ProtectedRoute>} />
      <Route path="/downloads" element={<ProtectedRoute><Downloads /></ProtectedRoute>} />
      <Route path="/my-progress" element={<ProtectedRoute role="student"><MyProgress /></ProtectedRoute>} />
      <Route path="/achievements" element={<ProtectedRoute role="student"><Achievements /></ProtectedRoute>} />

      <Route path="/students" element={<ProtectedRoute role="admin"><AdminStudents /></ProtectedRoute>} />
      <Route path="/manage-homework" element={<ProtectedRoute role="admin"><AdminManageHomework /></ProtectedRoute>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
