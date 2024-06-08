// src/mockData.js
export const mockCurrentWeather = {
    main: {
        temp: 22,
        humidity: 60
    },
    weather: [
        {
            description: "clear sky"
        }
    ],
    wind: {
        speed: 3.5
    }
};

export const mockForecast = [
    {
        dt_txt: "2024-06-09 12:00:00",
        main: {
            temp: 24
        },
        weather: [
            {
                description: "few clouds"
            }
        ]
    },
    {
        dt_txt: "2024-06-10 12:00:00",
        main: {
            temp: 25
        },
        weather: [
            {
                description: "scattered clouds"
            }
        ]
    },
    {
        dt_txt: "2024-06-11 12:00:00",
        main: {
            temp: 23
        },
        weather: [
            {
                description: "broken clouds"
            }
        ]
    },
    {
        dt_txt: "2024-06-12 12:00:00",
        main: {
            temp: 21
        },
        weather: [
            {
                description: "shower rain"
            }
        ]
    },
    {
        dt_txt: "2024-06-13 12:00:00",
        main: {
            temp: 22
        },
        weather: [
            {
                description: "rain"
            }
        ]
    }
];
