import React, { useState } from "react";
import axios from "axios";
import "./AuthPage.css";

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    if (isSignup && password !== confirmPassword) {
      setMessage("❌ Passwords do not match");
      return;
    }

    try {
      const endpoint = isSignup ? "/signup" : "/signin";
      const apiBaseUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const response = await axios.post(`${apiBaseUrl}${endpoint}`, {
        email,
        password,
      });

      setMessage(`✅ ${response.data.message}`); // Show success message

      // Auto-clear message after 3 seconds
      setTimeout(() => setMessage(""), 3000);

      // Clear input fields
      setEmail(""); 
      setPassword(""); 
      setConfirmPassword(""); 
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
          <button
            className={`tab-button ${!isSignup ? "active" : ""}`}
            onClick={() => setIsSignup(false)}
          >
            Login
          </button>
          <button
            className={`tab-button ${isSignup ? "active" : ""}`}
            onClick={() => setIsSignup(true)}
          >
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
