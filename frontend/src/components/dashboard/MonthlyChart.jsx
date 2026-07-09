import "./Dashboard.css";

function MonthlyChart({ data }) {
  return (
    <div className="dashboard-card">
      <h2>Monthly Activity</h2>

      {!data || data.length === 0 ? (
        <p>No activity recorded yet.</p>
      ) : (
        data.map((month) => (
          <div key={month.month} className="genre-row">
            <span>{month.month}</span>
            <strong>{month.count}</strong>
          </div>
        ))
      )}
    </div>
  );
}

export default MonthlyChart;