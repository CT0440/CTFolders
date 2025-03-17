import React, { useState } from "react";
import "./HomePage.css";

const users = [
  {
    id: "CT0440",
    name: "steven",
    age: 44,
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

function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    const results = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  };

  return (
    <div className="home-container">
      <h1>Welcome to Our Company</h1>
      <p>Search for an employee by Name or ID.</p>

      {/* Company Logo */}
      <img src="/images/unknown.png" alt="Company Logo" className="company-logo" />

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Employee by Name or ID..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button onClick={handleSearchClick} className="search-button">🔍</button>
      </div>

      {/* Display Matching Candidates (only after clicking search) */}
      {filteredUsers.length > 0 ? (
        <div className="profile-list">
          {filteredUsers.map((user) => (
            <div key={user.id} className="profile-card">
              <img src={user.image} alt={user.name} className="profile-img" />
              <div className="profile-info">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>ID:</strong> {user.id}</p>
                <p><strong>Age:</strong> {user.age}</p>
                <p><strong>Company:</strong> {user.company}</p>
                <p><strong>Address:</strong> {user.address}</p>
                <p><strong>Contact:</strong> {user.contact}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        filteredUsers.length === 0 && searchTerm && <p className="no-results">No matching employee found.</p>
      )}
    </div>
  );
}

export default HomePage;
