import React, { useState } from "react";
import axios from "axios";

const WeatherDashboard = () => {
    const [city, setCity] = useState(""); // Stores the city entered by the user
    const [weather, setWeather] = useState(null); // Stores the weather data
    const [error, setError] = useState(""); // Stores error messages

    // Fetch weather data from the Django backend
    const fetchWeather = async () => {
        if (!city) {
            setError("Please enter a city name!");
            return;
        }

        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/weather/?city=${city}`);
            setWeather(response.data); // Save weather data
            setError(""); // Clear error messages
        } catch (err) {
            setWeather(null);
            setError(err.response ? err.response.data.error : "An error occurred");
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Weather Dashboard</h1>
            <div className="d-flex justify-content-center mt-4">
                <input
                    type="text"
                    className="form-control w-50"
                    placeholder="Enter city name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button className="btn btn-primary ms-3" onClick={fetchWeather}>
                    Search
                </button>
            </div>
            {error && <p className="text-danger text-center mt-3">{error}</p>}
            {weather && (
                <div className="card mt-5 mx-auto" style={{ maxWidth: "400px" }}>
                    <div className="card-body">
                        <h3 className="card-title">{weather.name}</h3>
                        <p className="card-text">Condition: {weather.description}</p>
                        <h4 className="card-text">Temperature: {weather.temp}°C</h4>
                        <p className="card-text">Humidity: {weather.humidity}%</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherDashboard;
