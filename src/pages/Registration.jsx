import React, { useState } from "react";
import "./Registration.css";

function Registration({ goLogin }) {

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const register = () => {

    if (
      name === "" ||
      mobile === "" ||
      username === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    alert("Registration Successful");

    goLogin();
  };

  return (

    <div className="registerPage">

      <div className="registerCard">

        <h1>🌾 Smart Farmer Assistant</h1>

        <h2>Registration</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

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

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button onClick={register}>
          Register
        </button>

        <button
          className="loginBtn"
          onClick={goLogin}
        >
          Back to Login
        </button>

      </div>

    </div>

  );

}

export default Registration;