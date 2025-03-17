import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // ✅ Import useNavigate
import "./AuthPage.css";

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();  // ✅ Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    if (isSignup && password !== confirmPassword) {
      setMessage("❌ Passwords do not match");
      return;
    }

    try {
      const endpoint = isSignup ? "/signup" : "/signin";
      const apiBaseUrl = "http://localhost:5000";

      // Send request to backend
      const response = await axios.post(
        `${apiBaseUrl}${endpoint}`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      setMessage(`✅ ${response.data.message}`);

      // Auto-clear message after 3 seconds
      setTimeout(() => setMessage(""), 3000);

      // Clear input fields
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      if (isSignup) {
        // ✅ Redirect to Signin Page after signup
        setTimeout(() => {
          setIsSignup(false);
        }, 1500);
      } else {
        // If signing in, store the token
        localStorage.setItem("token", response.data.token);
        navigate("/");  // ✅ Redirect to HomePage after login
      }
    } catch (error) {
      setMessage(`❌ ${error.response?.data?.message || "Server error"}`);

      // Auto-clear error message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="tabs">
          <button className={`tab-button ${!isSignup ? "active" : ""}`} onClick={() => setIsSignup(false)}>
            Login
          </button>
          <button className={`tab-button ${isSignup ? "active" : ""}`} onClick={() => setIsSignup(true)}>
            Signup
          </button>
        </div>

        <h2>{isSignup ? "Signup Form" : "Login Form"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {isSignup && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="input-field"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}

          <button type="submit" className="auth-button">
            {isSignup ? "Signup" : "Login"}
          </button>
        </form>

        {message && <p className="flash-message">{message}</p>}
      </div>
    </div>
  );
};

export default AuthPage;
