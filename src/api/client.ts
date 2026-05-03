import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// 🔥 Attach token automatically
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
