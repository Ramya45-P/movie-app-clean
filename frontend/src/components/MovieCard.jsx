import { getCollections, addMovieToCollection } from "../services/collections";
import { useToast } from "../context/ToastContext";
import React from "react";
import { addFavorite } from "../services/favorites";
import { addWatchlist } from "../services/watchlist";
import { addWatched } from "../services/watched";

function MovieCard({ movie, onCompare, selectedMovies = [] }) {
  const { showToast } = useToast();
  const [collections, setCollections] = React.useState([]);
  const [showCollections, setShowCollections] = React.useState(false);
  
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
  const handleAddToCollection = async () => {
  console.log("Button clicked");

  try {
    const data = await getCollections();

    console.log("Collections:", data);

    setCollections(data);
    setShowCollections(true);

  } catch (err) {
    console.log("ERROR:", err);
    console.log("Status:", err.response?.status);
    console.log("Response:", err.response?.data);

    showToast("Failed to load collections", "error");
  }
};

  const handleSelectCollection = async (collectionId) => {
  try {
    await addMovieToCollection(collectionId, movie.id);

    showToast("Movie added to collection!", "success");

    setShowCollections(false);

  } catch (err) {

    showToast(
      err.response?.data?.detail || "Failed to add movie",
      "error"
    );

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

        <button className="btn btn-warning" onClick={handleAddToCollection}>
          📂 Add to Collection
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
      {showCollections && (
  <div className="mt-3">

    <h6>Select Collection</h6>

    {collections.length === 0 ? (

      <p>No collections found.</p>

    ) : (

      collections.map((collection) => (

        <button
          key={collection.id}
          className="btn btn-outline-primary btn-sm m-1"
          onClick={() => handleSelectCollection(collection.id)}
        >
          {collection.name}
        </button>

      ))

    )}

  </div>
)}
    </div>
  );
}

export default MovieCard;