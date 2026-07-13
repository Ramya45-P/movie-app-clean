import API from "../api";

export const getMovies = async () => {
  const res = await API.get("/movies/");
  return res.data;
};