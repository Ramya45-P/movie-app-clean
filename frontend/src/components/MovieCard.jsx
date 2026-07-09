import { useToast } from "../context/ToastContext";
import React from "react";
import { addFavorite } from "../services/favorites";
import { addWatchlist } from "../services/watchlist";
import { addWatched } from "../services/watched";

function MovieCard({ movie, onCompare, selectedMovies = [] }) {
  const { showToast } = useToast();
  
  const handleFavorite = async () => {
    try {
      await addFavorite(movie);
      showToast("Movie added to favorites!", "success");
    } catch (err) {
      
      showToast("Failed to add favorite", "error");
    }
  };

  const handleWatchlist = async () => {
    try {
      await addWatchlist(movie);
      showToast("Movie added to watchlist!", "success");
    } catch (err) {
      
      showToast("Failed to add to watchlist", "error");
    }
  };

  const handleWatched = async () => {
    try {
      await addWatched(movie);
      showToast("Movie marked as watched!", "success");
    } catch (err) {
      
      showToast("Failed to mark as watched", "error");
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