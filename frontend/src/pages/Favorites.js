import React, { useEffect, useState } from "react";
import {
  getFavorites,
  removeFavorite,
} from "../services/favorites";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = async () => {
    try {
      const data = await getFavorites();
      setFavorites(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleRemove = async (id) => {
    try {
      await removeFavorite(id);
      loadFavorites();
    } catch (err) {
      console.log(err);
      alert("Failed to remove favorite");
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