import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import getWeatherIcon from '../utils/weatherIcons';

const MyLocationWeather = () => {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    console.log('Fetched user location:', { latitude, longitude });
                    sessionStorage.setItem('location', JSON.stringify({ latitude, longitude }));
                    const response = await axios.get(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
                    );
                    console.log('Weather data for user location:', response.data);
                    setLocation(response.data);
                } catch (error) {
                    console.error('Error fetching weather data for your location:', error);
                    setError('Error fetching weather data for your location');
                } finally {
                    setLoading(false);
                }
            },
            (error) => {
                console.error('Error getting your location:', error);
                setError('Error getting your location');
                setLoading(false);
            }
        );
    }, []);

    const getCurrentDate = () => {
        const currentDate = new Date();
        const options = { weekday: 'short', month: 'long', day: 'numeric' };
        return currentDate.toLocaleDateString(undefined, options);
    };

    return (
        <div className='mt-5'>
            {loading ? (
                <div className="d-flex justify-content-center">
                    <ThreeDots height="100" width="100" color="#00BFFF" ariaLabel="loading" />
                </div>
            ) : error ? (
                <p>{error}</p>
            ) : location ? (
                <div>
                    <h2>My location</h2>
                    <h2>{`${location.name}, ${location.sys.country}`}</h2>
                    <p>{getCurrentDate()}</p>
                    <div className="weather-container">
                        <p>{getWeatherIcon(location.weather[0].description, "#F9C51A")}</p>
                        <div className="temperature-container">
                            <span className="degree-symbol">° C</span>
                            <p className="temperature">{Math.floor(location.main.temp)}</p>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default MyLocationWeather;
