import React, { useEffect, useState } from "react";
import API from "../api/axios";
import MovieCard from "../components/MovieCard";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await API.get("/movies/");

        console.log("Movies from API:", res.data);

        setMovies(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  console.log("Movies state:", movies);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🎬 Movie App</h1>

      {loading ? (
        <p>Loading movies...</p>
      ) : movies.length === 0 ? (
        <p>No movies found</p>
      ) : (
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;