import React, { useEffect, useState } from "react";
import { getWatched, removeWatched } from "../services/watched";

function Watched() {
  const [movies, setMovies] = useState([]);

  const loadWatched = async () => {
    try {
      const data = await getWatched();
      setMovies(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadWatched();
  }, []);

  const handleRemove = async (id) => {
    await removeWatched(id);
    loadWatched();
  };

  return (
    <div className="home-container">
      <h1>✅ Watched Movies</h1>

      {movies.length === 0 ? (
        <h3>No watched movies.</h3>
      ) : (
        movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <h2>{movie.movie_title}</h2>

            <p><strong>Genre:</strong> {movie.genre}</p>

            <p><strong>Rating:</strong> {movie.rating}</p>

            <button
              className="watched-btn"
              onClick={() => handleRemove(movie.id)}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Watched;