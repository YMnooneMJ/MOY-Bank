import axios from "axios";

const BASE_URL = "https://moy-bank.onrender.com";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request Interceptor — attach token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ❌ Optional Response Interceptor — handle auth errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Example: Logout on 401 Unauthorized
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href = "/login"; // Redirect to login
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
