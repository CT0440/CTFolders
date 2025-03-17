import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; 

function Navbar() {
  return (
    <nav className="navbar">
      <img src="/images/ct.png" alt="Company Logo" className="navbar-logo" />
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/candidates">Candidates</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
