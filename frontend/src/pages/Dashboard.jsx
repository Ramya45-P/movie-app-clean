import { useEffect, useState } from "react";

import {
  getDashboardStats,
  getGenreStats,
  getMonthlyActivity,
  getRecentActivity,
} from "../services/dashboard";

import StatsCards from "../components/dashboard/StatsCards";
import GenreChart from "../components/dashboard/GenreChart";
import MonthlyChart from "../components/dashboard/MonthlyChart";
import RecentActivity from "../components/dashboard/RecentActivity";


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
          recentData
        ] = await Promise.all([
          getDashboardStats(),
          getGenreStats(),
          getMonthlyActivity(),
          getRecentActivity()
        ]);


        setStats(statsData);
        setGenres(genreData);
        setMonthly(monthlyData);
        setRecent(recentData);


      } catch (err) {
  console.log("DASHBOARD ERROR:", err.response?.data || err.message);
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

    <div className="dashboard-container">

      <h1>Dashboard</h1>


      <StatsCards stats={stats} />


      <div className="charts-container">

       <GenreChart genres={genres} />
       <MonthlyChart monthly={monthly} />

       
      </div>


       <RecentActivity recent={recent} />


    </div>

  );

}


export default Dashboard;