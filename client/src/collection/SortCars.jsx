import React from 'react';
import { FaSort } from "react-icons/fa";

const SortCars = () => {
    return (
        <div className="sortBox">
            <button className="sortButton">
                <FaSort />
            </button>
        </div>
    );
}

export default SortCars;