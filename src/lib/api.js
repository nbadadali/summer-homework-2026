const TOKEN_KEY = "grade2portal.token";

export function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

async function request(path, { method = "GET", body } = {}) {
  const token = getStoredToken();
  const res = await fetch(`/api${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const error = new Error(data?.error || `Request failed (${res.status})`);
    error.status = res.status;
    throw error;
  }
  return data;
}

export const api = {
  login: (username, password) => request("/login", { method: "POST", body: { username, password } }),
  logout: () => request("/logout", { method: "POST" }),
  me: () => request("/me"),
  getProgress: () => request("/progress"),
  toggleItem: (id, label, subject, completed) =>
    request("/progress", { method: "POST", body: { action: "toggle", id, label, subject, completed } }),
  submitQuiz: (partId, score, total) =>
    request("/progress", { method: "POST", body: { action: "quiz", partId, score, total } }),
  getTasks: () => request("/tasks"),
  addTask: (task) => request("/tasks", { method: "POST", body: task }),
  deleteTask: (id) => request("/tasks", { method: "DELETE", body: { id } }),
  adminStudents: () => request("/admin-students"),
  adminResetPassword: (username, newPassword) =>
    request("/admin-reset-password", { method: "POST", body: { username, newPassword } }),
  adminResetProgress: (username) => request("/admin-reset-progress", { method: "POST", body: { username } }),
};
