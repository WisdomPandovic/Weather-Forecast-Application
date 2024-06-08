import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import { mockForecast } from '../mockData';

const Forecast = ({ city }) => {
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (city) {
            const fetchForecast = async () => {
                setLoading(true);
                setError('');
                if (process.env.REACT_APP_WEATHER_API_KEY) {
                    try {
                        const response = await axios.get(
                            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
                        );
                        setForecast(response.data.list);
                    } catch (error) {
                        setError('City not found');
                    } finally {
                        setLoading(false);
                    }
                } else {
                    // Use mock data
                    setTimeout(() => {
                        setForecast(mockForecast);
                        setLoading(false);
                    }, 1000);
                }
            };
            fetchForecast();
        }
    }, [city]);

    const getPastDates = () => {
        const today = new Date();
        const pastDates = [];
        for (let i = 4; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            pastDates.push(date.toLocaleDateString(undefined, { weekday: 'long' }));
        }
        return pastDates;
    };

    return (
        <div className="card border-0">
            <div className="card-body">
                <h2 className="card-title mb-5 text-white">This week Forecast for {city}</h2>
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
                ) : forecast.length > 0 ? (
                    <div className="table-responsive">
                        <table className="table table-striped table-borderless" style={{ backgroundColor: '#203a35', color: 'white' }}>
                            <thead>
                                <tr>
                                    <th style={{ backgroundColor: '#82b0b7 ', color: 'white' }}>Day</th>
                                    <th style={{ backgroundColor: '#82b0b7 ', color: 'white' }}>Temperature (°C)</th>
                                    <th style={{ backgroundColor: '#82b0b7 ', color: 'white' }}>Conditions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getPastDates().map((day, index) => (
                                    <tr key={index}>
                                        <td style={{ backgroundColor: '#82b0b7 ', color: 'white' }}>{day}</td>
                                        <td style={{ backgroundColor: '#82b0b7 ', color: 'white' }}>{forecast[index]?.main.temp}°C</td>
                                        <td style={{ backgroundColor: '#82b0b7 ', color: 'white', textTransform: 'capitalize' }}>{forecast[index]?.weather[0]?.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No data available</p>
                )}
            </div>
        </div>
    );
};

export default Forecast;
