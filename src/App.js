import "./styles.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState(""); // To store the city name from the search input

  useEffect(() => {
    // Function to fetch weather data based on the city name
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fdb6296ca93c8b4b0e3899940edb899f`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    // Call the fetchWeatherData function when the city state changes
    if (city) {
      fetchWeatherData();
    }
  }, [city]); // Run the effect whenever the city state changes

  const handleSearch = (event) => {
    setCity(event.target.value);
  };

  return (
    <div className="app">
      <div className="container">
        {/* Search Input */}
        <input
          className="rounded-input"
          type="text"
          value={city}
          onChange={handleSearch}
          placeholder="Check Weather by City Name"
        />

        {weatherData && (
          <div className="top">
            <div className="location">
              <p>{weatherData.name}</p>
            </div>
            <div className="temp">
              <h1>{Math.round(weatherData.main.temp - 273.15)}°C</h1>
            </div>
            <div className="description">
              <p>{weatherData.weather[0].description}</p>
            </div>
          </div>
        )}

        {weatherData && (
          <div className="bottom">
            <div className="feels">
              <p>
                Feels like: {Math.round(weatherData.main.feels_like - 273.15)}°C
              </p>
            </div>
            <div className="humidity">
              <p>Humidity: {weatherData.main.humidity}%</p>
            </div>
            <div className="wind">
              <p>Wind: {weatherData.wind.speed}MPH</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
