function ProfileStats({ stats }) {
  if (!stats) return null;

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "20px",
        marginBottom: "30px",
      }}
    >
      <h2>📊 Statistics</h2>

      <div className="stats-container">

        <div className="stat-card">
          <h3>❤️</h3>
          <p>Favorites</p>
          <h2>{stats.favorites_count}</h2>
        </div>

        <div className="stat-card">
          <h3>📌</h3>
          <p>Watchlist</p>
          <h2>{stats.watchlist_count}</h2>
        </div>

        <div className="stat-card">
          <h3>✅</h3>
          <p>Watched</p>
          <h2>{stats.watched_count}</h2>
        </div>

        <div className="stat-card">
          <h3>⭐</h3>
          <p>Reviews</p>
          <h2>{stats.reviews_count}</h2>
        </div>

      </div>
    </div>
  );
}

export default ProfileStats;