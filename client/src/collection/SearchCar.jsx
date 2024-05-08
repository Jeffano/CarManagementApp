import React from 'react'
import './button.css'; // Import the CSS file
import './search-field.css'; // Import the CSS file

const SearchCar = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="flex gap-4">
                <input type="search" name="search" id="search" placeholder='Search Car' className='search-input' />
                <button className="search-button">SEARCH</button>
            </div>
        </div>
    )
}

export default SearchCar
