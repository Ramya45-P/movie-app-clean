import axios from "axios";

const API = axios.create({
  baseURL: "https://movie-app-clean-0o52.onrender.com",
});

// Request interceptor
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  config.headers["Content-Type"] = "application/json";

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;