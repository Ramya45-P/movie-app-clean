import { useEffect, useState } from "react";
import {
  getDashboardStats,
  getGenreStats,
  getMonthlyActivity,
  getRecentActivity,
} from "../services/dashboard";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [genres, setGenres] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const [recent, setRecent] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);

        const [
          statsData,
          genreData,
          monthlyData,
          recentData,
        ] = await Promise.all([
          getDashboardStats(),
          getGenreStats(),
          getMonthlyActivity(),
          getRecentActivity(),
        ]);

        setStats(statsData);
        setGenres(genreData);
        setMonthly(monthlyData);
        setRecent(recentData);

      } catch (err) {
        console.log(err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);


  if (loading) {
    return <h2>Loading dashboard...</h2>;
  }


  if (error) {
    return <h2>{error}</h2>;
  }


  return (
    <div>
      <h1>Dashboard</h1>

      <pre>
        {JSON.stringify(stats, null, 2)}
      </pre>

      <pre>
        {JSON.stringify(genres, null, 2)}
      </pre>

      <pre>
        {JSON.stringify(monthly, null, 2)}
      </pre>

      <pre>
        {JSON.stringify(recent, null, 2)}
      </pre>

    </div>
  );
}

export default Dashboard;