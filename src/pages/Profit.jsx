import React, { useState } from "react";
import "./Profit.css";

function Profit({ goHome }) {

  const prices = {
    Rice: 3200,
    Wheat: 2600,
    Maize: 2200,
    Tomato: 1800,
    Potato: 1400,
    Onion: 1900,
    Mango: 4500,
    Banana: 2100
  };

  const [crop, setCrop] = useState("Rice");
  const [quantity, setQuantity] = useState("");
  const [expense, setExpense] = useState("");
  const [income, setIncome] = useState(0);
  const [profit, setProfit] = useState(0);

  const calculate = () => {

    const totalIncome = Number(quantity) * prices[crop];
    const totalProfit = totalIncome - Number(expense);

    setIncome(totalIncome);
    setProfit(totalProfit);

    const history = JSON.parse(localStorage.getItem("profitHistory")) || [];

    history.push({
      crop,
      quantity,
      expense,
      income: totalIncome,
      profit: totalProfit,
      date: new Date().toLocaleDateString()
    });

    localStorage.setItem("profitHistory", JSON.stringify(history));
  };

  return (

    <div className="profitPage">

      <h1>💰 Profit Calculator</h1>

      <select
        value={crop}
        onChange={(e)=>setCrop(e.target.value)}
      >

        {Object.keys(prices).map((item,index)=>

          <option key={index}>
            {item}
          </option>

        )}

      </select>

      <input
        type="number"
        placeholder="Quantity (Quintals)"
        value={quantity}
        onChange={(e)=>setQuantity(e.target.value)}
      />

      <input
        type="number"
        placeholder="Total Expense"
        value={expense}
        onChange={(e)=>setExpense(e.target.value)}
      />

      <button
        className="calculateBtn"
        onClick={calculate}
      >
        Calculate Profit
      </button>

      <div className="result">

        <h2>Income : ₹ {income}</h2>

        <h2>Profit : ₹ {profit}</h2>

      </div>

      <button
        className="backBtn"
        onClick={goHome}
      >
        ⬅ Back to Home
      </button>

    </div>

  );

}

export default Profit;