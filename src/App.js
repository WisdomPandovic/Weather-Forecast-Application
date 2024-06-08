import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import MultipleCitiesWeather from './components/MultipleCitiesWeather';
import MyLocationWeather from './components/MyLocationWeather';
import Footer from './components/Footer';
import axios from 'axios';

const App = () => {
    const [city, setCity] = useState('');
    const [defaultWeather, setDefaultWeather] = useState([]);
    const [error, setError] = useState('');

    const defaultCities = ['Abuja', 'Lagos', 'Kano', 'Imo'];

    useEffect(() => {
        const fetchDefaultWeather = async () => {
            try {
                const responses = await Promise.all(
                    defaultCities.map(city =>
                        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`)
                    )
                );
                setDefaultWeather(responses.map(response => response.data));
            } catch (error) {
                setError('Error fetching default city weather data');
            }
        };

        fetchDefaultWeather();
    }, []);

    const handleSearch = (city) => {
        setCity(city);
    };

    return (
        <div className="container-fluid bg-dull-gray">
            <MyLocationWeather/> 
            <SearchBar onSearch={handleSearch} />
            {city ? (
                <>
                    <CurrentWeather city={city} />
                    <Forecast city={city} />
                </>
            ) : (
                <div className="row">
                    {defaultWeather.map((weather, index) => (
                        <div key={index} className="col-md-6 col-lg-3 mb-4">
                            <div className="">
                                <CurrentWeather city={weather.name} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <Footer/> 
        </div>
    );
};

export default App;
