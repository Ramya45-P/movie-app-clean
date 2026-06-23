import API from "../api/axios";

export const loginUser = async (email, password) => {
  const { data } = await API.post("/auth/login", {
    email,
    password,
  });

  return data.access_token;  // 👈 ONLY TOKEN RETURNED
};