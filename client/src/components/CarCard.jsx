import React from 'react';
import '../collection/collection.css'; // Import the CSS for styling

const CarCard = ({ car }) => {
  return (
    <div className="card">
      <div className="card2">
        <h3>{car.make} {car.model}</h3>
        <p>Year: {car.year}</p>
        <p>Brand: {car.brand}</p>
        <p>Size: {car.size}</p>
        <p>Color: {car.color}</p>
        <p>Additional Details: {car.additionalDetails}</p>
      </div>
    </div>
  );
};

export default CarCard;
