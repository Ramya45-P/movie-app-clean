import React from "react";
import { addFavorite } from "../services/favorites";

function MovieCard({
  movie,
  onCompare,
  selectedMovies = []
}) {
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
    <div
      style={{
        border: isSelected ? "3px solid green" : "1px solid #ccc",
        borderRadius: "8px",
        padding: "15px",
        width: "250px",
      }}
    >
      <h3>{movie.title}</h3>

      <p>
        <strong>Description:</strong> {movie.description}
      </p>

      <p>
        <strong>Genre:</strong> {movie.genre}
      </p>

      <p>
        <strong>IMDb Rating:</strong> ⭐ {movie.rating}
      </p>

      <button onClick={handleFavorite}>
        ❤️ Add to Favorites
      </button>

      <br />
      <br />

      <button
        onClick={() => onCompare(movie)}
        disabled={isSelected}
      >
        Compare
      </button>
    </div>
  );
}

export default MovieCard;