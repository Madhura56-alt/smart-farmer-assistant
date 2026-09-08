import React, { useState } from "react";
import "./Dashboard.css";

function Dashboard({
  openProfile,
  openWeather,
  openMarket,
  openProfit,
  openVoice,
  openHistory,
  openTips,
  openSettings,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const menu = [
    { icon: "👨‍🌾", name: "Profile", action: openProfile },
    { icon: "🌦", name: "Weather", action: openWeather },
    { icon: "📈", name: "Market", action: openMarket },
    { icon: "💰", name: "Profit", action: openProfit },
    { icon: "🎤", name: "Voice AI", action: openVoice },
    { icon: "🌱", name: "Daily Tips", action: openTips },
    { icon: "⚙️", name: "Settings", action: openSettings },
  ];

  const handleMenuClick = (action) => {
    setMenuOpen(false);
    if (action) {
      action();
    }
  };

  return (
    <div className="dashboard">

      {/* HEADER */}
      <div className="header">

        <div>
          <h1>🌾 Smart Farmer</h1>
          <p>Welcome, Madhura 👋</p>
        </div>

        {/* THREE DOTS */}
        <button
          className="dashboard-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ⋮
        </button>

      </div>

      {/* DASHBOARD POPUP MENU */}
      {menuOpen && (
        <div className="dashboard-menu">

          <div className="dashboard-menu-title">
            <span>📋 Dashboard</span>

            <button
              onClick={() => setMenuOpen(false)}
              className="close-menu"
            >
              ✕
            </button>
          </div>

          {menu.map((item, index) => (
            <div
              className="dashboard-menu-item"
              key={index}
              onClick={() => handleMenuClick(item.action)}
            >
              <span className="menu-icon">{item.icon}</span>
              <span>{item.name}</span>
            </div>
          ))}

        </div>
      )}

      {/* SEARCH */}
      <div className="search">
        <input
          type="text"
          placeholder="Search Features..."
        />
      </div>

      {/* BANNER */}
      <div className="banner">
        <h2>🌱 Grow More, Earn More</h2>
        <p>AI Powered Smart Farmer Assistant</p>
      </div>

      {/* TODAY'S PRICE */}
      <div className="today">
        <h3>🏆 Today's Best Price</h3>
        <h2>🌾 Rice</h2>
        <p>₹3200 / Quintal</p>
      </div>

    </div>
  );
}

export default Dashboard;