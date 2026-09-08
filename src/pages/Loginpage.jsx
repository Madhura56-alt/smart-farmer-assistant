import React, { useState } from "react";
import "./Loginpage.css";

function Loginpage({ goHome, goRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      alert("Please enter Username and Password");
      return;
    }

    goHome();
  };

  return (
    <div className="loginPage">

      <div className="loginCard">

        <h1>🌾 Smart Farmer Assistant</h1>

        <h2>Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login
        </button>

        <p>Don't have an account?</p>

        <button
          className="registerBtn"
          onClick={goRegister}
        >
          Register
        </button>

      </div>

    </div>
  );
}

export default Loginpage;