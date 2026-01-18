import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor - handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

// Auth API
export const authAPI = {
  register: (data: { name: string; email: string; password: string }) =>
    api.post("/auth/register", data),
  login: (data: { email: string; password: string }) =>
    api.post("/auth/login", data),
  getCurrentUser: () => api.get("/auth/me"),
  googleLogin: () => {
    window.location.href = `${API_URL.replace("/api", "")}/api/auth/google`;
  },
};

// Problems API
export const problemsAPI = {
  getAll: () => api.get("/problems"),
  getByDate: (date: string) => api.get(`/problems/date/${date}`),
  create: (data: any) => api.post("/problems", data),
  update: (id: string, data: any) => api.put(`/problems/${id}`, data),
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
