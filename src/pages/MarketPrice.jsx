import React from "react";
import "./Market.css";

function Market() {

  const prices = [
    {
      crop: "🌾 Rice",
      price: "₹3200"
    },
    {
      crop: "🌾 Wheat",
      price: "₹2500"
    },
    {
      crop: "🌽 Maize",
      price: "₹2200"
    },
    {
      crop: "🍬 Sugarcane",
      price: "₹3400"
    }
  ];


  return (

    <div className="market-page">

      <div className="market-card">

        <h1>📈 Market Prices</h1>

        <table>

          <thead>
            <tr>
              <th>Crop</th>
              <th>Price / Quintal</th>
            </tr>
          </thead>


          <tbody>

          {
            prices.map((item,index)=>(

              <tr key={index}>
                <td>{item.crop}</td>
                <td>{item.price}</td>
              </tr>

            ))
          }

          </tbody>

        </table>


      </div>

    </div>

  );

}

export default Market;