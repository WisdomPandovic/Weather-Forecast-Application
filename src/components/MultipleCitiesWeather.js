import React from 'react';
import CurrentWeather from './CurrentWeather';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


const cities = ['Abuja', 'Lagos', 'Kano', 'Port Harcourt'];

const MultipleCitiesWeather = () => {
    return (
        <div className="container mt-4">
            <div className="row">
                <TransitionGroup>
                    {cities.map((city, index) => (
                        <CSSTransition key={city} timeout={500} classNames="city-item">
                            <div className="col-md-6 col-lg-3 mb-4">
                                <div className="card">
                                    <CurrentWeather city={city} color="#ff6347" />
                                </div>
                            </div>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </div>
        </div>
    );
};

export default MultipleCitiesWeather;
