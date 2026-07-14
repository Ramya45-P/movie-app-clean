import React, { useEffect, useState, useCallback } from "react";
import { useToast } from "../context/ToastContext";
import {
  getFavorites,
  removeFavorite,
} from "../services/favorites";

function Favorites() {
  const { showToast } = useToast();

  const [favorites, setFavorites] = useState([]);

  const loadFavorites = useCallback(async () => {
    try {
      const data = await getFavorites();
      setFavorites(data);
    } catch (err) {
      showToast("Failed to load favorites", "error");
    }
  }, [showToast]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const handleRemove = async (id) => {
    try {
      await removeFavorite(id);
      loadFavorites();
      showToast("Favorite removed successfully", "success");
    } catch (err) {
      showToast("Failed to remove favorite", "error");
    }
  };

  return (
    <div className="favorites-container">
      <h1 className="favorites-title">❤️ My Favorites</h1>

      {favorites.length === 0 ? (
        <h3 className="empty-text">No favorite movies yet.</h3>
      ) : (
        <div className="favorites-grid">
          {favorites.map((movie) => (
            <div className="favorite-card" key={movie.id}>
              <h2>{movie.movie_title}</h2>

              <p>
                <strong>🎭 Genre:</strong> {movie.genre}
              </p>

              <button
                className="remove-btn"
                onClick={() => handleRemove(movie.id)}
              >
                🗑️ Remove Favorite
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;