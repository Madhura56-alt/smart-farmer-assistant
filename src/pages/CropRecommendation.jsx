import React, { useState } from "react";
import "./CropRecommendation.css";

function CropRecommendation({ goHome }) {
  const [soil, setSoil] = useState("");
  const [season, setSeason] = useState("");
  const [result, setResult] = useState("");

  const recommendCrop = () => {
    if (soil === "Black" && season === "Rainy") {
      setResult("🌾 Recommended Crop: Cotton");
    } else if (soil === "Red" && season === "Summer") {
      setResult("🌽 Recommended Crop: Maize");
    } else if (soil === "Loamy" && season === "Winter") {
      setResult("🌾 Recommended Crop: Wheat");
    } else if (soil === "Clay" && season === "Rainy") {
      setResult("🌾 Recommended Crop: Rice");
    } else {
      setResult("🌱 Try Rice, Maize or Vegetables");
    }
  };

  return (
    <div className="crop-container">

      <button className="backBtn" onClick={goHome}>
        ⬅ Back to Home
      </button>

      <h2>🌱 Crop Recommendation</h2>

      <select value={soil} onChange={(e) => setSoil(e.target.value)}>
        <option value="">Select Soil</option>
        <option>Black</option>
        <option>Red</option>
        <option>Loamy</option>
        <option>Clay</option>
      </select>

      <select value={season} onChange={(e) => setSeason(e.target.value)}>
        <option value="">Select Season</option>
        <option>Summer</option>
        <option>Rainy</option>
        <option>Winter</option>
      </select>

      <button onClick={recommendCrop}>
        Recommend Crop
      </button>

      {result && <h3>{result}</h3>}

    </div>
  );
}

export default CropRecommendation;