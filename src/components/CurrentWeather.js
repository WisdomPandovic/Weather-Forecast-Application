import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import getWeatherIcon from '../utils/weatherIcons';

const CurrentWeather = ({ city }) => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentDateTime, setCurrentDateTime] = useState('');

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
                    setCurrentDateTime(getCurrentDateTime());
                } catch (error) {
                    setError('City not found');
                } finally {
                    setLoading(false);
                }
            };
            fetchWeather();
        }
    }, [city]);

    const getCurrentDateTime = () => {
        const currentDate = new Date();
        const options = {
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };
        return currentDate.toLocaleDateString('en-US', options);
    };

    return (
        <div className="card mb-2 border-0">
            <div className="card-body border-0 custom-card ">
                {loading ? (
                    <div className="d-flex justify-content-center">
                        <ThreeDots
                            height="100"
                            width="100"
                            color="#00BFFF"
                            ariaLabel="loading"
                        />
                    </div>
                ) : error ? (
                    <p>{error}</p>
                ) : weather ? (
                    <div>
                        <div className="current-weather-container">
                            <div>
                                <p className="card-title mt-5 mb-3 text-white">Today</p>
                                <h3 className="card-title text-white">{`${weather.name}, ${weather.sys.country}`}</h3>
                            </div>
                            <div className="weather-icon">
                                {getWeatherIcon(weather.weather[0].description, "#F9C51A")}
                            </div>
                        </div>

                        <div className="text-white temperature-containers ">
                            <p className="text-white">{currentDateTime}</p>
                            <p className='temperature'>{Math.floor(weather.main.temp)}° </p>
                        </div>

                        <div className="d-flex justify-content-between text-white">
                            <p>H: {weather.main.humidity}%</p>
                            <p>WS: {weather.wind.speed} m/s</p>
                            <p style={{ textTransform: 'capitalize' }}>{weather.weather[0].description}</p>

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
