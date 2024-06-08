// src/components/SearchBar.js
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch }) => {
    const [input, setInput] = useState('');

    const handleSearch = () => {
        onSearch(input);
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
                <FaSearch className='search-icon'/> {/* Render the search icon */}
            </button>
        </div>
    );
};

export default SearchBar;
