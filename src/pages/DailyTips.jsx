
import React, { useEffect, useState } from "react";
import "./DailyTips.css";

function DailyTips({ goHome }) {
  const [language, setLanguage] = useState("English");
  const [todayTip, setTodayTip] = useState(null);
  const [currentDate, setCurrentDate] = useState("");

  // =========================================================
  // DAILY TIPS
  // =========================================================

  const tips = [
    {
      icon: "💧",
      category: "Water Management",
      en: "Water crops early in the morning to reduce evaporation and save water.",
      kn: "ಆವಿಯಾಗುವಿಕೆಯನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಮತ್ತು ನೀರನ್ನು ಉಳಿಸಲು ಬೆಳೆಗಳಿಗೆ ಬೆಳಿಗ್ಗೆ ಬೇಗನೆ ನೀರು ಹಾಕಿ.",
      hi: "वाष्पीकरण को कम करने और पानी बचाने के लिए फसलों को सुबह जल्दी पानी दें."
    },
    {
      icon: "🌱",
      category: "Soil",
      en: "Test your soil before applying fertilizers so that the correct nutrients can be provided.",
      kn: "ರಸಗೊಬ್ಬರ ಹಾಕುವ ಮೊದಲು ಮಣ್ಣಿನ ಪರೀಕ್ಷೆ ಮಾಡಿ. ಇದರಿಂದ ಅಗತ್ಯವಿರುವ ಪೋಷಕಾಂಶಗಳನ್ನು ಸರಿಯಾಗಿ ನೀಡಬಹುದು.",
      hi: "उर्वरक डालने से पहले मिट्टी की जांच करें ताकि सही पोषक तत्व दिए जा सकें."
    },
    {
      icon: "🌾",
      category: "Crop Care",
      en: "Remove weeds regularly because weeds compete with crops for water, nutrients and sunlight.",
      kn: "ಕಳೆಗಳನ್ನು ನಿಯಮಿತವಾಗಿ ತೆಗೆದುಹಾಕಿ. ಕಳೆಗಳು ನೀರು, ಪೋಷಕಾಂಶ ಮತ್ತು ಸೂರ್ಯನ ಬೆಳಕಿಗಾಗಿ ಬೆಳೆಗಳೊಂದಿಗೆ ಸ್ಪರ್ಧಿಸುತ್ತವೆ.",
      hi: "खरपतवार को नियमित रूप से हटाएं क्योंकि वे पानी, पोषक तत्वों और धूप के लिए फसलों से प्रतिस्पर्धा करते हैं."
    },
    {
      icon: "🐛",
      category: "Pest Management",
      en: "Check leaves regularly for insects and disease symptoms and take action early.",
      kn: "ಕೀಟಗಳು ಮತ್ತು ರೋಗದ ಲಕ್ಷಣಗಳಿಗಾಗಿ ಎಲೆಗಳನ್ನು ನಿಯಮಿತವಾಗಿ ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಆರಂಭದಲ್ಲೇ ಕ್ರಮ ಕೈಗೊಳ್ಳಿ.",
      hi: "कीटों और रोग के लक्षणों के लिए पत्तियों की नियमित जांच करें और जल्दी कार्रवाई करें."
    },
    {
      icon: "🌧️",
      category: "Weather",
      en: "Check the weather forecast before spraying pesticides or fertilizers.",
      kn: "ಕೀಟನಾಶಕ ಅಥವಾ ರಸಗೊಬ್ಬರ ಸಿಂಪಡಿಸುವ ಮೊದಲು ಹವಾಮಾನ ಮುನ್ಸೂಚನೆಯನ್ನು ಪರಿಶೀಲಿಸಿ.",
      hi: "कीटनाशक या उर्वरक का छिड़काव करने से पहले मौसम का पूर्वानुमान जांचें."
    },
    {
      icon: "🌿",
      category: "Organic Farming",
      en: "Use compost and well-decomposed organic manure to improve soil health.",
      kn: "ಮಣ್ಣಿನ ಆರೋಗ್ಯವನ್ನು ಸುಧಾರಿಸಲು ಕಾಂಪೋಸ್ಟ್ ಮತ್ತು ಚೆನ್ನಾಗಿ ಕೊಳೆತ ಸಾವಯವ ಗೊಬ್ಬರವನ್ನು ಬಳಸಿ.",
      hi: "मिट्टी के स्वास्थ्य को बेहतर बनाने के लिए कम्पोस्ट और अच्छी तरह सड़ी हुई जैविक खाद का उपयोग करें."
    },
    {
      icon: "🌻",
      category: "Crop Rotation",
      en: "Practice crop rotation to maintain soil fertility and reduce pest problems.",
      kn: "ಮಣ್ಣಿನ ಫಲವತ್ತತೆಯನ್ನು ಕಾಪಾಡಲು ಮತ್ತು ಕೀಟ ಸಮಸ್ಯೆಗಳನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಬೆಳೆ ಪರಿವರ್ತನೆ ಮಾಡಿ.",
      hi: "मिट्टी की उर्वरता बनाए रखने और कीट समस्याओं को कम करने के लिए फसल चक्र अपनाएं."
    },
    {
      icon: "🌾",
      category: "Harvest",
      en: "Harvest crops at the right maturity stage to maintain quality and reduce losses.",
      kn: "ಗುಣಮಟ್ಟವನ್ನು ಕಾಪಾಡಲು ಮತ್ತು ನಷ್ಟವನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಬೆಳೆಗಳನ್ನು ಸರಿಯಾದ ಪಕ್ವತೆಯ ಹಂತದಲ್ಲಿ ಕೊಯ್ಲು ಮಾಡಿ.",
      hi: "गुणवत्ता बनाए रखने और नुकसान कम करने के लिए फसलों की सही परिपक्वता अवस्था में कटाई करें."
    },
    {
      icon: "🧪",
      category: "Fertilizer",
      en: "Apply fertilizers according to crop requirements instead of using excess fertilizer.",
      kn: "ಅತಿಯಾದ ರಸಗೊಬ್ಬರ ಬಳಸುವ ಬದಲು ಬೆಳೆಯ ಅಗತ್ಯಕ್ಕೆ ಅನುಗುಣವಾಗಿ ರಸಗೊಬ್ಬರವನ್ನು ಬಳಸಿ.",
      hi: "अधिक उर्वरक का उपयोग करने के बजाय फसल की आवश्यकता के अनुसार उर्वरक डालें."
    },
    {
      icon: "🚜",
      category: "Farm Management",
      en: "Keep farm equipment clean and maintained to avoid breakdowns during important farm operations.",
      kn: "ಪ್ರಮುಖ ಕೃಷಿ ಕೆಲಸಗಳ ಸಮಯದಲ್ಲಿ ತೊಂದರೆ ತಪ್ಪಿಸಲು ಕೃಷಿ ಉಪಕರಣಗಳನ್ನು ಸ್ವಚ್ಛವಾಗಿ ಮತ್ತು ಉತ್ತಮ ಸ್ಥಿತಿಯಲ್ಲಿ ಇಡಿ.",
      hi: "महत्वपूर्ण कृषि कार्यों के दौरान खराबी से बचने के लिए कृषि उपकरणों को साफ और अच्छी स्थिति में रखें."
    },
    {
      icon: "🥬",
      category: "Vegetables",
      en: "Inspect vegetable crops frequently and remove damaged leaves or infected plants.",
      kn: "ತರಕಾರಿ ಬೆಳೆಗಳನ್ನು ಆಗಾಗ್ಗೆ ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಹಾನಿಗೊಳಗಾದ ಎಲೆಗಳು ಅಥವಾ ಸೋಂಕಿತ ಸಸ್ಯಗಳನ್ನು ತೆಗೆದುಹಾಕಿ.",
      hi: "सब्जियों की फसलों की नियमित जांच करें और क्षतिग्रस्त पत्तियों या संक्रमित पौधों को हटा दें."
    },
    {
      icon: "☀️",
      category: "Farm Safety",
      en: "Avoid working with agricultural chemicals without proper protective equipment.",
      kn: "ಸರಿಯಾದ ರಕ್ಷಣಾ ಸಾಧನಗಳಿಲ್ಲದೆ ಕೃಷಿ ರಾಸಾಯನಿಕಗಳೊಂದಿಗೆ ಕೆಲಸ ಮಾಡುವುದನ್ನು ತಪ್ಪಿಸಿ.",
      hi: "उचित सुरक्षा उपकरणों के बिना कृषि रसायनों के साथ काम करने से बचें."
    }
  ];

  // =========================================================
  // GET CURRENT DATE
  // =========================================================

  const getDateKey = () => {
    const now = new Date();

    return (
      now.getFullYear() +
      "-" +
      String(now.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(now.getDate()).padStart(2, "0")
    );
  };

  // =========================================================
  // SELECT TIP AUTOMATICALLY USING DATE
  // =========================================================

  const loadDailyTip = () => {
    const now = new Date();

    // Start date for calculating daily rotation
    const startDate = new Date(2026, 0, 1);

    const today = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    const difference =
      Math.floor(
        (today - startDate) / (1000 * 60 * 60 * 24)
      );

    const tipIndex =
      ((difference % tips.length) + tips.length) %
      tips.length;

    setTodayTip(tips[tipIndex]);

    // Format date
    const formattedDate = now.toLocaleDateString(
      "en-IN",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      }
    );

    setCurrentDate(formattedDate);
  };

  // =========================================================
  // LOAD TIP
  // =========================================================

  useEffect(() => {
    loadDailyTip();

    // Check every minute.
    // If the date changes while the page is open,
    // the new daily tip will automatically appear.

    const timer = setInterval(() => {
      const currentKey = getDateKey();

      const savedKey =
        sessionStorage.getItem("dailyTipDate");

      if (savedKey !== currentKey) {
        sessionStorage.setItem(
          "dailyTipDate",
          currentKey
        );

        loadDailyTip();
      }
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // =========================================================
  // GET LANGUAGE TEXT
  // =========================================================

  const getTipText = () => {
    if (!todayTip) {
      return "";
    }

    if (language === "Kannada") {
      return todayTip.kn;
    }

    if (language === "Hindi") {
      return todayTip.hi;
    }

    return todayTip.en;
  };

  const getCategory = () => {
    if (!todayTip) {
      return "";
    }

    return todayTip.category;
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (!todayTip) {
    return (
      <div className="dailyTipsPage">
        <div className="dailyTipsContainer">
          <button
            className="backButton"
            onClick={goHome}
          >
            ⬅ Back to Home
          </button>

          <div className="tipsLoading">
            Loading today's farming tip...
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="dailyTipsPage">

      <div className="dailyTipsContainer">

        {/* BACK BUTTON */}

        <button
          className="backButton"
          onClick={goHome}
        >
          ⬅ Back to Home
        </button>

        {/* HEADER */}

        <div className="tipsHeader">

          <h1>
            🌿 Daily Farming Tips
          </h1>

          <p>
            Get a useful farming tip every day
          </p>

        </div>

        {/* DATE */}

        <div className="dateBox">
          📅 {currentDate}
        </div>

        {/* LANGUAGE */}

        <div className="languageBox">

          <label>
            🌐 Select Language
          </label>

          <select
            value={language}
            onChange={(e) =>
              setLanguage(e.target.value)
            }
          >
            <option value="English">
              English
            </option>

            <option value="Kannada">
              ಕನ್ನಡ
            </option>

            <option value="Hindi">
              हिंदी
            </option>
          </select>

        </div>

        {/* TODAY'S TIP */}

        <section className="todayTip">

          <div className="todayLabel">
            ⭐ TODAY'S TIP
          </div>

          <div className="todayIcon">
            {todayTip.icon}
          </div>

          <div className="tipCategory">
            {getCategory()}
          </div>

          <h2>
            {language === "Kannada"
              ? "ಇಂದಿನ ಕೃಷಿ ಸಲಹೆ"
              : language === "Hindi"
              ? "आज की कृषि सलाह"
              : "Today's Farming Tip"}
          </h2>

          <p className="todayTipText">
            {getTipText()}
          </p>

          <div className="tipNumber">
            <strong>
              Tip {tips.indexOf(todayTip) + 1}
            </strong>{" "}
            of {tips.length}
          </div>

        </section>

        {/* ALL TIPS */}

        <section className="allTips">

          <h2>
            🌱 More Farming Tips
          </h2>

          <div className="tipsGrid">

            {tips.map((tip, index) => (

              <div
                className={
                  tips.indexOf(todayTip) === index
                    ? "smallTipCard activeTip"
                    : "smallTipCard"
                }
                key={index}
              >

                <div className="smallTipIcon">
                  {tip.icon}
                </div>

                <div>

                  <h3>
                    {tip.category}
                  </h3>

                  <p>
                    {language === "Kannada"
                      ? tip.kn
                      : language === "Hindi"
                      ? tip.hi
                      : tip.en}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </section>

        {/* FOOTER */}

        <footer className="tipsFooter">
          🌾 Smart Farmer Assistant © 2026
        </footer>

      </div>

    </div>
  );
}

export default DailyTips;





