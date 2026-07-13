import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../services/api";

function CompareMovies() {
  const [searchParams] = useSearchParams();

  const movie1 = searchParams.get("movie1");
  const movie2 = searchParams.get("movie2");

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchComparison = async () => {
      try {
        const res = await API.get(
          `/movies/compare?movie1=${movie1}&movie2=${movie2}`
        );

        setData(res.data);
      } catch (err) {
  

  if (err.response) {
    
  
  }
}
    };

    fetchComparison();
  }, [movie1, movie2]);

  if (!data) return <h2>Loading...</h2>;

  const m1 = data.movie1;
  const m2 = data.movie2;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Movie Comparison</h1>

      <div
        style={{
          display: "flex",
          gap: "30px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            flex: 1,
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h2>{m1.title}</h2>

          <p><b>Description:</b> {m1.description}</p>

          <p><b>Genre:</b> {m1.genre}</p>

          <p><b>IMDb Rating:</b> ⭐ {m1.imdb_rating}</p>

          <p><b>User Rating:</b> ⭐ {m1.average_user_rating}</p>

          <p><b>Total Reviews:</b> {m1.total_reviews}</p>
        </div>

        <div
          style={{
            flex: 1,
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h2>{m2.title}</h2>

          <p><b>Description:</b> {m2.description}</p>

          <p><b>Genre:</b> {m2.genre}</p>

          <p><b>IMDb Rating:</b> ⭐ {m2.imdb_rating}</p>

          <p><b>User Rating:</b> ⭐ {m2.average_user_rating}</p>

          <p><b>Total Reviews:</b> {m2.total_reviews}</p>
        </div>
      </div>

      <hr />

      <h2>Comparison Summary</h2>

      <p>
        {m1.imdb_rating > m2.imdb_rating
          ? `${m1.title} has a higher IMDb rating than ${m2.title}.`
          : `${m2.title} has a higher IMDb rating than ${m1.title}.`}
      </p>

      <p>
        {m1.average_user_rating > m2.average_user_rating
          ? `${m1.title} has a higher user rating.`
          : `${m2.title} has a higher user rating.`}
      </p>

      <p>
        {m1.total_reviews > m2.total_reviews
          ? `${m1.title} has more reviews.`
          : `${m2.title} has more reviews.`}
      </p>
    </div>
  );
}

export default CompareMovies;