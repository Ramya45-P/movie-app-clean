import "./Dashboard.css";

function RecentActivity({ data }) {
  return (
    <div className="dashboard-card">
      <h2>Recent Activity</h2>

      <h3>🎬 Recently Watched</h3>

      {data?.recent_watched?.length ? (
        data.recent_watched.map((movie, index) => (
          <div key={index} className="activity-item">
            {movie.title}
          </div>
        ))
      ) : (
        <p>No watched movies.</p>
      )}

      <h3>❤️ Favorites</h3>

      {data?.recent_favorites?.length ? (
        data.recent_favorites.map((movie, index) => (
          <div key={index} className="activity-item">
            {movie.title}
          </div>
        ))
      ) : (
        <p>No favorites.</p>
      )}

      <h3>⭐ Reviews</h3>

      {data?.recent_reviews?.length ? (
        data.recent_reviews.map((review, index) => (
          <div key={index} className="activity-item">
            {review.movie_title} ({review.rating}/5)
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
}

export default RecentActivity;