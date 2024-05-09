import React from 'react';
import './list.css';

const SearchList = () => {
    return (
        <div className="search-container">
            <div>
                <input type="search" name="search" id="search" placeholder='Search List' className='search-input' />
                <button className="search-button">SEARCH</button>
            </div>
        </div>
    );
}

export default SearchList;
