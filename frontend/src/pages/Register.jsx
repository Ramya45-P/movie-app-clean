import React, { useState } from "react";
import API from "../services/api";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate(); // ✅ FIXED
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
  e.preventDefault();

  try {
    await API.post("/auth/register", {
      email,
      password
    });

    showToast("Registration successful!", "success");
    navigate("/login");
  } catch (err) {
    showToast("Registration failed", "error");
  }
};

  return (
    <div className="auth-container">
      <h2>Register</h2>

      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;