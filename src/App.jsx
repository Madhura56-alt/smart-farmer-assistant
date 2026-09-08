
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "./firebase";

import Loginpage from "./pages/Loginpage";
import Registration from "./pages/Registration";
import Home from "./pages/Home";

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // ============================================================
  // CHECK FIREBASE AUTHENTICATION STATE
  // ============================================================

  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);

        if (currentUser) {
          setPage("home");
        } else {
          setPage("login");
        }

        setCheckingAuth(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // ============================================================
  // LOGIN SUCCESS
  // ============================================================

  const loginSuccess = () => {
    setPage("home");
  };

  // ============================================================
  // LOGOUT
  // ============================================================

  const logout = async () => {
    try {
      await signOut(auth);

      setUser(null);
      setPage("login");
    } catch (error) {
      console.error("Logout error:", error);

      alert("Unable to logout. Please try again.");
    }
  };

  // ============================================================
  // CHECKING AUTHENTICATION
  // ============================================================

  if (checkingAuth) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px",
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        🌾 Loading Smart Farmer Assistant...
      </div>
    );
  }

  // ============================================================
  // APP
  // ============================================================

  return (
    <div>

      {/* LOGIN */}
      {page === "login" && (
        <Loginpage
          goHome={loginSuccess}
          goRegister={() => setPage("register")}
        />
      )}

      {/* REGISTRATION */}
      {page === "register" && (
        <Registration
          goLogin={() => setPage("login")}
        />
      )}

      {/* HOME */}
      {page === "home" && user && (
        <Home
          logout={logout}
        />
      )}

    </div>
  );
}

export default App;

