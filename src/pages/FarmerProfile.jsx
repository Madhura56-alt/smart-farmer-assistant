import React, { useState } from "react";
import "./FarmerProfile.css";


function FarmerProfile({ goHome }) {

  const [name,setName] = useState("");
  const [village,setVillage] = useState("");
  const [crop,setCrop] = useState("");
  const [land,setLand] = useState("");

  const saveProfile = () => {

    alert("Profile Saved Successfully 🌱");

  };


  return (

    <div className="profilePage">

      <div className="profileBox">

        <h1>
          👨‍🌾 Farmer Profile
        </h1>


        <input
          type="text"
          placeholder="Farmer Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />


        <input
          type="text"
          placeholder="Village Name"
          value={village}
          onChange={(e)=>setVillage(e.target.value)}
        />


        <input
          type="text"
          placeholder="Main Crop"
          value={crop}
          onChange={(e)=>setCrop(e.target.value)}
        />


        <input
          type="text"
          placeholder="Land Area (acre)"
          value={land}
          onChange={(e)=>setLand(e.target.value)}
        />


        <button onClick={saveProfile}>
          Save Profile
        </button>


        <div className="details">

          <h2>
            Profile Details
          </h2>

          <p>Name: {name}</p>
          <p>Village: {village}</p>
          <p>Crop: {crop}</p>
          <p>Land: {land} acre</p>

        </div>


        <button
          className="backBtn"
          onClick={goHome}
        >
          ⬅ Back to Home
        </button>


      </div>

    </div>

  );

}


export default FarmerProfile;