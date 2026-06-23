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
    <nav
      style={{
        padding: "10px 20px",
        background: "#f4f4f4",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Left side */}
      <div style={{ display: "flex", gap: "15px" }}>
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
      </div>

      {/* Right side */}
      <div>
        {!token ? (
          <Link to="/login">Login</Link>
        ) : (
          <button
            onClick={handleLogout}
            style={{
              padding: "5px 10px",
              cursor: "pointer",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;