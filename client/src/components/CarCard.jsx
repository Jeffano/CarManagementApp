import React from 'react';
import './CarCard.css'; // Import the CSS for styling

const CarCard = ({ car }) => {
  return (
    <div className="card">
      <div className="card2">
        <h3 className="make-model">{car.make} {car.model}</h3>
        <p>Year: <span>{car.year}</span></p>
        <p>Brand: <span>{car.brand}</span></p>
        <p>Size: <span>{car.size}</span></p>
        <p>Color: <span>{car.color}</span></p>
        {car.additionalDetails && (
          <div className="additional-details">
            <p>Additional Details: {car.additionalDetails}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarCard;
