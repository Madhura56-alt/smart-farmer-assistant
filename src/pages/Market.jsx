
import React, { useEffect, useState } from "react";
import "./Market.css";

// ============================================================
// CROP MASTER DATA
// ============================================================

const CROPS = [
  ["Rice", 3200],
  ["Paddy", 3000],
  ["Wheat", 2800],
  ["Maize", 2200],
  ["Ragi", 3600],
  ["Jowar", 3000],
  ["Bajra", 2600],
  ["Groundnut", 5800],
  ["Arecanut", 28000],
  ["Coconut", 2600],
  ["Turmeric", 8500],
  ["Chilli", 12000],
  ["Black Pepper", 52000],
  ["Cardamom", 145000],
  ["Ginger", 6200],
  ["Garlic", 9000],
  ["Onion", 2800],
  ["Potato", 2200],
  ["Tomato", 2600],
  ["Cabbage", 1800],
  ["Carrot", 3200],
  ["Beans", 4800],
  ["Brinjal", 2500],
  ["Lady Finger", 3000],
  ["Green Chilli", 5200],
  ["Cucumber", 2200],
  ["Pumpkin", 1800],
  ["Bitter Gourd", 3500],
  ["Bottle Gourd", 2200],
  ["Drumstick", 5200],
  ["Banana", 3000],
  ["Mango", 6500],
  ["Papaya", 2800],
  ["Pineapple", 4200],
  ["Guava", 3800],
  ["Watermelon", 2400],
  ["Pomegranate", 8500],
  ["Soybean", 4200],
  ["Sunflower", 5200],
  ["Cotton", 7000],
];

// ============================================================
// KARNATAKA APMC MARKETS
// ============================================================

const MARKETS = [
  ["Udupi", "Udupi APMC"],
  ["Udupi", "Kundapura APMC"],
  ["Udupi", "Karkala APMC"],

  ["Dakshina Kannada", "Mangalore APMC"],
  ["Dakshina Kannada", "Puttur APMC"],
  ["Dakshina Kannada", "Bantwal APMC"],

  ["Uttara Kannada", "Karwar APMC"],
  ["Uttara Kannada", "Sirsi APMC"],
  ["Uttara Kannada", "Kumta APMC"],

  ["Shivamogga", "Shivamogga APMC"],
  ["Shivamogga", "Sagar APMC"],

  ["Mysuru", "Mysuru APMC"],
  ["Mysuru", "Nanjangud APMC"],

  ["Hassan", "Hassan APMC"],
  ["Hassan", "Arasikere APMC"],

  ["Kodagu", "Madikeri APMC"],

  ["Belagavi", "Belagavi APMC"],
  ["Dharwad", "Dharwad APMC"],
  ["Hubballi", "Hubballi APMC"],

  ["Raichur", "Raichur APMC"],
  ["Vijayapura", "Vijayapura APMC"],
  ["Bagalkot", "Bagalkot APMC"],

  ["Tumakuru", "Tumakuru APMC"],
  ["Kolar", "Kolar APMC"],
  ["Chikkaballapur", "Chikkaballapur APMC"],
];

// ============================================================
// GET TODAY'S DATE
// ============================================================

function getTodayDate() {
  const today = new Date();

  return today.toLocaleDateString("en-GB");
}

// ============================================================
// CREATE A DAILY NUMBER SEED
// This changes automatically every day.
// ============================================================

function getDailySeed() {
  const today = new Date();

  return (
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate()
  );
}

// ============================================================
// CREATE 1500 FALLBACK MARKET RECORDS
// Prices automatically change every day.
// ============================================================

function createFallbackPrices() {
  const date = getTodayDate();
  const dailySeed = getDailySeed();

  const prices = [];

  for (let i = 0; i < 1500; i += 1) {
    // Select crop
    const cropIndex =
      (i * 17 + dailySeed) % CROPS.length;

    // Select market
    const marketIndex =
      (i * 11 + dailySeed) % MARKETS.length;

    const [crop, basePrice] =
      CROPS[cropIndex];

    const [district, market] =
      MARKETS[marketIndex];

    // Daily price variation
    const variation =
      ((dailySeed * 13 + i * 73) % 501) -
      250;

    const price = Math.max(
      100,
      basePrice + variation
    );

    prices.push({
      id: i + 1,

      crop,
      commodity: crop,
      commodity_name: crop,

      market,
      market_name: market,

      district,
      district_name: district,

      state: "Karnataka",
      state_name: "Karnataka",

      price,
      modal_price: price,
      modalPrice: price,

      min_price: Math.round(
        price * 0.92
      ),

      max_price: Math.round(
        price * 1.08
      ),

      arrival_date: date,
      arrivalDate: date,
      date,
    });
  }

  return prices;
}

// ============================================================
// MARKET COMPONENT
// ============================================================

function Market({ goHome }) {
  const [prices, setPrices] = useState([]);
  const [filteredPrices, setFilteredPrices] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [lastUpdated, setLastUpdated] =
    useState("");

  const [search, setSearch] =
    useState("");

  // ============================================================
  // LOAD MARKET PRICES
  // ============================================================

  const loadMarketPrices = () => {
    setLoading(true);
    setError("");

    try {
      const fallbackPrices =
        createFallbackPrices();

      setPrices(fallbackPrices);
      setFilteredPrices(fallbackPrices);

      setLastUpdated(
        new Date().toISOString()
      );
    } catch (err) {
      console.error(
        "Market price error:",
        err
      );

      setPrices([]);
      setFilteredPrices([]);

      setError(
        "Unable to create fallback market prices."
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // LOAD WHEN PAGE OPENS
  // ============================================================

  useEffect(() => {
    loadMarketPrices();
  }, []);

  // ============================================================
  // SEARCH
  // ============================================================

  const handleSearch = () => {
    const searchText =
      search.trim().toLowerCase();

    if (searchText === "") {
      setFilteredPrices(prices);
      return;
    }

    const results =
      prices.filter((item) => {
        const crop = String(
          item.crop ||
            item.commodity ||
            item.commodity_name ||
            ""
        ).toLowerCase();

        const market = String(
          item.market ||
            item.market_name ||
            ""
        ).toLowerCase();

        const district = String(
          item.district ||
            item.district_name ||
            ""
        ).toLowerCase();

        const state = String(
          item.state ||
            item.state_name ||
            ""
        ).toLowerCase();

        const date = String(
          item.date ||
            item.arrival_date ||
            item.arrivalDate ||
            ""
        ).toLowerCase();

        return (
          crop.includes(searchText) ||
          market.includes(searchText) ||
          district.includes(searchText) ||
          state.includes(searchText) ||
          date.includes(searchText)
        );
      });

    setFilteredPrices(results);
  };

  // ============================================================
  // CLEAR SEARCH
  // ============================================================

  const handleClearSearch = () => {
    setSearch("");
    setFilteredPrices(prices);
  };

  // ============================================================
  // ENTER KEY
  // ============================================================

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // ============================================================
  // FORMAT PRICE
  // ============================================================

  const formatPrice = (value) => {
    if (
      value === undefined ||
      value === null ||
      value === ""
    ) {
      return "N/A";
    }

    const number = Number(value);

    if (Number.isNaN(number)) {
      return "N/A";
    }

    return `₹${number.toLocaleString(
      "en-IN"
    )}`;
  };

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <div className="marketPage">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="marketHeader">

        <div>
          <h1>
            📈 Karnataka Market Prices
          </h1>

          <p>
            Karnataka agricultural market
            prices
          </p>
        </div>

        <button
          className="refreshButton"
          onClick={loadMarketPrices}
          disabled={loading}
        >
          {loading
            ? "⏳ Updating..."
            : "🔄 Refresh"}
        </button>

      </div>

      {/* ======================================================
          SEARCH
      ====================================================== */}

      {!loading &&
        !error &&
        prices.length > 0 && (

          <div className="marketSearch">

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder="🔍 Search crop, market or district..."
            />

            <button
              type="button"
              className="searchButton"
              onClick={handleSearch}
            >
              🔍 Search
            </button>

            {search && (
              <button
                type="button"
                className="clearSearch"
                onClick={handleClearSearch}
              >
                ✕
              </button>
            )}

          </div>
        )}

      {/* ======================================================
          LOADING
      ====================================================== */}

      {loading && (

        <div className="loadingBox">

          <div className="loader"></div>

          <h3>
            🔄 Loading market prices...
          </h3>

          <p>
            Please wait...
          </p>

        </div>
      )}

      {/* ======================================================
          ERROR
      ====================================================== */}

      {!loading &&
        error && (

          <div className="errorBox">

            <h3>
              ❌ Unable to load market prices
            </h3>

            <p>
              {error}
            </p>

            <button
              className="retryButton"
              onClick={loadMarketPrices}
            >
              🔄 Try Again
            </button>

          </div>
        )}

      {/* ======================================================
          MARKET DATA
      ====================================================== */}

      {!loading &&
        !error &&
        prices.length > 0 && (

          <>

            {/* INFO */}

            <div className="marketInfo">

              <span>
                🇮🇳 Karnataka
              </span>

              <span>
                🌾 {filteredPrices.length} records
              </span>

              {lastUpdated && (
                <span>
                  🕒 Checked:{" "}
                  {new Date(
                    lastUpdated
                  ).toLocaleString("en-IN")}
                </span>
              )}

            </div>

            {/* ==================================================
                NO SEARCH RESULTS
            ================================================== */}

            {filteredPrices.length === 0 && (

              <div className="emptyBox">

                <h3>
                  🔍 No crop found
                </h3>

                <p>
                  No crop, market or district
                  matches your search.
                </p>

                <button
                  className="retryButton"
                  onClick={
                    handleClearSearch
                  }
                >
                  ✕ Clear Search
                </button>

              </div>
            )}

            {/* ==================================================
                MARKET CARDS
            ================================================== */}

            {filteredPrices.length > 0 && (

              <div className="marketGrid">

                {filteredPrices.map(
                  (item, index) => {

                    const price =
                      item.price ??
                      item.modal_price ??
                      item.modalPrice;

                    const arrivalDate =
                      item.date ??
                      item.arrival_date ??
                      item.arrivalDate ??
                      "Not available";

                    const crop =
                      item.crop ??
                      item.commodity ??
                      item.commodity_name ??
                      "Unknown Crop";

                    const market =
                      item.market ??
                      item.market_name ??
                      "Market";

                    const district =
                      item.district ??
                      item.district_name ??
                      "Karnataka";

                    const state =
                      item.state ??
                      item.state_name ??
                      "Karnataka";

                    return (
                      <div
                        className="marketCard"
                        key={
                          item.id ??
                          `${String(
                            crop
                          )}-${index}`
                        }
                      >

                        {/* CROP */}

                        <div className="cropTitle">
                          🌾 {crop}
                        </div>

                        {/* MARKET */}

                        <h3>
                          🏪 {market}
                        </h3>

                        {/* LOCATION */}

                        <p className="location">
                          📍 {district},{" "}
                          {state}
                        </p>

                        {/* PRICE */}

                        <div className="priceMain">
                          {formatPrice(price)}
                        </div>

                        <p className="unit">
                          Modal Price / Quintal
                        </p>

                        {/* DATE */}

                        <div className="dateBox">
                          📅 Arrival Date:{" "}
                          {arrivalDate}
                        </div>

                      </div>
                    );
                  }
                )}

              </div>
            )}

          </>
        )}

      {/* ======================================================
          EMPTY
      ====================================================== */}

      {!loading &&
        !error &&
        prices.length === 0 && (

          <div className="emptyBox">

            <h3>
              🌾 No market records available
            </h3>

            <p>
              No agricultural market prices
              are currently available.
            </p>

            <button
              className="retryButton"
              onClick={loadMarketPrices}
            >
              🔄 Refresh
            </button>

          </div>
        )}

      {/* ======================================================
          ABOUT
      ====================================================== */}

      <div className="aboutMarket">

        <h2>
          🌾 About Market Prices
        </h2>

        <p>
          The prices displayed in this section
          provide agricultural market
          information for application
          demonstration purposes.
        </p>

        <p>
          Actual selling prices may vary
          depending on crop quality, crop
          variety, quantity, APMC market,
          demand and supply, and local
          trading conditions.
        </p>

        <p>
          <strong>
            Source: Offline fallback
            agricultural market information
          </strong>
        </p>

        <p>
          🔄 Market prices are generated
          automatically each day. No manual
          update is required.
        </p>

        <div className="dataNotice">

          <h3>
            ⚠️ Data Notice
          </h3>

          <p>
            Fallback market prices are
            generated locally for the
            application.
          </p>

          <p>
            <strong>
              These are NOT live government
              market prices.
            </strong>
          </p>

        </div>

      </div>

      {/* ======================================================
          BACK
      ====================================================== */}

      <button
        className="backButton"
        onClick={goHome}
      >
        ⬅ Back to Home
      </button>

      {/* ======================================================
          FOOTER
      ====================================================== */}

      <footer>
        🌾 Smart Farmer Assistant © 2026
      </footer>

    </div>
  );
}

export default Market;
