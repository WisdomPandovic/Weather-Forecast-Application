import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import getWeatherIcon from '../utils/weatherIcons';

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
                <h4 className="card-title mt-5 mb-3 text-white text-center">Today</h4>
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
                        <div className="weather-container">
                            <h3 className="card-title text-white">{city}</h3>
                            <div className="weather-icon">
                                {getWeatherIcon(weather.weather[0].description, "#F9C51A")}
                            </div>
                        </div>

                        <div className="d-flex justify-content-between text-white">
                            <p>WS: {weather.wind.speed} m/s</p>
                            <p>{weather.main.temp}°C </p>
                        </div>

                        <div className="d-flex justify-content-between text-white">
                            <p>H: {weather.main.humidity}%</p>
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
