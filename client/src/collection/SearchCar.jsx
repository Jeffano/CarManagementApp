import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './collection.css';

const SearchCar = () => {

    return (
        <div className="searchBox">
            <input className="searchInput" type="text" name="" placeholder="Search"/>
            <button className="searchButton" href="#">
                <FaSearch />
            </button>
        </div>
    );
};

export default SearchCar;
