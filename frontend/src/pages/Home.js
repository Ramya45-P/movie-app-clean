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
        console.log(err);
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
    <div style={{ padding: "20px" }}>
      <h1>🎬 Movie App</h1>

      <h3>Selected Movies: {selectedMovies.length}/2</h3>

      {selectedMovies.length === 2 && (
        <button
          onClick={compareNow}
          style={{
            marginBottom: "20px",
            padding: "10px 20px",
          }}
        >
          Compare Now
        </button>
      )}

      {loading ? (
        <p>Loading movies...</p>
      ) : movies.length === 0 ? (
        <p>No movies found</p>
      ) : (
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
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