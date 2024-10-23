import React, { useState, useEffect } from "react";
import { Search, Wind, Droplets, Thermometer } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!city) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
fdb6296ca93c8b4b0e3899940edb899f
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${fdb6296ca93c8b4b0e3899940edb899f}`
        );
        
        if (!response.ok) {
          throw new Error(response.status === 404 
            ? "City not found. Please check the spelling and try again." 
            : "Failed to fetch weather data. Please try again later.");
        }
        
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        setError(error.message);
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchWeatherData();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [city]);

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCity(searchInput.trim());
  };

  const convertToLocalTime = (timestamp, timezone) => {
    const date = new Date((timestamp + timezone) * 1000);
    return date.toLocaleTimeString();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Weather Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={handleSearch}
                  placeholder="Enter city name"
                  className="w-full pl-8 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </form>

            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {weatherData && (
              <div className="space-y-4">
                <div className="text-center">
                  <h2 className="text-2xl font-bold">{weatherData.name}</h2>
                  <p className="text-4xl font-bold my-2">
                    {Math.round(weatherData.main.temp - 273.15)}°C
                  </p>
                  <p className="text-lg capitalize">
                    {weatherData.weather[0].description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="text-sm text-gray-500">Feels Like</p>
                      <p className="font-medium">
                        {Math.round(weatherData.main.feels_like - 273.15)}°C
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Humidity</p>
                      <p className="font-medium">{weatherData.main.humidity}%</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Wind className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Wind Speed</p>
                      <p className="font-medium">{weatherData.wind.speed} m/s</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Sunrise/Sunset</p>
                    <p className="font-medium">
                      {convertToLocalTime(weatherData.sys.sunrise, weatherData.timezone)}
                      <br />
                      {convertToLocalTime(weatherData.sys.sunset, weatherData.timezone)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WeatherApp;