import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import getWeatherIcon from '../utils/weatherIcons';
import humidityImg from '../icons/humidity.png';
import windImg from '../icons/wind.png';
import celsiusImg from '../icons/celsius.png';
import sunImg from '../icons/sun.png';

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
            <div className="card-body border-0 custom-card mb-5">
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
                                <h2 className="card-title mt-5 mb-3 text-white">Today</h2>
                                <p className="text-white">{currentDateTime}</p>
                                <h3 className="card-title text-white">{`${weather.name}, ${weather.sys.country}`}</h3>
                            </div>

                        </div>

                        <div className="text-white temperature-containers">
                            <div className="weather-icon">
                                {getWeatherIcon(weather.weather[0].description, "#F9C51A")}
                            </div>

                            <p className='temperature'>{Math.floor(weather.main.temp)}° </p>
                        </div>
                    </div>
                ) : (
                    <p>No data available</p>
                )}
            </div>

            <div className="card-body border-0 forecast-card mb-2">
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
                    <div className="d-flex justify-content-between text-white">
                        <p><img src={humidityImg} alt="humidity" style={{ width: '24px', marginRight: '8px' }} /> Humidity</p>
                        <p>{weather.main.humidity}%</p>
                    </div>
                ) : (
                    <p>No data available</p>
                )}
            </div>

            <div className="card-body border-0 forecast-card mb-2">
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
                    <div className="d-flex justify-content-between text-white">
                        <p><img src={windImg} alt="wind" style={{ width: '24px', marginRight: '8px' }} /> Wind Speed</p>
                        <p>{Math.floor(weather.wind.speed)} m/s</p>
                    </div>
                ) : (
                    <p>No data available</p>
                )}
            </div>

            <div className="card-body border-0 forecast-card mb-2">
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
                    <div className="d-flex justify-content-between text-white">
                        <p><img src={sunImg} alt="condition" style={{ width: '24px', marginRight: '8px' }} /> Condition</p>
                        <p style={{ textTransform: 'capitalize' }}>{weather.weather[0].description}</p>
                    </div>
                ) : (
                    <p>No data available</p>
                )}
            </div>

            <div className="card-body border-0 forecast-card mb-2">
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
                    <div className="d-flex justify-content-between align-items-center text-white">
                        <p><img src={celsiusImg} alt="temperature" style={{ width: '24px', marginRight: '8px' }} /> Temperature</p>
                        <p>{Math.floor(weather.main.temp)}°</p>
                    </div>
                ) : (
                    <p>No data available</p>
                )}
            </div>
        </div>
    );
};

export default CurrentWeather;
