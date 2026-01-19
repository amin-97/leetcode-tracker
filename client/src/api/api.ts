import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance with credentials for cookies
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Send cookies with requests
});

// Types
export interface Problem {
  _id: string;
  userId: string;
  name: string;
  difficulty: "Easy" | "Medium" | "Hard";
  categories: string[];
  link?: string;
  notes?: string;
  date: string;
  timeSpent?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProblemData {
  name: string;
  difficulty: "Easy" | "Medium" | "Hard";
  categories: string[];
  link?: string;
  notes?: string;
  date: string;
  timeSpent?: number;
}

export interface UpdateProblemData {
  name?: string;
  difficulty?: "Easy" | "Medium" | "Hard";
  categories?: string[];
  link?: string;
  notes?: string;
  date?: string;
  timeSpent?: number;
}

// Auth API
export const authAPI = {
  getCurrentUser: () => api.get("/auth/me"),
  googleLogin: () => {
    window.location.href = `${API_URL.replace("/api", "")}/api/auth/google`;
  },
  logout: () => api.post("/auth/logout"),
};

// Problems API
export const problemsAPI = {
  getAll: () => api.get<Problem[]>("/problems"),
  getByDate: (date: string) => api.get<Problem[]>(`/problems/date/${date}`),
  create: (data: CreateProblemData) => api.post<Problem>("/problems", data),
  update: (id: string, data: UpdateProblemData) =>
    api.put<Problem>(`/problems/${id}`, data),
  delete: (id: string) => api.delete(`/problems/${id}`),
};

// Stats API
export const statsAPI = {
  getStats: () => api.get("/stats"),
  getDailyGoal: () => api.get("/stats/goal"),
  updateDailyGoal: (data: { problemsPerDay?: number; enabled?: boolean }) =>
    api.put("/stats/goal", data),
};

export default api;
