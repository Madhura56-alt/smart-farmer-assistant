import React, { useState } from "react";
import "./Home.css";

import {
  FaSearch,
  FaBell,
  FaMoon,
  FaUserCircle,
} from "react-icons/fa";

import FarmerProfile from "./FarmerProfile";
import Weather from "./Weather";
import Market from "./Market";
import Profit from "./Profit";
import DailyTips from "./DailyTips";
import GovernmentSchemes from "./GovernmentSchemes";
import CropRecommendation from "./CropRecommendation";
import Notifications from "./Notifications";
import Settings from "./Settings";


// =========================================================
// SIDEBAR / DASHBOARD MENU
// =========================================================

function Sidebar({ setPage, closeMenu }) {

  const openPage = (page) => {
    setPage(page);
    closeMenu();
  };

  return (
    <div className="sidebar">

      {/* SIDEBAR HEADER */}
      <div className="sidebarTop">

        <h2 className="sidebarLogo">
          🌾 Smart Farmer
        </h2>

        <button
          className="sidebarClose"
          onClick={closeMenu}
          title="Close Dashboard"
          aria-label="Close Dashboard"
        >
          ✕
        </button>

      </div>


      {/* DASHBOARD */}
      <div
        className="menuItem"
        onClick={() => openPage("dashboard")}
      >
        🏠 Dashboard
      </div>


      {/* FARMER PROFILE */}
      <div
        className="menuItem"
        onClick={() => openPage("profile")}
      >
        👨‍🌾 Farmer Profile
      </div>


      {/* WEATHER */}
      <div
        className="menuItem"
        onClick={() => openPage("weather")}
      >
        🌦 Weather
      </div>


      {/* MARKET */}
      <div
        className="menuItem"
        onClick={() => openPage("market")}
      >
        📈 Market Prices
      </div>


      {/* PROFIT */}
      <div
        className="menuItem"
        onClick={() => openPage("profit")}
      >
        💰 Profit Predictor
      </div>


      {/* CROP */}
      <div
        className="menuItem"
        onClick={() => openPage("crop")}
      >
        🌱 Crop Recommendation
      </div>


      {/* DAILY TIPS */}
      <div
        className="menuItem"
        onClick={() => openPage("tips")}
      >
        🌿 Daily Tips
      </div>


      {/* GOVERNMENT SCHEMES */}
      <div
        className="menuItem"
        onClick={() => openPage("schemes")}
      >
        🏛 Government Schemes
      </div>


      {/* SETTINGS */}
      <div
        className="menuItem"
        onClick={() => openPage("settings")}
      >
        ⚙ Settings
      </div>

    </div>
  );
}


// =========================================================
// HOME
// =========================================================

function Home({ logout }) {

  const [page, setPage] = useState("dashboard");

  const [search, setSearch] = useState("");

  const [dark, setDark] = useState(false);

  const [profile, setProfile] = useState(false);

  // Dashboard menu CLOSED initially
  const [dashboardOpen, setDashboardOpen] = useState(false);


  // =======================================================
  // SEARCH DATA
  // =======================================================

  const searchItems = [

    {
      name: "Farmer Profile",
      keywords: "farmer profile farming details",
      page: "profile",
      icon: "👨‍🌾",
    },

    {
      name: "Weather",
      keywords:
        "weather karnataka climate temperature humidity",
      page: "weather",
      icon: "🌦",
    },

    {
      name: "Market Prices",
      keywords:
        "market price crop prices karnataka rice maize tomato potato",
      page: "market",
      icon: "📈",
    },

    {
      name: "Profit Predictor",
      keywords:
        "profit predictor income expense calculate profit",
      page: "profit",
      icon: "💰",
    },

    {
      name: "Crop Recommendation",
      keywords:
        "crop recommendation crop suggestion",
      page: "crop",
      icon: "🌱",
    },

    {
      name: "Daily Tips",
      keywords:
        "daily tips farming agriculture tips",
      page: "tips",
      icon: "🌿",
    },

    {
      name: "Government Schemes",
      keywords:
        "government schemes pm kisan farmer benefits subsidy",
      page: "schemes",
      icon: "🏛",
    },

    {
      name: "Settings",
      keywords:
        "settings preferences",
      page: "settings",
      icon: "⚙",
    },

  ];


  // =======================================================
  // SEARCH RESULTS
  // =======================================================

  const filteredSearch = search.trim()
    ? searchItems.filter((item) => {

        const text =
          `${item.name} ${item.keywords}`.toLowerCase();

        return text.includes(
          search.toLowerCase()
        );

      })
    : [];


  // =======================================================
  // OPEN SEARCH RESULT
  // =======================================================

  const openSearchResult = (selectedPage) => {

    setSearch("");

    setDashboardOpen(false);

    setProfile(false);

    setPage(selectedPage);

  };


  // =======================================================
  // OPEN DASHBOARD PAGE
  // =======================================================

  const openDashboardPage = (selectedPage) => {

    setDashboardOpen(false);

    setProfile(false);

    setPage(selectedPage);

  };


  // =======================================================
  // OTHER PAGES
  // =======================================================

  if (page === "profile") {

    return (
      <FarmerProfile
        goHome={() => setPage("dashboard")}
      />
    );

  }


  if (page === "weather") {

    return (
      <Weather
        goHome={() => setPage("dashboard")}
      />
    );

  }


  if (page === "market") {

    return (
      <Market
        goHome={() => setPage("dashboard")}
      />
    );

  }


  if (page === "profit") {

    return (
      <Profit
        goHome={() => setPage("dashboard")}
      />
    );

  }


  if (page === "tips") {

    return (
      <DailyTips
        goHome={() => setPage("dashboard")}
      />
    );

  }


  if (page === "schemes") {

    return (
      <GovernmentSchemes
        goHome={() => setPage("dashboard")}
      />
    );

  }


  if (page === "crop") {

    return (
      <CropRecommendation
        goHome={() => setPage("dashboard")}
      />
    );

  }


  if (page === "notifications") {

    return (
      <Notifications
        goHome={() => setPage("dashboard")}
      />
    );

  }


  if (page === "settings") {

    return (
      <Settings
        goHome={() => setPage("dashboard")}
      />
    );

  }


  // =======================================================
  // DASHBOARD / HOME PAGE
  // =======================================================

  return (

    <div className={dark ? "home dark" : "home"}>


      {/* ===================================================
          SIDEBAR OVERLAY
      =================================================== */}

      {dashboardOpen && (

        <div
          className="sidebarOverlay"
          onClick={() =>
            setDashboardOpen(false)
          }
        />

      )}


      {/* ===================================================
          SIDEBAR
      =================================================== */}

      <div
        className={
          dashboardOpen
            ? "sidebarWrapper open"
            : "sidebarWrapper"
        }
      >

        <Sidebar
          setPage={setPage}
          closeMenu={() =>
            setDashboardOpen(false)
          }
        />

      </div>


      {/* ===================================================
          MAIN
      =================================================== */}

      <div className="main">


        {/* =================================================
            TOP BAR
        ================================================= */}

        <header className="topBar">


          {/* THREE DOT DASHBOARD BUTTON */}

          <button
            className="dashboardDots"
            onClick={() =>
              setDashboardOpen(!dashboardOpen)
            }
            title="Dashboard"
            aria-label="Open Dashboard"
          >
            ⋮
          </button>


          {/* LOGO */}

          <div className="logo">
            🌾 Smart Farmer Assistant
          </div>


          {/* =================================================
              SEARCH
          ================================================= */}

          <div className="searchContainer">

            <div className="searchBox">

              <FaSearch />

              <input
                type="text"
                placeholder="Search Features..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>


            {/* SEARCH RESULTS */}

            {search.trim() !== "" && (

              <div className="searchResults">

                {filteredSearch.length > 0 ? (

                  filteredSearch.map((item) => (

                    <div
                      key={item.page}
                      className="searchResultItem"
                      onClick={() =>
                        openSearchResult(item.page)
                      }
                    >

                      <span className="searchResultIcon">
                        {item.icon}
                      </span>

                      <span>
                        {item.name}
                      </span>

                    </div>

                  ))

                ) : (

                  <div className="noSearchResult">
                    ❌ No feature found
                  </div>

                )}

              </div>

            )}

          </div>


          {/* =================================================
              RIGHT MENU
          ================================================= */}

          <div className="rightMenu">


            {/* NOTIFICATIONS */}

            <FaBell
              className="icon"
              title="Notifications"
              onClick={() =>
                setPage("notifications")
              }
            />


            {/* DARK MODE */}

            <FaMoon
              className="icon"
              title="Dark Mode"
              onClick={() =>
                setDark(!dark)
              }
            />


            {/* PROFILE */}

            <div className="userProfile">

              <FaUserCircle
                className="profileIcon"
                onClick={() =>
                  setProfile(!profile)
                }
              />

              <span>
                Farmer
              </span>


              {/* PROFILE DROPDOWN */}

              {profile && (

                <div className="profileDropdown">


                  {/* PROFILE */}

                  <p
                    onClick={() => {

                      setProfile(false);

                      setPage("profile");

                    }}
                  >
                    👨‍🌾 My Profile
                  </p>


                  {/* SETTINGS */}

                  <p
                    onClick={() => {

                      setProfile(false);

                      setPage("settings");

                    }}
                  >
                    ⚙ Settings
                  </p>


                  {/* LOGOUT */}

                  <p
                    onClick={() => {

                      setProfile(false);

                      if (logout) {
                        logout();
                      }

                    }}
                  >
                    🚪 Logout
                  </p>

                </div>

              )}

            </div>

          </div>

        </header>


        {/* =================================================
            DASHBOARD CONTENT
        ================================================= */}

        <div className="dashboardContent">


          {/* =================================================
              WELCOME
          ================================================= */}

          <section className="welcomeSection">

            <h1>
              👨‍🌾 Welcome Farmer
            </h1>

          </section>


          {/* =================================================
              FEATURE CARDS
          ================================================= */}

          <section className="featureGrid">


            {/* FARMER PROFILE */}

            <div
              className="featureCard"
              onClick={() =>
                setPage("profile")
              }
            >

              <div className="featureIcon">
                👨‍🌾
              </div>

              <h3>
                Farmer Profile
              </h3>

              <p>
                Manage farming details
              </p>

            </div>


            {/* WEATHER */}

            <div
              className="featureCard"
              onClick={() =>
                setPage("weather")
              }
            >

              <div className="featureIcon">
                🌦
              </div>

              <h3>
                Weather
              </h3>

              <p>
                Check Karnataka weather updates
              </p>

            </div>


            {/* MARKET */}

            <div
              className="featureCard"
              onClick={() =>
                setPage("market")
              }
            >

              <div className="featureIcon">
                📈
              </div>

              <h3>
                Market Price
              </h3>

              <p>
                Latest Karnataka crop prices
              </p>

            </div>


            {/* PROFIT */}

            <div
              className="featureCard"
              onClick={() =>
                setPage("profit")
              }
            >

              <div className="featureIcon">
                💰
              </div>

              <h3>
                Profit Predictor
              </h3>

              <p>
                Calculate crop profit
              </p>

            </div>


            {/* CROP */}

            <div
              className="featureCard"
              onClick={() =>
                setPage("crop")
              }
            >

              <div className="featureIcon">
                🌱
              </div>

              <h3>
                Crop Recommendation
              </h3>

              <p>
                Crop suggestion
              </p>

            </div>


            {/* DAILY TIPS */}

            <div
              className="featureCard"
              onClick={() =>
                setPage("tips")
              }
            >

              <div className="featureIcon">
                🌿
              </div>

              <h3>
                Daily Tips
              </h3>

              <p>
                Get new farming tips every day
              </p>

            </div>


            {/* GOVERNMENT SCHEMES */}

            <div
              className="featureCard"
              onClick={() =>
                setPage("schemes")
              }
            >

              <div className="featureIcon">
                🏛
              </div>

              <h3>
                Government Schemes
              </h3>

              <p>
                Farmer benefits and schemes
              </p>

            </div>


          </section>


          {/* =================================================
              INFORMATION CARDS
          ================================================= */}

          <section className="infoGrid">


            {/* WEATHER */}

            <div className="infoCard">

              <h2>
                🌦 Karnataka Weather
              </h2>

              <h3>
                🌾 Karnataka
              </h3>

              <p>
                🌡 Temperature: Check latest weather
              </p>

              <p>
                💧 Humidity: Check weather updates
              </p>

              <p>
                ☁ Condition: View current conditions
              </p>

              <button
                className="viewButton"
                onClick={() =>
                  setPage("weather")
                }
              >
                View Weather
              </button>

            </div>


            {/* PROFIT */}

            <div className="infoCard">

              <h2>
                💰 Profit Predictor
              </h2>

              <p>
                Calculate your expected income and
                profit based on your crop, quantity
                and expenses.
              </p>

              <p>
                🌾 Select your crop and enter your
                farming details to calculate your profit.
              </p>

              <button
                className="viewButton"
                onClick={() =>
                  setPage("profit")
                }
              >
                Calculate Profit
              </button>

            </div>


            {/* DAILY TIP */}

            <div className="infoCard tipCard">

              <h2>
                🌱 Today's Farming Tip
              </h2>

              <p>
                💧 Water crops during early morning
                or evening to reduce evaporation
                and save water.
              </p>

              <button
                className="viewButton"
                onClick={() =>
                  setPage("tips")
                }
              >
                View Daily Tips
              </button>

            </div>


          </section>


          {/* =================================================
              MARKET PRICES
          ================================================= */}

          <section className="dashboardSection">

            <div className="sectionHeader">

              <h2 className="sectionTitle">
                📈 Today's Market Prices
              </h2>

              <button
                className="viewAllButton"
                onClick={() =>
                  setPage("market")
                }
              >
                View All
              </button>

            </div>


            <div className="marketGrid">


              {/* RICE */}

              <div
                className="marketCard"
                onClick={() =>
                  setPage("market")
                }
              >

                <div className="cropIcon">
                  🌾
                </div>

                <h3>
                  Rice
                </h3>

                <p>
                  Check latest price
                </p>

              </div>


              {/* MAIZE */}

              <div
                className="marketCard"
                onClick={() =>
                  setPage("market")
                }
              >

                <div className="cropIcon">
                  🌽
                </div>

                <h3>
                  Maize
                </h3>

                <p>
                  Check latest price
                </p>

              </div>


              {/* TOMATO */}

              <div
                className="marketCard"
                onClick={() =>
                  setPage("market")
                }
              >

                <div className="cropIcon">
                  🍅
                </div>

                <h3>
                  Tomato
                </h3>

                <p>
                  Check latest price
                </p>

              </div>


              {/* POTATO */}

              <div
                className="marketCard"
                onClick={() =>
                  setPage("market")
                }
              >

                <div className="cropIcon">
                  🥔
                </div>

                <h3>
                  Potato
                </h3>

                <p>
                  Check latest price
                </p>

              </div>


            </div>

          </section>


          {/* =================================================
              GOVERNMENT SCHEMES
          ================================================= */}

          <section className="dashboardSection">

            <div className="sectionHeader">

              <h2 className="sectionTitle">
                🏛 Government Schemes
              </h2>

              <button
                className="viewAllButton"
                onClick={() =>
                  setPage("schemes")
                }
              >
                View All
              </button>

            </div>


            <div className="schemeGrid">


              {/* PM KISAN */}

              <div className="schemeCard">

                <h3>
                  🌾 PM-KISAN
                </h3>

                <p>
                  Financial support for eligible
                  farmers under the government scheme.
                </p>

                <button
                  onClick={() =>
                    setPage("schemes")
                  }
                >
                  View Details
                </button>

              </div>


              {/* SOIL HEALTH */}

              <div className="schemeCard">

                <h3>
                  🌱 Soil Health Card
                </h3>

                <p>
                  Soil testing and recommendations
                  for better fertilizer management.
                </p>

                <button
                  onClick={() =>
                    setPage("schemes")
                  }
                >
                  View Details
                </button>

              </div>


              {/* CROP INSURANCE */}

              <div className="schemeCard">

                <h3>
                  🌧 Crop Insurance
                </h3>

                <p>
                  Crop insurance information and
                  protection against eligible losses.
                </p>

                <button
                  onClick={() =>
                    setPage("schemes")
                  }
                >
                  View Details
                </button>

              </div>


              {/* FARM MECHANIZATION */}

              <div className="schemeCard">

                <h3>
                  🚜 Farm Mechanization
                </h3>

                <p>
                  Information about agricultural
                  machinery assistance and subsidies.
                </p>

                <button
                  onClick={() =>
                    setPage("schemes")
                  }
                >
                  View Details
                </button>

              </div>


              {/* IRRIGATION */}

              <div className="schemeCard">

                <h3>
                  💧 Irrigation Support
                </h3>

                <p>
                  Information about irrigation and
                  water management support.
                </p>

                <button
                  onClick={() =>
                    setPage("schemes")
                  }
                >
                  View Details
                </button>

              </div>


              {/* E-NAM */}

              <div className="schemeCard">

                <h3>
                  📈 e-NAM
                </h3>

                <p>
                  Online agricultural market platform
                  information for farmers.
                </p>

                <button
                  onClick={() =>
                    setPage("schemes")
                  }
                >
                  View Details
                </button>

              </div>


            </div>

          </section>


          {/* =================================================
              FARMING ALERT
          ================================================= */}

          <section className="weatherAlert">

            <h2>
              ⚠ Farming Alert
            </h2>

            <p>
              Check the latest Karnataka weather
              before spraying pesticides or fertilizers.
            </p>

            <button
              className="viewButton"
              onClick={() =>
                setPage("weather")
              }
            >
              Check Weather
            </button>

          </section>


          {/* =================================================
              QUICK ACTIONS
          ================================================= */}

          <section className="dashboardSection">

            <h2 className="sectionTitle">
              ⚡ Quick Actions
            </h2>


            <div className="quickActions">


              <button
                onClick={() =>
                  setPage("weather")
                }
              >
                🌦 Check Weather
              </button>


              <button
                onClick={() =>
                  setPage("market")
                }
              >
                📈 Market Prices
              </button>


              <button
                onClick={() =>
                  setPage("profit")
                }
              >
                💰 Calculate Profit
              </button>


              <button
                onClick={() =>
                  setPage("crop")
                }
              >
                🌱 Crop Recommendation
              </button>


              <button
                onClick={() =>
                  setPage("tips")
                }
              >
                🌿 Daily Tips
              </button>


              <button
                onClick={() =>
                  setPage("schemes")
                }
              >
                🏛 Government Schemes
              </button>


            </div>

          </section>


          {/* =================================================
              FOOTER
          ================================================= */}

          <footer className="footer">

            <p>
              🌾 Smart Farmer Assistant © 2026
            </p>

            <p>
              Karnataka Weather | Market Prices |
              Crop Recommendation | Daily Tips |
              Government Schemes
            </p>

          </footer>


        </div>

      </div>

    </div>

  );
}


export default Home;