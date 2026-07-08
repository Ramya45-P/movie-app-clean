import API from "../api/axios";

// Get all favorites
export const getFavorites = async () => {
  const res = await API.get("/favorites/");
  return res.data;
};


// Add favorite
export const addFavorite = async (movie) => {
  const res = await API.post("/favorites/", {
    movie_id: movie.id,
  });

  return res.data;
};


// Delete favorite
export const removeFavorite = async (favoriteId) => {
  const res = await API.delete(`/favorites/${favoriteId}`);
  return res.data;
};