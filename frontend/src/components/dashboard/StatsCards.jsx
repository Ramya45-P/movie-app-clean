import "./Dashboard.css";

function StatsCards({ stats }) {
  return (
    <div className="stats-grid">

      <div className="stat-card">
        <h3>🎬 Watched</h3>
        <h1>{stats.watched}</h1>
      </div>

      <div className="stat-card">
        <h3>❤️ Favorites</h3>
        <h1>{stats.favorites}</h1>
      </div>

      <div className="stat-card">
        <h3>📋 Watchlist</h3>
        <h1>{stats.watchlist}</h1>
      </div>

      <div className="stat-card">
        <h3>⭐ Reviews</h3>
        <h1>{stats.reviews}</h1>
      </div>

    </div>
  );
}

export default StatsCards;