
import React, { useMemo, useState } from "react";
import "./GovernmentSchemes.css";

// ============================================================
// GOVERNMENT SCHEMES
// Official government / government-platform links
// ============================================================

const GOVERNMENT_SCHEMES = [
  {
    id: 1,
    name: "PM-KISAN",
    category: "Financial Support",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    description:
      "Pradhan Mantri Kisan Samman Nidhi provides income support to eligible farmer families.",
    source: "Government of India",
    url: "https://pmkisan.gov.in/",
  },
  {
    id: 2,
    name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    category: "Crop Insurance",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    description:
      "Provides crop insurance protection to farmers against losses caused by natural calamities, pests and diseases.",
    source: "Government of India",
    url: "https://pmfby.gov.in/",
  },
  {
    id: 3,
    name: "Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)",
    category: "Irrigation",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    description:
      "Aims to improve irrigation facilities and promote efficient use of water in agriculture.",
    source: "Government of India",
    url: "https://pmksy.gov.in/",
  },
  {
    id: 4,
    name: "Kisan Credit Card (KCC)",
    category: "Agricultural Credit",
    ministry: "Government of India",
    description:
      "Provides farmers access to timely credit for agricultural and related activities.",
    source: "Government of India",
    url: "https://www.myscheme.gov.in/",
  },
  {
    id: 5,
    name: "Soil Health Card Scheme",
    category: "Soil & Agriculture",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    description:
      "Provides farmers with information about the nutrient status of their soil and recommendations for appropriate fertilizers.",
    source: "Government of India",
    url: "https://soilhealth.dac.gov.in/",
  },
  {
    id: 6,
    name: "e-NAM",
    category: "Agricultural Market",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    description:
      "National Agriculture Market provides an electronic trading platform connecting agricultural markets.",
    source: "Government of India",
    url: "https://www.enam.gov.in/",
  },
  {
    id: 7,
    name: "Agriculture Infrastructure Fund (AIF)",
    category: "Agriculture Infrastructure",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    description:
      "Supports financing for post-harvest infrastructure and community farming assets.",
    source: "Government of India",
    url: "https://agriinfra.dac.gov.in/",
  },
  {
    id: 8,
    name: "Pradhan Mantri Kisan Maandhan Yojana",
    category: "Pension",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    description:
      "A pension scheme intended to provide social security to eligible small and marginal farmers.",
    source: "Government of India",
    url: "https://maandhan.in/",
  },
  {
    id: 9,
    name: "PM-KUSUM",
    category: "Solar Energy",
    ministry: "Ministry of New and Renewable Energy",
    description:
      "Promotes solar energy solutions for farmers, including solar agricultural pumps and decentralized solar power.",
    source: "Government of India",
    url: "https://pmkusum.mnre.gov.in/",
  },
  {
    id: 10,
    name: "National Food Security Mission (NFSM)",
    category: "Crop Production",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    description:
      "Supports sustainable increases in production of important food crops through improved agricultural practices.",
    source: "Government of India",
    url: "https://nfsm.gov.in/",
  },
  {
    id: 11,
    name: "Sub-Mission on Agricultural Mechanization (SMAM)",
    category: "Farm Machinery",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    description:
      "Promotes agricultural mechanization and access to farm machinery and equipment.",
    source: "Government of India",
    url: "https://agrimachinery.nic.in/",
  },
  {
    id: 12,
    name: "Paramparagat Krishi Vikas Yojana (PKVY)",
    category: "Organic Farming",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    description:
      "Promotes organic farming practices and sustainable agricultural production.",
    source: "Government of India",
    url: "https://pgsindia-ncof.gov.in/",
  },
  {
    id: 13,
    name: "National Mission for Sustainable Agriculture (NMSA)",
    category: "Sustainable Agriculture",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    description:
      "Promotes sustainable agricultural practices, efficient resource management and climate-resilient agriculture.",
    source: "Government of India",
    url: "https://agriculture.gov.in/",
  },
  {
    id: 14,
    name: "National Horticulture Mission",
    category: "Horticulture",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    description:
      "Supports development of horticulture through improved production, post-harvest management and infrastructure.",
    source: "Government of India",
    url: "https://midh.gov.in/",
  },
  {
    id: 15,
    name: "Kisan Call Centre",
    category: "Farmer Support",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    description:
      "Provides agricultural information and advisory support to farmers through a dedicated farmer helpline.",
    source: "Government of India",
    url: "https://mkisan.gov.in/",
  },
  {
    id: 16,
    name: "National Mission on Edible Oils - Oil Palm",
    category: "Oilseed / Plantation",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    description:
      "Supports development of oil palm cultivation and aims to increase domestic edible oil production.",
    source: "Government of India",
    url: "https://agriculture.gov.in/",
  },
  {
    id: 17,
    name: "Mission for Integrated Development of Horticulture (MIDH)",
    category: "Horticulture",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    description:
      "Supports holistic development of horticulture crops including production, post-harvest management and infrastructure.",
    source: "Government of India",
    url: "https://midh.gov.in/",
  },
  {
    id: 18,
    name: "Rashtriya Krishi Vikas Yojana (RKVY)",
    category: "Agriculture Development",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    description:
      "Supports states in implementing agriculture and allied-sector development projects.",
    source: "Government of India",
    url: "https://rkvy.nic.in/",
  },
  {
    id: 19,
    name: "National Agriculture Market",
    category: "Market",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    description:
      "An online agricultural trading platform designed to improve market access and price discovery for agricultural produce.",
    source: "Government of India",
    url: "https://www.enam.gov.in/",
  },
  {
    id: 20,
    name: "myScheme",
    category: "Government Schemes",
    ministry: "Government of India",
    description:
      "A national platform for discovering government schemes and checking scheme-related information.",
    source: "Government of India",
    url: "https://www.myscheme.gov.in/",
  },
];

// ============================================================
// COMPONENT
// ============================================================

function GovernmentSchemes({ goHome }) {
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(true);

  // ==========================================================
  // SEARCH
  // ==========================================================

  const filteredSchemes = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return GOVERNMENT_SCHEMES;
    }

    return GOVERNMENT_SCHEMES.filter((scheme) => {
      return (
        scheme.name.toLowerCase().includes(query) ||
        scheme.description.toLowerCase().includes(query) ||
        scheme.category.toLowerCase().includes(query) ||
        scheme.ministry.toLowerCase().includes(query)
      );
    });
  }, [search]);

  // ==========================================================
  // SEARCH BUTTON
  // ==========================================================

  const handleSearch = () => {
    setShowAll(false);
  };

  // ==========================================================
  // CLEAR SEARCH
  // ==========================================================

  const handleClearSearch = () => {
    setSearch("");
    setShowAll(true);
  };

  // ==========================================================
  // ENTER KEY
  // ==========================================================

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // ==========================================================
  // OPEN OFFICIAL WEBSITE
  // ==========================================================

  const openScheme = (url) => {
    if (!url) {
      return;
    }

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // ==========================================================
  // DISPLAY RESULTS
  // ==========================================================

  const displayedSchemes =
    showAll || !search.trim()
      ? filteredSchemes
      : filteredSchemes;

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <div className="governmentPage">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="governmentHeader">

        <div>
          <h1>
            🏛 Government Schemes
          </h1>

          <p>
            Government schemes and benefits
            for farmers
          </p>
        </div>

        <button
          className="refreshButton"
          type="button"
          onClick={() => {
            setSearch("");
            setShowAll(true);
          }}
        >
          🔄 Refresh
        </button>

      </div>

      {/* ======================================================
          INFORMATION
      ====================================================== */}

      <div className="backendInfo">
        <strong>Information:</strong>{" "}
        Government farmer schemes
      </div>

      {/* ======================================================
          SUMMARY
      ====================================================== */}

      <div className="schemeSummary">

        <div className="summaryCard">
          <span>🏛</span>

          <strong>
            {GOVERNMENT_SCHEMES.length}
          </strong>

          <small>
            Schemes Available
          </small>
        </div>

        <div className="summaryCard">
          <span>🌾</span>

          <strong>
            Farmers
          </strong>

          <small>
            Agriculture Benefits
          </small>
        </div>

        <div className="summaryCard">
          <span>🇮🇳</span>

          <strong>
            Official
          </strong>

          <small>
            Government Information
          </small>
        </div>

      </div>

      {/* ======================================================
          SEARCH
      ====================================================== */}

      <div className="schemeSearch">

        <input
          type="text"
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder="🔍 Search scheme..."
          aria-label="Search government schemes"
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
            aria-label="Clear search"
          >
            ✕
          </button>
        )}

      </div>

      {/* ======================================================
          RESULT COUNT
      ====================================================== */}

      <div className="resultCount">

        Showing{" "}
        <strong>
          {displayedSchemes.length}
        </strong>{" "}
        of{" "}
        <strong>
          {GOVERNMENT_SCHEMES.length}
        </strong>{" "}
        schemes

      </div>

      {/* ======================================================
          NO RESULTS
      ====================================================== */}

      {displayedSchemes.length === 0 && (

        <div className="emptyBox">

          <h3>
            🔍 No schemes found
          </h3>

          <p>
            Try another search term such as
            PM-KISAN, crop insurance,
            irrigation or agriculture.
          </p>

          <button
            className="retryButton"
            type="button"
            onClick={handleClearSearch}
          >
            Show All
          </button>

        </div>

      )}

      {/* ======================================================
          SCHEME GRID
      ====================================================== */}

      {displayedSchemes.length > 0 && (

        <div className="schemeGrid">

          {displayedSchemes.map((scheme) => (

            <div
              className="schemeCard"
              key={scheme.id}
            >

              {/* TITLE */}

              <div className="schemeTitle">
                🏛 {scheme.name}
              </div>

              {/* CATEGORY */}

              <div className="schemeCategory">
                🌾 {scheme.category}
              </div>

              {/* DESCRIPTION */}

              <p className="schemeDescription">
                {scheme.description}
              </p>

              {/* MINISTRY */}

              <p className="schemeMinistry">

                🏢{" "}

                <strong>
                  Ministry:
                </strong>{" "}

                {scheme.ministry}

              </p>

              {/* SOURCE */}

              <p className="schemeSource">

                🇮🇳{" "}

                <strong>
                  Source:
                </strong>{" "}

                {scheme.source}

              </p>

              {/* OFFICIAL BUTTON */}

              <button
                className="applyButton"
                type="button"
                onClick={() =>
                  openScheme(scheme.url)
                }
              >
                🔗 View Official Details
              </button>

            </div>

          ))}

        </div>

      )}

      {/* ======================================================
          ABOUT
      ====================================================== */}

      <div className="aboutGovernment">

        <h2>
          ℹ️ About Government Schemes
        </h2>

        <p>
          This section provides information
          about government schemes that may
          be useful for farmers.
        </p>

        <p>
          Click "View Official Details" to
          open the respective government
          website.
        </p>

        <p>
          Always verify the latest eligibility,
          benefits, documents, deadlines and
          application requirements on the
          official government website before
          applying.
        </p>

      </div>

      {/* ======================================================
          BACK BUTTON
      ====================================================== */}

      <button
        className="backButton"
        type="button"
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

export default GovernmentSchemes;

