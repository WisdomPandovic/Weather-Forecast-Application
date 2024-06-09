import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CurrentWeather from './CurrentWeather';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { ThreeDots } from 'react-loader-spinner';

const MultipleCitiesWeather = () => {
    const [nearestCities, setNearestCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchNearestCities = async (latitude, longitude) => {
            try {
                // Fetch nearest cities using OpenWeatherMap API or any other suitable API
                const response = await axios.get(
                    `http://api.openweathermap.org/data/2.5/find?lat=${latitude}&lon=${longitude}&cnt=4&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
                );
                setNearestCities(response.data.list);
            } catch (error) {
                setError('Error fetching nearest cities');
            } finally {
                setLoading(false);
            }
        };

        const storedLocation = JSON.parse(sessionStorage.getItem('location'));
        if (storedLocation) {
            const { latitude, longitude } = storedLocation;
            fetchNearestCities(latitude, longitude);
        } else {
            setError('Location not found in session storage');
            setLoading(false);
        }
    }, []);

    return (
        <div className="container mt-4">
            {loading ? (
                <div className="d-flex justify-content-center">
                    <ThreeDots height="100" width="100" color="#00BFFF" ariaLabel="loading" />
                </div>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="row">
                    <TransitionGroup className="d-flex flex-wrap">
                        {nearestCities.map((city) => (
                            <CSSTransition key={city.id} timeout={500} classNames="city-item">
                                <div className="col-md-6 col-lg-3 mb-4">
                                    <div className="card">
                                        <CurrentWeather city={city.name} color="#ff6347" />
                                    </div>
                                </div>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </div>
            )}
        </div>
    );
};

export default MultipleCitiesWeather;
