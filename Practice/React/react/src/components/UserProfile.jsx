import React, { useState } from "react";
import "./UserProfile.css";

function UserProfile(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    id: props.id,
    name: props.name,
    age: props.age,
    company: props.company,
    address: props.address,
    contact: props.contact,
    image: props.image || "default-profile.png" // Fallback image
  });

  const [flashMessage, setFlashMessage] = useState("");

  // Enable Editing
  const handleEditClick = () => setIsEditing(true);

  // Save & Show Flash Message
  const handleSaveClick = () => {
    if (!userData.name || !userData.contact) {
      setFlashMessage("⚠️ Name & Contact cannot be empty!");
      return;
    }
    setIsEditing(false);
    setFlashMessage("✅ Details saved successfully!");

    setTimeout(() => setFlashMessage(""), 3000);
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="profile-container">
      {flashMessage && <div className="flash-message">{flashMessage}</div>}

      <div className="details">
        <div className="profile-picture">
          <img src={userData.image} alt="Profile" />
        </div>

        <div className="text">
          {isEditing ? (
            <>
              <p><strong>ID:</strong> <input type="text" name="id" value={userData.id} onChange={handleChange} readOnly /></p>
              <p><strong>Name:</strong> <input type="text" name="name" value={userData.name} onChange={handleChange} autoFocus /></p>
              <p><strong>Age:</strong> <input type="number" name="age" value={userData.age} onChange={handleChange} /></p>
              <p><strong>Company:</strong> <input type="text" name="company" value={userData.company} onChange={handleChange} /></p>
              <p><strong>Address:</strong> <input type="text" name="address" value={userData.address} onChange={handleChange} /></p>
              <p><strong>Contact:</strong> <input type="text" name="contact" value={userData.contact} onChange={handleChange} required /></p>
            </>
          ) : (
            <>
              <p><strong>ID:</strong> {userData.id}</p>
              <p><strong>Name:</strong> {userData.name}</p>
              <p><strong>Age:</strong> {userData.age}</p>
              <p><strong>Company:</strong> {userData.company}</p>
              <p><strong>Address:</strong> {userData.address}</p>
              <p><strong>Contact:</strong> {userData.contact}</p>
            </>
          )}
        </div>

        {/* Edit & Save Buttons */}
        <div className="button-container">
          {isEditing ? (
            <button className="save-button" onClick={handleSaveClick}>Save</button>
          ) : (
            <button className="edit-button" onClick={handleEditClick}>Edit Details</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
