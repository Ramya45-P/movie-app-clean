import React, { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

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

      

      // Store JWT token
      localStorage.setItem(
        "token",
        data.data.access_token
      );

      
      navigate("/");

    } catch (err) {
      

      let message = "Login failed";

      if (typeof err.response?.data?.detail === "string") {
        message = err.response.data.detail;
      } 
      else if (Array.isArray(err.response?.data?.detail)) {
        message =
          err.response.data.detail[0]?.msg ||
          "Invalid input";
      }

      setError(message);

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

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
        />

        <br />
        <br />

        <button
          type="submit"
          disabled={loading || !email || !password}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

    {error && (
  <p style={{ color: "red" }}>
    {typeof error === "string"
      ? error
      : "Invalid email or password"}
  </p>
)}

    </div>
  );
}

export default Login;