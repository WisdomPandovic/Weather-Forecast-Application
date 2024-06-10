import React, { useState, useEffect } from 'react';
import CurrentWeather from './CurrentWeather';
import axios from 'axios';

const MultipleCitiesWeather = () => {
    const [nearestCities, setNearestCities] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchNearestCitiesWeather = async () => {
            const location = JSON.parse(sessionStorage.getItem('location'));
            if (location) {
                const { latitude, longitude } = location;
                try {
                    const response = await axios.get(
                        `https://api.openweathermap.org/data/2.5/find?lat=${latitude}&lon=${longitude}&cnt=4&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
                    );
                    setNearestCities(response.data.list);
                } catch (error) {
                    setError('Error fetching nearest cities weather data');
                }
            }
        };

        fetchNearestCitiesWeather();
    }, []);

    return (
        <div className="container mt-4">
            {error && <p>{error}</p>}
            <div className="row">
                {nearestCities.map((city) => (
                    <div key={city.id} className="col-md-6 col-lg-3 mb-4">
                        <div className="">
                            <CurrentWeather city={city.name} color="#ff6347" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MultipleCitiesWeather;
