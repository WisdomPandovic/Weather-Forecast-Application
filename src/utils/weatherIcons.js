// src/utils/weatherIcons.js
import React from 'react';

// Import your PNG icons
import clearSky from '../icons/clear-sky.png';
import fewClouds from '../icons/few-clouds.png';
import scatteredClouds from '../icons/scattered-clouds.png';
import brokenClouds from '../icons/broken-clouds.png';
import showerRain from '../icons/shower-rain.png';
import rain from '../icons/rain.png';
import snow from '../icons/snow.png';
import thunderstorm from '../icons/thunderstorm.png';

const weatherIcon = (description, size) => {
    const iconStyle = {
        width: size,
        height: size,
    };

    switch (description) {
        case 'clear sky':
            return <img src={clearSky} alt="clear sky" style={iconStyle} />;
        case 'few clouds':
            return <img src={fewClouds} alt="few clouds" style={iconStyle} />;
        case 'scattered clouds':
            return <img src={scatteredClouds} alt="scattered clouds" style={iconStyle} />;
        case 'broken clouds':
            return <img src={brokenClouds} alt="broken clouds" style={iconStyle} />;
        case 'shower rain':
            return <img src={showerRain} alt="shower rain" style={iconStyle} />;
        case 'rain':
            return <img src={rain} alt="rain" style={iconStyle} />;
        case 'snow':
            return <img src={snow} alt="snow" style={iconStyle} />;
        case 'thunderstorm':
            return <img src={thunderstorm} alt="thunderstorm" style={iconStyle} />;
        default:
            return <img src={clearSky} alt="default weather" style={iconStyle} />;
    }
};

export default weatherIcon;
