// src/components/AddCarModal.jsx
import React from 'react';
import './collection.css'; // Import the CSS file for the modal

const AddCarModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-black">
                        Add New Car
                    </h3>
                    <button type="button" className="close-button" onClick={onClose}>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <form className="modal-body">
                    <div className="grid gap-4 mb-4 grid-cols-2">
                        <div className="col-span-2">
                            <label htmlFor="make" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Make</label>
                            <input type="text" name="make" id="make" className="inputField" placeholder="Make" required />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="model" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Model</label>
                            <input type="text" name="model" id="model" className="inputField" placeholder="Model" required />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Year</label>
                            <input type="number" name="year" id="year" className="inputField" placeholder="Year" required />
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
                            <input type="text" name="brand" id="brand" className="inputField" placeholder="Brand" required />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Size</label>
                            <input type="text" name="size" id="size" className="inputField" placeholder="Size" />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="color" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Color</label>
                            <input type="text" name="color" id="color" className="inputField" placeholder="Color" />
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="additionalDetails" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Additional Information</label>
                            <textarea id="additionalDetails" name="additionalDetails" rows="4" className="inputField" placeholder="Additional Information"></textarea>
                        </div>
                    </div>
                    <button type="submit" className="submitButton">
                        Add New Car
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddCarModal;
