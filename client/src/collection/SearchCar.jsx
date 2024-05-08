import React from 'react';
import './button.css'; // Import the CSS file
import './search-field.css'; // Import the CSS file
import './search-car.css'; // Import CSS file for styling the container

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
