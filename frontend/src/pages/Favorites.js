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
      loadFavorites(); // Refresh the list
    } catch (err) {
      console.log(err);
      alert("Failed to remove favorite");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>❤️ My Favorites</h2>

      {favorites.length === 0 ? (
        <p>No favorite movies yet.</p>
      ) : (
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {favorites.map((movie) => (
            <div
              key={movie.id}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                borderRadius: "8px",
                width: "250px",
              }}
            >
              <h3>{movie.movie_title}</h3>

              <p>
                <strong>Genre:</strong> {movie.genre}
              </p>

              <button
                onClick={() => handleRemove(movie.id)}
                style={{
                  marginTop: "10px",
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                ❤️ Remove Favorite
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;