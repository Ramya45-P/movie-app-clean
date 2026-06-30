import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Email and password required");
      return;
    }

    try {
      setLoading(true);

      const response = await loginUser(email, password);

      console.log("LOGIN RESPONSE:", response);

      // IMPORTANT: axios returns {data}
      const token = response.data?.access_token;

      if (!token) {
        throw new Error("Token not found in response");
      }

      localStorage.setItem("token", token);

      navigate("/");

    } catch (err) {
      console.log("LOGIN ERROR:", err);

      const msg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Login failed";

      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Login;