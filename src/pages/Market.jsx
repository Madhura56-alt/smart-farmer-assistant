
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Market.css";

function Market({ goHome }) {
  const [prices, setPrices] = useState([]);
  const [filteredPrices, setFilteredPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [search, setSearch] = useState("");

  // ============================================================
  // LOAD MARKET PRICES
  // ============================================================

  const loadMarketPrices = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/market-prices",
        {
          timeout: 30000,
        }
      );

      console.log("Market API response:", response.data);

      const data = response.data;

      if (!data || !Array.isArray(data.prices)) {
        throw new Error("No market data available.");
      }

      // IMPORTANT:
      // Keep ALL records returned by backend.
      // Do NOT remove duplicate crops.
      //
      // Example:
      // Rice - Udupi APMC
      // Rice - Mangalore APMC
      // Rice - Raichur APMC
      //
      // All records will be displayed.

      const allPrices = data.prices;

      setPrices(allPrices);
      setFilteredPrices(allPrices);

      setLastUpdated(
        data.last_checked || new Date().toISOString()
      );
    } catch (err) {
      console.error("Market price error:", err);

      setPrices([]);
      setFilteredPrices([]);

      if (err.code === "ECONNABORTED") {
        setError("Server took too long to respond.");
      } else if (err.response) {
        setError(
          err.response.data?.message ||
            `Server error: ${err.response.status}`
        );
      } else if (err.message) {
        setError(err.message);
      } else {
        setError(
          "Network Error. Make sure Flask is running."
        );
      }
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
    const searchText = search.trim().toLowerCase();

    if (searchText === "") {
      setFilteredPrices(prices);
      return;
    }

    const results = prices.filter((item) => {
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

    return `₹${number.toLocaleString("en-IN")}`;
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
          <h1>📈 Karnataka Market Prices</h1>

          <p>
            Latest available agricultural market prices
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
                  onClick={handleClearSearch}
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
                          `${String(crop)}-${index}`
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
          are intended to provide farmers with
          agricultural market information.
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
            Source: Government agricultural
            market data / AGMARKNET
          </strong>
        </p>

        <p>
          🔄 Prices are requested from the
          government market service whenever
          you refresh this page.
        </p>

        <div className="dataNotice">

          <h3>
            ⚠️ Data Notice
          </h3>

          <p>
            When the government market service
            is temporarily unavailable,
            fallback market information may
            be displayed.
          </p>

          <p>
            <strong>
              Fallback prices are NOT live
              government prices.
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

