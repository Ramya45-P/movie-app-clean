import API from "../api";

// Get all preferences
export const getPreferences = async () => {
  const res = await API.get("/preferences/");
  return res.data;
};

// Add preference
export const addPreference = async (genre) => {
  const res = await API.post("/preferences/", {
    genre,
  });

  return res.data;
};

// Delete preference
export const deletePreference = async (id) => {
  const res = await API.delete(`/preferences/${id}`);
  return res.data;
};