import api from "./api";

export const getDashboardStats = async () => {
  const response = await api.get("/dashboard/");
  return response.data;
};

export const getGenreStats = async () => {
  const response = await api.get("/dashboard/genres");
  return response.data;
};

export const getMonthlyActivity = async () => {
  const response = await api.get("/dashboard/monthly");
  return response.data;
};

export const getRecentActivity = async () => {
  const response = await api.get("/dashboard/recent");
  return response.data;
};