import React, { useState } from "react";
import "./Profile.css";

function Profile({ goHome }) {
  const savedProfile = JSON.parse(localStorage.getItem("farmerProfile"));

  const [farmer, setFarmer] = useState(
    savedProfile || {
      name: "",
      village: "",
      crop: "",
      land: "",
    }
  );

  const [edit, setEdit] = useState(savedProfile ? false : true);

  const handleChange = (e) => {
    setFarmer({
      ...farmer,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = () => {
    localStorage.setItem("farmerProfile", JSON.stringify(farmer));
    alert("Profile Saved Successfully");
    setEdit(false);
  };

  return (
    <div className="profilePage">

      <div className="profileCard">

        <div className="avatar">👨‍🌾</div>

        {edit ? (
          <>
            <input
              type="text"
              name="name"
              placeholder="Farmer Name"
              value={farmer.name}
              onChange={handleChange}
            />

            <input
              type="text"
              name="village"
              placeholder="Village"
              value={farmer.village}
              onChange={handleChange}
            />

            <input
              type="text"
              name="crop"
              placeholder="Main Crop"
              value={farmer.crop}
              onChange={handleChange}
            />

            <input
              type="number"
              name="land"
              placeholder="Land Area (Acres)"
              value={farmer.land}
              onChange={handleChange}
            />

            <button className="saveBtn" onClick={saveProfile}>
              💾 Save Profile
            </button>
          </>
        ) : (
          <>
            <h2>{farmer.name}</h2>

            <p><b>📍 Village:</b> {farmer.village}</p>

            <p><b>🌾 Main Crop:</b> {farmer.crop}</p>

            <p><b>🚜 Land:</b> {farmer.land} Acres</p>

            <button
              className="editBtn"
              onClick={() => setEdit(true)}
            >
              ✏ Edit Profile
            </button>
          </>
        )}

        <button className="homeBtn" onClick={goHome}>
          ⬅ Back to Home
        </button>

      </div>

    </div>
  );
}

export default Profile;