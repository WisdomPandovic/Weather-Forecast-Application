import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import axios from 'axios';

const SearchBar = ({ onSearch }) => {
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (input.length > 2) {
            const fetchSuggestions = async () => {
                try {
                    const response = await axios.get(
                        `https://api.openweathermap.org/data/2.5/find?q=${input}&type=like&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
                    );
                    setSuggestions(response.data.list.map(city => city.name));
                } catch (error) {
                    console.error('Error fetching city suggestions', error);
                }
            };

            fetchSuggestions();
        } else {
            setSuggestions([]);
        }
    }, [input]);

    const handleSearch = () => {
        onSearch(input);
        setInput('');
        setSuggestions([]);
    };

    const handleSuggestionClick = (suggestion) => {
        setInput(suggestion);
        setSuggestions([]);
        onSearch(suggestion);
    };

    return (
        <div className="input-group pt-5 mb-3">
            <input
                type="text"
                className="form-control search-input border-0"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search for a City..."
            />
            <button className="btn btn-dull-gray" onClick={handleSearch}>
                <FiSearch className='search-icon' />
            </button>
            {suggestions.length > 0 && (
                <ul className="list-group position-absolute w-100 mb-3">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className="list-group-item list-group-item-action"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
