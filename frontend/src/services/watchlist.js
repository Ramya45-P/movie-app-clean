import API from "../api/axios";

// Get all watchlist movies
export const getWatchlist = async () => {
  const res = await API.get("/watchlist/");
  return res.data;
};

// Add movie to watchlist
export const addWatchlist = async (movie) => {
  const res = await API.post("/watchlist/", {
    movie_id: String(movie.id),
    movie_title: movie.title,
    poster: movie.poster || "",
    genre: movie.genre,
    rating: String(movie.rating),
    user_id: 1,
  });

  return res.data;
};

// Remove movie from watchlist
export const removeWatchlist = async (watchlistId) => {
  const res = await API.delete(`/watchlist/${watchlistId}`);
  return res.data;
};