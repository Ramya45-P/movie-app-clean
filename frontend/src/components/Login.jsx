import React, { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth(); // 👈 IMPORTANT

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await loginUser(email, password);

      // ✅ use context instead of localStorage
      login(data.access_token);

      console.log("Login successful");

      navigate("/");
    } catch (err) {
      console.log(err);

      setError(
        err.response?.data?.detail || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
        />

        <br /><br />

        <button
          type="submit"
          disabled={loading || !email || !password}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {error && (
        <p style={{ color: "red" }}>{error}</p>
      )}
    </div>
  );
}

export default Login;