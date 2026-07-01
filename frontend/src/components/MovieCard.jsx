import React from "react";
import { addFavorite } from "../services/favorites";

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

  const isSelected = selectedMovies.includes(movie.id);

  return (
    <div className={`movie-card ${isSelected ? "selected-card" : ""}`}>
      <div className="movie-header">
        <h2>{movie.title}</h2>
      </div>

      <div className="movie-details">
        <p>
          <strong>📝 Description:</strong>
        </p>
        <p>{movie.description}</p>

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

        <button
          className="compare-btn"
          onClick={() => onCompare(movie)}
          disabled={isSelected}
        >
          {isSelected ? "✅ Selected" : "🔄 Compare"}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;