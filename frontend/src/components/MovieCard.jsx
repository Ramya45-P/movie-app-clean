import React from "react";
import { addFavorite } from "../services/favorites";
import { addWatchlist } from "../services/watchlist";
import { addWatched } from "../services/watched";

function MovieCard({ movie, onCompare, selectedMovies = [] }) {
  const handleFavorite = async () => {
    try {
      await addFavorite(movie);
      alert("Movie added to favorites!");
    } catch (err) {
      console.log(err);
      alert("Failed to add favorite");
    }
  };

  const handleWatchlist = async () => {
    try {
      await addWatchlist(movie);
      alert("Movie added to watchlist!");
    } catch (err) {
      console.log(err);
      alert("Failed to add to watchlist");
    }
  };

  const handleWatched = async () => {
    try {
      await addWatched(movie);
      alert("Movie marked as watched!");
    } catch (err) {
      console.log(err);
      alert("Failed to mark as watched");
    }
  };

  const isSelected = selectedMovies.includes(movie.id);

  return (
    <div className={`movie-card ${isSelected ? "selected-card" : ""}`}>
      <div className="movie-header">
        <h2>{movie.title}</h2>
      </div>

      <div className="movie-details">
        <p>
          <strong>📝 Description:</strong> {movie.description}
        </p>

        <p>
          <strong>🎭 Genre:</strong> {movie.genre}
        </p>

        <p>
          <strong>⭐ IMDb Rating:</strong> {movie.rating}
        </p>
      </div>

      <div className="movie-buttons">
        <button className="favorite-btn" onClick={handleFavorite}>
          ❤️ Add to Favorites
        </button>

        <button className="watchlist-btn" onClick={handleWatchlist}>
          ➕ Add to Watchlist
        </button>

        <button className="watched-btn" onClick={handleWatched}>
          ✅ Mark as Watched
        </button>

        <button
          className="compare-btn"
          onClick={() => {
           console.log("Compare clicked", movie); 
            onCompare(movie)
          }}
          disabled={isSelected}
        >
          🔄 Compare
        </button>
      </div>
    </div>
  );
}

export default MovieCard;