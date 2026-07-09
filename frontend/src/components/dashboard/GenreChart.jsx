import "./Dashboard.css";

function GenreChart({ data }) {
  return (
    <div className="dashboard-card">
      <h2>Top Genres</h2>

      {!data || data.length === 0 ? (
        <p>No genre data available.</p>
      ) : (
        data.map((genre) => (
          <div key={genre.genre} className="genre-row">
            <span>{genre.genre}</span>
            <strong>{genre.count}</strong>
          </div>
        ))
      )}
    </div>
  );
}

export default GenreChart;