import API from "../api/axios";

// Get watched movies
export const getWatched = async () => {
  const res = await API.get("/watched/");
  return res.data;
};

// Mark movie as watched
export const addWatched = async (movie) => {
  const res = await API.post("/watched/", {
    movie_id: String(movie.id),
    movie_title: movie.title,
    poster: movie.poster || "",
    genre: movie.genre,
    rating: String(movie.rating),
    watched_date: new Date().toISOString().split("T")[0],
    user_id: 1,
  });

  return res.data;
};

// Remove watched movie
export const removeWatched = async (watchedId) => {
  const res = await API.delete(`/watched/${watchedId}`);
  return res.data;
};