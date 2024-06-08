// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import axios from 'axios';

const App = () => {
    const [city, setCity] = useState('Abuja');
    const [defaultWeather, setDefaultWeather] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch and display weather forecast for the default city when the app loads
        if (city) {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`)
                .then(response => {
                    setDefaultWeather(response.data);
                })
                .catch(error => {
                    setError('Error fetching default city weather data');
                })

        }
    }, [city]);

    const handleSearch = (city) => {
        setCity(city);
    };

    return (
        <div className="container-fluid bg-dull-gray">
            <SearchBar onSearch={handleSearch} />
            <CurrentWeather city={city} />
            <Forecast city={city} />
        </div>
    );
};

export default App;
