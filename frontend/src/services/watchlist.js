import API from "../api";

// Get all watchlist movies
export const getWatchlist = async () => {
  const res = await API.get("/watchlist/");
  return res.data;
};

// Add movie to watchlist
export const addWatchlist = async (movie) => {
  const res = await API.post("/watchlist/", {
    movie_id: Number(movie.id),
  });

  return res.data;
};

// Remove movie from watchlist
export const removeWatchlist = async (watchlistId) => {
  const res = await API.delete(`/watchlist/${watchlistId}`);
  return res.data;
};