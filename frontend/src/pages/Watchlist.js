import React, { useEffect, useState } from "react";
import { getWatchlist, removeWatchlist } from "../services/watchlist";

function Watchlist() {
  const [movies, setMovies] = useState([]);

  const loadWatchlist = async () => {
    try {
      const data = await getWatchlist();
      setMovies(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadWatchlist();
  }, []);

  const handleRemove = async (id) => {
    await removeWatchlist(id);
    loadWatchlist();
  };

  return (
    <div className="home-container">
      <h1>📋 My Watchlist</h1>

      {movies.length === 0 ? (
        <h3>No movies in watchlist.</h3>
      ) : (
        movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <h2>{movie.movie_title}</h2>

            <p><strong>Genre:</strong> {movie.genre}</p>

            <p><strong>Rating:</strong> {movie.rating}</p>

            <button
              className="watchlist-btn"
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

export default Watchlist;