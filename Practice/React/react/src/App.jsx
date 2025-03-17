import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import UserProfile from "./components/UserProfile";
import AuthPage from "./components/AuthPage"; // Import AuthPage
import "./App.css";

const users = [
  {
    id: "CT0440",
    name: "steven",
    age: 34,
    company: "CodeTantra Tech Solutions",
    address: "Kukatpally, HYD",
    contact: "6309639600",
    image: "/images/steven.png",
  },
  {
    id: "CT0334",
    name: "John",
    age: 27,
    company: "CodeTantra Tech Solutions",
    address: "Kukatpally, HYD",
    contact: "7891236781",
    image: "/images/John.png",
  },
  {
    id: "CT0422",
    name: "Racheal",
    age: 24,
    company: "CodeTantra Tech Solutions",
    address: "KPHB, HYD",
    contact: "6396087954",
    image: "/images/racheal.png",
  },
  {
    id: "CT0202",
    name: "Robert",
    age: 34,
    company: "CodeTantra Tech Solutions",
    address: "Warangal, HYD",
    contact: "9876789890",
    image: "/images/Robert.png",
  },
  {
    id: "CT0243",
    name: "Stella",
    age: 21,
    company: "CodeTantra Tech Solutions",
    address: "Nizamabad, HYD",
    contact: "8976534567",
    image: "/images/Stella.png",
  },
];

function CandidatesPage() {
  return (
    <div className="profile-container">
      {users.map((user) => (
        <UserProfile key={user.id} {...user} />
      ))}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />  {/* Signup & Signin */}
        <Route path="/candidates" element={<CandidatesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
