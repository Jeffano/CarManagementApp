import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import './collection.css'; // Import the CSS file for the modal

import Papa from 'papaparse';

// Function to parse the CSV file
const parseCSV = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      complete: (results) => resolve(results.data),
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      error: (error) => reject(error),
    });
  });
};


const AddCarModal = ({ isOpen, onClose, userEmail }) => {
    const initialFormData = {
        make: '',
        model: '',
        year: '',
        brand: '',
        size: '',
        color: '',
        additionalDetails: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false); // State for alert

    useEffect(() => {
        // Reset alert visibility when modal opens/closes
        if (!isOpen) {
            setShowSuccessAlert(false);
        }
    }, [isOpen]);

    useEffect(() => {
        let timeout;
        if (showSuccessAlert) {
            timeout = setTimeout(() => {
                setShowSuccessAlert(false);
            }, 5000); // Hide alert after 5 seconds
        }
        return () => clearTimeout(timeout); // Clean up the timeout on unmount
    }, [showSuccessAlert]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/add-car', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    ownerId: userEmail
                })
            });
            const result = await response.json();
            console.log(result);
            if (response.ok) {
                // Handle success: clear fields, show alert, and close modal
                setFormData(initialFormData); // Reset the form
                setShowSuccessAlert(true); // Show success alert
                onClose(); // Close the modal after success
            } else {
                console.error('Failed to add car:', result.error);
                // Handle server-side validation errors
            }
        } catch (error) {
            console.error('Error adding car:', error);
            // Handle client-side errors
        }
    };

    return (
        <>
            {showSuccessAlert && (
                <div className="alert-container">
                    <Alert severity="success" onClose={() => setShowSuccessAlert(false)}>
                        <AlertTitle>Success</AlertTitle>
                        Car Has Been Added!
                    </Alert>
                </div>
            )}

            {isOpen && (
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
                        <form className="modal-body" onSubmit={handleSubmit}>
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label htmlFor="make" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Make</label>
                                    <input type="text" name="make" id="make" className="inputField" placeholder="Make" value={formData.make} onChange={handleChange} required />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="model" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Model</label>
                                    <input type="text" name="model" id="model" className="inputField" placeholder="Model" value={formData.model} onChange={handleChange} required />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Year</label>
                                    <input type="number" name="year" id="year" className="inputField" placeholder="Year" value={formData.year} onChange={handleChange} required />
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
                                    <input type="text" name="brand" id="brand" className="inputField" placeholder="Brand" value={formData.brand} onChange={handleChange} required />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Size</label>
                                    <input type="text" name="size" id="size" className="inputField" placeholder="Size" value={formData.size} onChange={handleChange} />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="color" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Color</label>
                                    <input type="text" name="color" id="color" className="inputField" placeholder="Color" value={formData.color} onChange={handleChange} />
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="additionalDetails" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Additional Information</label>
                                    <textarea id="additionalDetails" name="additionalDetails" rows="4" className="inputField" placeholder="Additional Information" value={formData.additionalDetails} onChange={handleChange}></textarea>
                                </div>
                            </div>
                            <button type="submit" className="submitButton">
                                Add New Car
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddCarModal;
