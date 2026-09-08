import React from "react";
import "./Notifications.css";

function Notifications({ goHome }) {

  const notifications = [

    {
      title: "🌦 Weather Alert",
      message: "Heavy rain expected tomorrow. Avoid spraying pesticides.",
      time: "10 minutes ago"
    },

    {
      title: "📈 Market Update",
      message: "Rice price increased today.",
      time: "30 minutes ago"
    },

    {
      title: "🏛 Government Scheme",
      message: "PM-KISAN application is now open.",
      time: "Today"
    },

    {
      title: "🌱 Farming Tip",
      message: "Use organic fertilizer to improve soil health.",
      time: "Today"
    },

    {
      title: "🚜 Agriculture News",
      message: "New subsidy announced for drip irrigation.",
      time: "Yesterday"
    }

  ];

  return (

    <div className="notificationPage">

      <h1>🔔 Notifications</h1>

      {notifications.map((item, index) => (

        <div className="notificationCard" key={index}>

          <h3>{item.title}</h3>

          <p>{item.message}</p>

          <span>{item.time}</span>

        </div>

      ))}

      <button
        className="backBtn"
        onClick={goHome}
      >
        ⬅ Back to Home
      </button>

    </div>

  );

}

export default Notifications;