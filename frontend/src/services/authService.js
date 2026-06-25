import API from "../api/axios";

export const loginUser = async (email, password) => {
  const { data } = await API.post("/login", {
    email,
    password,
  });

  return data;
};