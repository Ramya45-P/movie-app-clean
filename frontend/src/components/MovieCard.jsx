import React from "react";
import { addFavorite } from "../services/favorites";

function MovieCard({ movie }) {
  const handleFavorite = async () => {
    try {
      await addFavorite(movie);
      alert("Movie added to favorites!");
    } catch (err) {
      console.log(err);
      alert("Failed to add favorite");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
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
        <strong>Rating:</strong> ⭐ {movie.rating}
      </p>

      <button onClick={handleFavorite}>
        ❤️ Add to Favorites
      </button>
    </div>
  );
}

export default MovieCard;