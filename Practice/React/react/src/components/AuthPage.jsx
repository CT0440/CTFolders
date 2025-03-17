import React, { useState } from "react";
import "./AuthPage.css"; // ✅ Linking CSS

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Tabs for Switching */}
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

        {/* Form Content */}
        <h2>{isSignup ? "Signup Form" : "Login Form"}</h2>

        <form>
          <input type="email" placeholder="Email Address" className="input-field" required />
          <input type="password" placeholder="Password" className="input-field" required />

          {isSignup && (
            <input type="password" placeholder="Confirm Password" className="input-field" required />
          )}

          {!isSignup && (
            <div className="forgot-password">
              <a href="#">Forgot password?</a>
            </div>
          )}

          <button type="submit" className="auth-button">
            {isSignup ? "Signup" : "Login"}
          </button>
        </form>

        {/* Toggle Signup/Signin */}
        <p>
          {isSignup ? "Already have an account?" : "Not a member?"}{" "}
          <button className="toggle-link" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Login now" : "Signup now"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
