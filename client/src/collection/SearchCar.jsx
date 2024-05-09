import React from 'react';
import './collection.css';

const SearchCar = () => {
    return (
        <div className="search-container">
            <div>
                <input type="search" name="search" id="search" placeholder='Search Car' className='search-input' />
                <button className="search-button">SEARCH</button>
            </div>
        </div>
    );
}

export default SearchCar;
