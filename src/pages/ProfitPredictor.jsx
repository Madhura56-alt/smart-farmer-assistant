import React, { useEffect, useState } from "react";
import "./ProfitPredictor.css";

// ==========================================================
// 100+ CROPS FALLBACK DATA
// ==========================================================

const defaultCrops = [
  { crop: "Rice", price: 3200 },
  { crop: "Wheat", price: 2500 },
  { crop: "Maize", price: 2200 },
  { crop: "Tomato", price: 2600 },
  { crop: "Potato", price: 1800 },
  { crop: "Onion", price: 2400 },
  { crop: "Mango", price: 4500 },
  { crop: "Banana", price: 3000 },
  { crop: "Sugarcane", price: 3400 },
  { crop: "Cotton", price: 7000 },
  { crop: "Groundnut", price: 5800 },
  { crop: "Ragi", price: 3500 },
  { crop: "Jowar", price: 2800 },
  { crop: "Bajra", price: 2600 },
  { crop: "Barley", price: 2400 },
  { crop: "Sorghum", price: 2800 },
  { crop: "Millet", price: 3200 },
  { crop: "Foxtail Millet", price: 4200 },
  { crop: "Little Millet", price: 4500 },
  { crop: "Kodo Millet", price: 4000 },
  { crop: "Barnyard Millet", price: 4300 },
  { crop: "Proso Millet", price: 4100 },
  { crop: "Finger Millet", price: 3500 },
  { crop: "Green Gram", price: 7200 },
  { crop: "Black Gram", price: 6800 },
  { crop: "Red Gram", price: 8000 },
  { crop: "Pigeon Pea", price: 8000 },
  { crop: "Bengal Gram", price: 6200 },
  { crop: "Chickpea", price: 6200 },
  { crop: "Horse Gram", price: 6000 },
  { crop: "Cowpea", price: 5800 },
  { crop: "Field Pea", price: 4500 },
  { crop: "Lentil", price: 7000 },
  { crop: "Soybean", price: 4500 },
  { crop: "Sunflower", price: 5500 },
  { crop: "Mustard", price: 5800 },
  { crop: "Sesame", price: 8500 },
  { crop: "Safflower", price: 5200 },
  { crop: "Castor", price: 6000 },
  { crop: "Linseed", price: 5500 },
  { crop: "Rapeseed", price: 5600 },
  { crop: "Coconut", price: 3200 },
  { crop: "Arecanut", price: 45000 },
  { crop: "Cashew", price: 9000 },
  { crop: "Coffee", price: 18000 },
  { crop: "Tea", price: 12000 },
  { crop: "Cardamom", price: 180000 },
  { crop: "Black Pepper", price: 55000 },
  { crop: "Turmeric", price: 9000 },
  { crop: "Ginger", price: 12000 },
  { crop: "Garlic", price: 15000 },
  { crop: "Chilli", price: 14000 },
  { crop: "Coriander", price: 7500 },
  { crop: "Cumin", price: 30000 },
  { crop: "Fenugreek", price: 7000 },
  { crop: "Fennel", price: 18000 },
  { crop: "Ajwain", price: 16000 },
  { crop: "Clove", price: 90000 },
  { crop: "Nutmeg", price: 80000 },
  { crop: "Tamarind", price: 7000 },
  { crop: "Papaya", price: 2500 },
  { crop: "Pineapple", price: 3500 },
  { crop: "Guava", price: 4000 },
  { crop: "Orange", price: 5000 },
  { crop: "Lemon", price: 4500 },
  { crop: "Sweet Lime", price: 4200 },
  { crop: "Pomegranate", price: 9000 },
  { crop: "Grapes", price: 7000 },
  { crop: "Watermelon", price: 1800 },
  { crop: "Muskmelon", price: 2500 },
  { crop: "Jackfruit", price: 3000 },
  { crop: "Sapota", price: 4500 },
  { crop: "Custard Apple", price: 5000 },
  { crop: "Amla", price: 6000 },
  { crop: "Drumstick", price: 5000 },
  { crop: "Brinjal", price: 2800 },
  { crop: "Cabbage", price: 2200 },
  { crop: "Cauliflower", price: 3000 },
  { crop: "Carrot", price: 3500 },
  { crop: "Beetroot", price: 2800 },
  { crop: "Radish", price: 2000 },
  { crop: "Turnip", price: 2500 },
  { crop: "Spinach", price: 3000 },
  { crop: "Amaranth", price: 3500 },
  { crop: "Okra", price: 4500 },
  { crop: "Lady Finger", price: 4500 },
  { crop: "Bitter Gourd", price: 5000 },
  { crop: "Bottle Gourd", price: 2800 },
  { crop: "Ridge Gourd", price: 3500 },
  { crop: "Snake Gourd", price: 3500 },
  { crop: "Pumpkin", price: 2200 },
  { crop: "Cucumber", price: 2500 },
  { crop: "Capsicum", price: 6000 },
  { crop: "Green Peas", price: 5000 },
  { crop: "French Beans", price: 5500 },
  { crop: "Cluster Beans", price: 4000 },
  { crop: "Broad Beans", price: 4500 },
  { crop: "Sweet Corn", price: 2500 },
  { crop: "Baby Corn", price: 4500 },
  { crop: "Mushroom", price: 18000 },
  { crop: "Sweet Potato", price: 2500 },
  { crop: "Tapioca", price: 2200 },
  { crop: "Yam", price: 3000 },
  { crop: "Colocasia", price: 2800 },
  { crop: "Cassava", price: 2200 },
  { crop: "Almond", price: 70000 },
  { crop: "Walnut", price: 60000 },
  { crop: "Pistachio", price: 90000 },
  { crop: "Groundnut Oilseed", price: 5800 },
  { crop: "Quinoa", price: 8000 },
  { crop: "Chia Seed", price: 15000 },
  { crop: "Flax Seed", price: 7000 },
  { crop: "Basil", price: 5000 },
  { crop: "Mint", price: 4000 },
  { crop: "Curry Leaves", price: 6000 },
  { crop: "Aloe Vera", price: 3000 },
  { crop: "Marigold", price: 5000 },
  { crop: "Rose", price: 7000 },
  { crop: "Jasmine", price: 10000 },
  { crop: "Chrysanthemum", price: 6000 },
  { crop: "Sunflower Flower", price: 4500 },
  { crop: "Tobacco", price: 12000 },
  { crop: "Jute", price: 5000 },
  { crop: "Mesta", price: 4500 },
  { crop: "Bamboo", price: 4000 },
  { crop: "Fodder Maize", price: 1800 },
  { crop: "Fodder Sorghum", price: 1700 },
  { crop: "Lucerne", price: 2500 },
  { crop: "Napier Grass", price: 1800 },
  { crop: "Berseem", price: 2200 },
  { crop: "Oats", price: 2500 },
  { crop: "Peanut", price: 5800 },
  { crop: "Kidney Beans", price: 7000 },
  { crop: "Rajma", price: 7000 },
  { crop: "Black Pepper", price: 55000 },
  { crop: "Vanilla", price: 200000 },
  { crop: "Cocoa", price: 25000 },
  { crop: "Oil Palm", price: 3000 }
];

// ==========================================================
// COMPONENT
// ==========================================================

function ProfitPredictor({ goHome }) {
  const [crops, setCrops] = useState(defaultCrops);

  const [crop, setCrop] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expense, setExpense] = useState("");

  const [income, setIncome] = useState(null);
  const [profit, setProfit] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================================
  // LOAD CROPS FROM FLASK
  // ==========================================================

  useEffect(() => {
    const loadCrops = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/crops"
        );

        if (!response.ok) {
          throw new Error("Server error");
        }

        const data = await response.json();

        console.log("Crops received from Flask:", data);

        if (
          data &&
          data.success &&
          Array.isArray(data.crops) &&
          data.crops.length > 0
        ) {
          // Combine Flask crops with local crops
          const combined = [
            ...data.crops,
            ...defaultCrops
          ];

          // Remove duplicate crop names
          const uniqueCrops = [];

          const cropNames = new Set();

          combined.forEach((item) => {
            if (
              item &&
              item.crop &&
              !cropNames.has(
                item.crop.toLowerCase()
              )
            ) {
              cropNames.add(
                item.crop.toLowerCase()
              );

              uniqueCrops.push({
                crop: item.crop,
                price: Number(item.price) || 0
              });
            }
          });

          setCrops(uniqueCrops);

          console.log(
            "TOTAL UNIQUE CROPS:",
            uniqueCrops.length
          );

          setError("");
        } else {
          // Use 100+ local crops
          setCrops(defaultCrops);
          setError("");
        }
      } catch (err) {
        console.error(
          "Crops API error:",
          err
        );

        // Flask failure should NOT break the page
        setCrops(defaultCrops);

        setError(
          "Live crop prices unavailable. Showing crop list."
        );
      } finally {
        setLoading(false);
      }
    };

    loadCrops();
  }, []);

  // ==========================================================
  // CALCULATE PROFIT
  // ==========================================================

  const calculateProfit = async () => {
    setIncome(null);
    setProfit(null);

    if (!crop) {
      alert("Please select a crop.");
      return;
    }

    if (
      quantity === "" ||
      Number(quantity) <= 0
    ) {
      alert("Please enter a valid quantity.");
      return;
    }

    if (
      expense === "" ||
      Number(expense) < 0
    ) {
      alert("Please enter a valid expense.");
      return;
    }

    const selectedCrop = crops.find(
      (item) =>
        item.crop.toLowerCase() ===
        crop.toLowerCase()
    );

    if (!selectedCrop) {
      alert("Please select a valid crop.");
      return;
    }

    const price = Number(
      selectedCrop.price
    );

    const qty = Number(quantity);

    const totalExpense = Number(expense);

    const totalIncome =
      qty * price;

    const finalProfit =
      totalIncome - totalExpense;

    setIncome(totalIncome);
    setProfit(finalProfit);

    // ========================================================
    // SAVE RESULT TO FLASK
    // ========================================================

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/save",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            crop: selectedCrop.crop,
            quantity: qty,
            expense: totalExpense,
            profit: finalProfit
          })
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to save profit"
        );
      }

      const data =
        await response.json();

      console.log(
        "Profit saved:",
        data
      );
    } catch (err) {
      console.error(
        "Save error:",
        err
      );

      // Calculation still works
      // even when database is unavailable.
    }
  };

  // ==========================================================
  // RESET
  // ==========================================================

  const reset = () => {
    setCrop("");
    setQuantity("");
    setExpense("");
    setIncome(null);
    setProfit(null);
  };

  // ==========================================================
  // FORMAT MONEY
  // ==========================================================

  const money = (value) => {
    return Number(value).toLocaleString(
      "en-IN",
      {
        maximumFractionDigits: 2
      }
    );
  };

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <div className="card">

      {/* BACK */}

      <button
        type="button"
        onClick={goHome}
      >
        ⬅ Back to Home
      </button>

      <h2>
        💰 Profit Calculator
      </h2>

      {/* ERROR */}

      {error && (
        <div
          style={{
            background: "#fff7ed",
            color: "#9a3412",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "8px"
          }}
        >
          ⚠️ {error}
        </div>
      )}

      {/* CROP COUNT */}

      <div
        style={{
          marginBottom: "15px",
          fontWeight: "bold"
        }}
      >
        🌱 Available Crops:{" "}
        {crops.length}+
      </div>

      {/* CROP */}

      <label>
        🌾 Select Crop
      </label>

      <select
        value={crop}
        onChange={(e) =>
          setCrop(e.target.value)
        }
        disabled={loading}
      >
        <option value="">
          -- Select Crop --
        </option>

        {loading ? (
          <option disabled>
            Loading crops...
          </option>
        ) : (
          crops.map(
            (item, index) => (
              <option
                key={`${item.crop}-${index}`}
                value={item.crop}
              >
                {item.crop} - ₹
                {Number(
                  item.price
                ).toLocaleString(
                  "en-IN"
                )}
                /quintal
              </option>
            )
          )
        )}
      </select>

      {/* SELECTED CROP */}

      {crop && (
        <p>
          🌾 Selected Crop:{" "}
          <strong>
            {crop}
          </strong>
        </p>
      )}

      {/* QUANTITY */}

      <label>
        📦 Quantity (Quintals)
      </label>

      <input
        type="number"
        min="0"
        step="0.01"
        placeholder="Enter quantity"
        value={quantity}
        onChange={(e) =>
          setQuantity(
            e.target.value
          )
        }
      />

      {/* EXPENSE */}

      <label>
        💸 Total Expense (₹)
      </label>

      <input
        type="number"
        min="0"
        step="0.01"
        placeholder="Enter total expense"
        value={expense}
        onChange={(e) =>
          setExpense(
            e.target.value
          )
        }
      />

      {/* CALCULATE */}

      <button
        type="button"
        onClick={calculateProfit}
        disabled={
          loading ||
          crops.length === 0
        }
      >
        💰 Calculate Profit
      </button>

      {/* RESULT */}

      {income !== null &&
        profit !== null && (
          <div className="profit-result">

            <h3>
              🌾 Crop: {crop}
            </h3>

            <h3>
              📦 Quantity:{" "}
              {quantity} Quintals
            </h3>

            <h3>
              💰 Income: ₹
              {money(income)}
            </h3>

            <h3>
              💸 Expense: ₹
              {money(expense)}
            </h3>

            <h3>
              📈 Profit: ₹
              {money(profit)}
            </h3>

            {profit >= 0 ? (
              <p>
                ✅ Expected Profit
              </p>
            ) : (
              <p>
                ⚠️ Expense is higher
                than income.
              </p>
            )}

          </div>
        )}

      {/* RESET */}

      {income !== null &&
        profit !== null && (
          <button
            type="button"
            onClick={reset}
          >
            🔄 Reset
          </button>
        )}

    </div>
  );
}

export default ProfitPredictor;