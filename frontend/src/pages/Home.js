import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import MovieCard from "../components/MovieCard";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovies, setSelectedMovies] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await API.get("/movies/");
        setMovies(res.data);
        
      } catch (err) {
        
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleCompare = (movie) => {
    if (selectedMovies.find((m) => m.id === movie.id)) {
      alert("Movie already selected.");
      return;
    }

    if (selectedMovies.length >= 2) {
      alert("You can compare only 2 movies.");
      return;
    }

    setSelectedMovies([...selectedMovies, movie]);
  };

  const compareNow = () => {
    if (selectedMovies.length !== 2) {
      alert("Please select exactly 2 movies.");
      return;
    }

    navigate(
      `/compare?movie1=${selectedMovies[0].id}&movie2=${selectedMovies[1].id}`
    );
  };

  return (
    <div className="home-container">
      <h1 className="home-title">🎬 Movie Explorer</h1>

      <p className="selected-text">
        Selected Movies: <strong>{selectedMovies.length}/2</strong>
      </p>

      {selectedMovies.length === 2 && (
        <button className="compare-now-btn" onClick={compareNow}>
          🚀 Compare Now
        </button>
      )}

      {loading ? (
        <h2>Loading movies...</h2>
      ) : movies.length === 0 ? (
        <h2>No movies found</h2>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onCompare={handleCompare}
              selectedMovies={selectedMovies.map((m) => m.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;