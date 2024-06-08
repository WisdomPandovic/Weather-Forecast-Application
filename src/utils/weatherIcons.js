import React from 'react';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';

const weatherIcon = (description, color) => {
    switch (description) {
        case 'clear sky':
            return <WiDaySunny color={color} />;
        case 'few clouds':
        case 'scattered clouds':
        case 'broken clouds':
            return <WiCloudy color={color} />;
        case 'shower rain':
        case 'rain':
            return <WiRain  color={color} />;
        case 'snow':
            return <WiSnow  color={color} />;
        case 'thunderstorm':
            return <WiThunderstorm color={color} />;
        default:
            return <WiDaySunny  color={color} />;
    }
};

export default weatherIcon;
