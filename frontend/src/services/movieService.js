import API from "../api/axios";

export const getMovies = async () => {
  const res = await API.get("/movies/");
  return res.data;
};