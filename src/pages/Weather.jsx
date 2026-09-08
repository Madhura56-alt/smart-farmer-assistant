
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Weather.css";

function Weather({ goHome }) {
  const [current, setCurrent] = useState(null);
  const [daily, setDaily] = useState([]);
  const [hourly, setHourly] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Udupi location is used as the Karnataka reference weather location
  const LATITUDE = 13.3409;
  const LONGITUDE = 74.7421;

  // ==========================================================
  // LOAD WEATHER
  // ==========================================================

  useEffect(() => {
    loadWeather();
  }, []);

  async function loadWeather() {
    try {
      setLoading(true);
      setError("");

      const url =
        `https://api.open-meteo.com/v1/forecast?` +
        `latitude=${LATITUDE}` +
        `&longitude=${LONGITUDE}` +
        `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,wind_speed_10m,surface_pressure,visibility,uv_index` +
        `&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,rain,weather_code,wind_speed_10m,apparent_temperature` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max,sunrise,sunset` +
        `&timezone=auto` +
        `&forecast_days=7`;

      const response = await axios.get(url);

      const data = response.data;

      // ========================================================
      // CURRENT WEATHER
      // ========================================================

      setCurrent(data.current);

      // ========================================================
      // DAILY FORECAST
      // ========================================================

      const dailyData = data.daily;

      const dailyForecast = dailyData.time.map((date, index) => ({
        date: date,
        max: dailyData.temperature_2m_max[index],
        min: dailyData.temperature_2m_min[index],
        rain: dailyData.precipitation_probability_max[index],
        uv: dailyData.uv_index_max[index],
        sunrise: dailyData.sunrise[index],
        sunset: dailyData.sunset[index],
        code: dailyData.weather_code[index],
      }));

      setDaily(dailyForecast);

      // ========================================================
      // HOURLY FORECAST
      // ========================================================

      const hourlyData = data.hourly;

      const now = new Date();

      let currentIndex = hourlyData.time.findIndex((time) => {
        return new Date(time) >= now;
      });

      if (currentIndex === -1) {
        currentIndex = 0;
      }

      const hourlyForecast = [];

      for (
        let i = currentIndex;
        i < currentIndex + 12 && i < hourlyData.time.length;
        i++
      ) {
        hourlyForecast.push({
          time: hourlyData.time[i],
          temp: hourlyData.temperature_2m[i],
          humidity: hourlyData.relative_humidity_2m[i],
          rain: hourlyData.precipitation_probability[i],
          precipitation: hourlyData.precipitation[i],
          wind: hourlyData.wind_speed_10m[i],
          feelsLike: hourlyData.apparent_temperature[i],
          code: hourlyData.weather_code[i],
        });
      }

      setHourly(hourlyForecast);
    } catch (err) {
      console.error("Weather error:", err);

      setError(
        "Unable to load weather information. Please check your internet connection."
      );
    } finally {
      setLoading(false);
    }
  }

  // ==========================================================
  // WEATHER DESCRIPTION
  // ==========================================================

  function weatherDescription(code) {
    if (code === 0) return "Clear Sky";

    if (code === 1) return "Mainly Clear";

    if (code === 2) return "Partly Cloudy";

    if (code === 3) return "Overcast";

    if (code === 45 || code === 48) return "Foggy";

    if (code >= 51 && code <= 57) return "Drizzle";

    if (code >= 61 && code <= 67) return "Rain";

    if (code >= 71 && code <= 77) return "Snow";

    if (code >= 80 && code <= 82) return "Rain Showers";

    if (code >= 95 && code <= 99) return "Thunderstorm";

    return "Cloudy";
  }

  // ==========================================================
  // WEATHER ICON
  // ==========================================================

  function weatherIcon(code) {
    if (code === 0) return "☀️";

    if (code === 1) return "🌤️";

    if (code === 2) return "⛅";

    if (code === 3) return "☁️";

    if (code === 45 || code === 48) return "🌫️";

    if (code >= 51 && code <= 57) return "🌦️";

    if (code >= 61 && code <= 67) return "🌧️";

    if (code >= 71 && code <= 77) return "❄️";

    if (code >= 80 && code <= 82) return "🌦️";

    if (code >= 95 && code <= 99) return "⛈️";

    return "☁️";
  }

  // ==========================================================
  // DATE
  // ==========================================================

  function formatDate(date) {
    return new Date(date).toLocaleDateString("en-IN", {
      weekday: "long",
      day: "2-digit",
      month: "short",
    });
  }

  // ==========================================================
  // TIME
  // ==========================================================

  function formatTime(time) {
    return new Date(time).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // ==========================================================
  // FARMER ADVISORY
  // ==========================================================

  function getAdvisory() {
    if (!current) return [];

    const rainProbability =
      daily.length > 0 ? daily[0].rain ?? 0 : 0;

    const rain = current.rain ?? 0;

    const advice = [];

    if (rainProbability >= 70) {
      advice.push(
        "🌧️ High rain probability: Avoid irrigation today."
      );

      advice.push(
        `⚠️ Avoid pesticide and fertilizer spraying because rain probability is ${rainProbability}%.`
      );

      advice.push(
        "🌱 Avoid sowing during heavy rainfall."
      );
    } else {
      advice.push(
        "💧 Weather is suitable for irrigation."
      );

      advice.push(
        "🌱 Weather conditions are suitable for sowing."
      );

      advice.push(
        "🧪 Farmers can consider fertilizer application if no rain is expected."
      );
    }

    if (rain > 5) {
      advice.push(
        "🚜 Harvest crops only when weather becomes dry."
      );
    } else {
      advice.push(
        "🚜 Current rainfall is low; harvesting conditions may be suitable."
      );
    }

    return advice;
  }

  // ==========================================================
  // WEATHER ALERTS
  // ==========================================================

  function getAlerts() {
    if (!current) return [];

    const alerts = [];

    const rainProbability =
      daily.length > 0 ? daily[0].rain ?? 0 : 0;

    const humidity = current.relative_humidity_2m ?? 0;

    const wind = current.wind_speed_10m ?? 0;

    if (rainProbability >= 80) {
      alerts.push(
        `🔴 Heavy rain alert: Rain probability is ${rainProbability}% today.`
      );
    } else if (rainProbability >= 50) {
      alerts.push(
        `🟡 Rain alert: Rain probability is ${rainProbability}% today.`
      );
    }

    if (humidity >= 90) {
      alerts.push(
        `💧 Very high humidity: Humidity is ${humidity}%. Monitor crops for fungal diseases.`
      );
    }

    if (wind >= 20) {
      alerts.push(
        `🌬 Strong wind alert: Wind speed is ${wind} km/h.`
      );
    }

    if (alerts.length === 0) {
      alerts.push(
        "🟢 No major weather alerts at this time."
      );
    }

    return alerts;
  }

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <div className="weatherPage">
        <div className="weatherLoading">
          <div className="loadingIcon">🌦️</div>
          <h2>Loading Karnataka Weather...</h2>
          <p>Please wait while we get the latest weather information.</p>
        </div>
      </div>
    );
  }

  // ==========================================================
  // ERROR
  // ==========================================================

  if (error || !current) {
    return (
      <div className="weatherPage">
        <div className="weatherError">
          <h2>❌ Weather Unavailable</h2>

          <p>{error}</p>

          <button
            className="refreshBtn"
            onClick={loadWeather}
          >
            🔄 Try Again
          </button>

          <button
            className="backBtn"
            onClick={goHome}
          >
            ⬅ Back to Home
          </button>
        </div>
      </div>
    );
  }

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <div className="weatherPage">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="weatherHeader">

        <div>
          <h1>🌦 Karnataka Weather</h1>

          <p>
            📍 Karnataka
          </p>
        </div>

        <div className="liveBadge">
          🟢 Live Weather
        </div>

      </div>


      {/* =====================================================
          CURRENT WEATHER
      ===================================================== */}

      <section className="currentWeather">

        <div className="currentMain">

          <div className="currentIcon">
            {weatherIcon(current.weather_code)}
          </div>

          <div>

            <p className="currentLabel">
              Current Weather
            </p>

            <h2>
              {current.temperature_2m}°C
            </h2>

            <h3>
              {weatherDescription(
                current.weather_code
              )}
            </h3>

          </div>

        </div>


        <div className="windInfo">

          💨 Wind Speed

          <strong>
            {current.wind_speed_10m} km/h
          </strong>

        </div>

      </section>


      {/* =====================================================
          WEATHER INFORMATION
      ===================================================== */}

      <div className="infoGrid">

        <div className="infoCard">

          <div className="infoIcon">
            💧
          </div>

          <h3>Humidity</h3>

          <p>
            {current.relative_humidity_2m}%
          </p>

        </div>


        <div className="infoCard">

          <div className="infoIcon">
            🌧️
          </div>

          <h3>Rain</h3>

          <p>
            {current.precipitation} mm
          </p>

        </div>


        <div className="infoCard">

          <div className="infoIcon">
            ☀️
          </div>

          <h3>UV Index</h3>

          <p>
            {current.uv_index}
          </p>

        </div>


        <div className="infoCard">

          <div className="infoIcon">
            💨
          </div>

          <h3>Pressure</h3>

          <p>
            {current.surface_pressure} hPa
          </p>

        </div>


        <div className="infoCard">

          <div className="infoIcon">
            👁️
          </div>

          <h3>Visibility</h3>

          <p>
            {current.visibility
              ? `${(current.visibility / 1000).toFixed(1)} km`
              : "--"}
          </p>

        </div>


        <div className="infoCard">

          <div className="infoIcon">
            🌡️
          </div>

          <h3>Feels Like</h3>

          <p>
            {current.apparent_temperature}°C
          </p>

        </div>

      </div>


      {/* =====================================================
          HOURLY FORECAST
      ===================================================== */}

      <section>

        <h2 className="sectionTitle">
          🕒 Hourly Forecast
        </h2>

        <div className="hourContainer">

          {hourly.map((item, index) => (

            <div
              className="hourCard"
              key={index}
            >

              <p className="hourTime">
                {formatTime(item.time)}
              </p>

              <div className="hourIcon">
                {weatherIcon(item.code)}
              </div>

              <h3>
                {item.temp}°C
              </h3>

              <p className="description">
                {weatherDescription(item.code)}
              </p>

              <div className="hourDetails">

                <span>
                  💧 {item.humidity}%
                </span>

                <span>
                  🌧️ {item.rain}%
                </span>

                <span>
                  💨 {item.wind} km/h
                </span>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* =====================================================
          7 DAY FORECAST
      ===================================================== */}

      <section>

        <h2 className="sectionTitle">
          📅 7-Day Forecast
        </h2>

        <div className="forecastContainer">

          {daily.map((item, index) => (

            <div
              className="forecastCard"
              key={index}
            >

              <div className="forecastDate">

                <h3>
                  {formatDate(item.date)}
                </h3>

                <p>
                  {item.date}
                </p>

              </div>


              <div className="forecastWeather">

                <div className="forecastIcon">
                  {weatherIcon(item.code)}
                </div>

                <strong>
                  {weatherDescription(item.code)}
                </strong>

              </div>


              <div className="temperature">

                <strong>
                  {item.max}°C
                </strong>

                <span>
                  {item.min}°C
                </span>

              </div>


              <div className="forecastDetails">

                <span>
                  🌧️ Rain: {item.rain}%
                </span>

                <span>
                  ☀️ UV: {item.uv}
                </span>

                <span>
                  🌅 Sunrise:{" "}
                  {formatTime(item.sunrise)}
                </span>

                <span>
                  🌇 Sunset:{" "}
                  {formatTime(item.sunset)}
                </span>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* =====================================================
          FARMER ADVISORY
      ===================================================== */}

      <section>

        <h2 className="sectionTitle">
          🌾 Farmer Advisory
        </h2>

        <div className="adviceCard">

          {getAdvisory().map(
            (advice, index) => (

              <p key={index}>
                {advice}
              </p>

            )
          )}

        </div>

      </section>


      {/* =====================================================
          WEATHER ALERTS
      ===================================================== */}

      <section>

        <h2 className="sectionTitle">
          🚨 Weather Alerts
        </h2>

        <div className="alertCard">

          {getAlerts().map(
            (alert, index) => (

              <p key={index}>
                {alert}
              </p>

            )
          )}

        </div>

      </section>


      {/* =====================================================
          ACTION BUTTONS
      ===================================================== */}

      <div className="weatherActions">

        <button
          className="refreshBtn"
          onClick={loadWeather}
        >
          🔄 Refresh Weather
        </button>


        <button
          className="backBtn"
          onClick={goHome}
        >
          ⬅ Back to Home
        </button>

      </div>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="weatherFooter">

        <p>
          🌾 Smart Farmer Assistant © 2026
        </p>

        <p>
          Karnataka Weather • Farmer Advisory •
          7-Day Forecast
        </p>

      </footer>

    </div>
  );
}

export default Weather;

