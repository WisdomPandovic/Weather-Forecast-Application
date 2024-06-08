import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';

const getWeatherIcon = (description, size) => {
    switch (description) {
        case 'clear sky':
            return <WiDaySunny size={size} />;
        case 'few clouds':
        case 'scattered clouds':
        case 'broken clouds':
            return <WiCloudy size={size} />;
        case 'shower rain':
        case 'rain':
            return <WiRain size={size} />;
        case 'snow':
            return <WiSnow size={size} />;
        case 'thunderstorm':
            return <WiThunderstorm size={size} />;
        default:
            return <WiDaySunny size={size} />;
    }
};

const CurrentWeather = ({ city }) => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (city) {
            const fetchWeather = async () => {
                setLoading(true);
                setError('');
                try {
                    const response = await axios.get(
                        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
                    );
                    setWeather(response.data);
                } catch (error) {
                    setError('City not found');
                } finally {
                    setLoading(false);
                }
            };
            fetchWeather();
        }
    }, [city]);

    return (
        <div className="card mb-2 border-0">
            <div className="card-body border-0">
                <h2 className="card-title mt-5 mb-3">Today</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : weather ? (
                    <div>
                        <div className="d-flex justify-content-between">
                            <h3 className="card-title">{city}</h3>
                            {getWeatherIcon(weather.weather[0].description, 100)}
                        </div>
                        <p>Temperature: {weather.main.temp}°C </p>
                        <div className="d-flex justify-content-between">
                            <p>WS: {weather.wind.speed} m/s</p>
                            <p>H: {weather.main.humidity}%</p>
                            <p>{weather.weather[0].description}</p>
                        </div>
                    </div>
                ) : (
                    <p>No data available</p>
                )}
            </div>
        </div>
    );
};

export default CurrentWeather;
