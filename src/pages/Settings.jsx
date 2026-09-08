import React, { useState } from "react";
import "./Settings.css";


function Settings({ goHome }) {

  const [language, setLanguage] = useState("English");
  const [notification, setNotification] = useState(true);


  return (

    <div className="settingsPage">


      <button
        className="backBtn"
        onClick={goHome}
      >
        ⬅ Back
      </button>



      <h1>⚙️ Settings</h1>



      <div className="settingCard">


        <h3>🌐 Language</h3>

        <select
          value={language}
          onChange={(e)=>setLanguage(e.target.value)}
        >

          <option>English</option>
          <option>ಕನ್ನಡ</option>
          <option>हिन्दी</option>

        </select>


      </div>




      <div className="settingCard">


        <h3>🔔 Notifications</h3>


        <button
          onClick={()=>setNotification(!notification)}
        >

          {
            notification
            ? "ON 🔔"
            : "OFF 🔕"
          }

        </button>


      </div>




      <div className="settingCard">

        <h3>🌾 App Information</h3>

        <p>
          Smart Farmer Assistant
        </p>

        <p>
          Helping Farmers with Technology
        </p>

      </div>



    </div>

  );

}


export default Settings;