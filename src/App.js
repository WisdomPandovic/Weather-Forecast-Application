import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import MultipleCitiesWeather from './components/MultipleCitiesWeather';
import MyLocationWeather from './components/MyLocationWeather';
import Footer from './components/Footer';

const App = () => {
    const [city, setCity] = useState('');

    const handleSearch = (city) => {
        setCity(city);
    };

    return (
        <div className="container-fluid bg-dull-gray">
            <MyLocationWeather />
            <SearchBar onSearch={handleSearch} />
            {city ? (
                <>
                    <CurrentWeather city={city} />
                    <Forecast city={city} />
                </>
            ) : (
                <MultipleCitiesWeather />
            )}
            <Footer />
        </div>
    );
};

export default App;
