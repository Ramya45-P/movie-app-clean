import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Left side - App Name */}
      <div className="logo">
        🎬 Movie Explorer
      </div>

      {/* Middle links */}
      <div className="nav-links">
  <Link to="/">Home</Link>

  {token && (
  <>
   
    <Link to="/favorites">Favorites</Link>
    <Link to="/watchlist">Watchlist</Link>
    <Link to="/watched">Watched</Link>
    <Link to="/profile">Profile</Link>
  </>
)}
</div>

      {/* Right side */}
      <div>
        {!token ? (
          <>
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/register" className="login-btn" style={{ marginLeft: "10px" }}>
              Register
            </Link>
          </>
        ) : (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;