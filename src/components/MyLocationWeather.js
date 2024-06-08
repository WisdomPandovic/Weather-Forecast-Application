// src/components/MyLocationWeather.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import getWeatherIcon from '../utils/weatherIcons';

const MyLocationWeather = () => {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Get user's location using browser's geolocation API
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    // Fetch weather data for user's location using latitude and longitude
                    const response = await axios.get(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
                    );
                    setLocation(response.data);
                } catch (error) {
                    setError('Error fetching weather data for your location');
                } finally {
                    setLoading(false);
                }
            },
            (error) => {
                setError('Error getting your location');
                setLoading(false);
            }
        );
    }, []);

    const getCurrentDate = () => {
        const currentDate = new Date();
        return currentDate.toLocaleDateString();
    };

    return (
        <div className=' mt-5'>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : location ? (
                <div>
                    <h2>My location</h2>
                    <h2>{location.name}</h2>
                    <p>{getCurrentDate()}</p>
                    <div className="weather-container">
                        <p>{getWeatherIcon(location.weather[0].description, "#F9C51A")}</p>
                        <p className="temperature">{location.main.temp}°C</p>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default MyLocationWeather;
