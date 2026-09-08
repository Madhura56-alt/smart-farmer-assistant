
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
import "./Registration.css";

function Registration({ goLogin }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async () => {
    if (
      !name.trim() ||
      !mobile.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );

      await updateProfile(userCredential.user, {
        displayName: name.trim(),
      });

      alert("Registration successful!");

      goLogin();
    } catch (error) {
      console.error("Registration error:", error);

      let message =
        "Registration failed. Please try again.";

      if (error.code === "auth/email-already-in-use") {
        message =
          "An account already exists with this email.";
      } else if (error.code === "auth/invalid-email") {
        message =
          "Please enter a valid email address.";
      } else if (error.code === "auth/weak-password") {
        message =
          "Password is too weak. Use at least 6 characters.";
      }

      alert(message);
    } finally {
      setLoading(false);
    }
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
          onChange={(e) =>
            setName(e.target.value)
          }
          disabled={loading}
        />

        <input
          type="tel"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) =>
            setMobile(e.target.value)
          }
          disabled={loading}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
          disabled={loading}
        />

        <button
          onClick={register}
          disabled={loading}
        >
          {loading
            ? "Creating Account..."
            : "Register"}
        </button>

        <button
          className="loginBtn"
          onClick={goLogin}
          disabled={loading}
        >
          Back to Login
        </button>

      </div>
    </div>
  );
}

export default Registration;

