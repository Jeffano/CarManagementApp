import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../authentication/AuthProvider';
import Banner from './Banner';
import SearchCar from './SearchCar';
import AddCar from './AddCar';
import SortCars from './SortCars';
import CarCard from '../components/CarCard';

const Collection = () => {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      if (user) {
        try {
          const response = await fetch(`http://localhost:3000/cars/${user.email}`);
          const data = await response.json();
          setCars(data);
        } catch (error) {
          console.error('Error fetching cars:', error);
        }
      }
    };

    fetchCars();
  }, [user]);

  return (
    <div>
      <Banner />
      <SearchCar />
      <AddCar />
      <SortCars />
      <div className="collection-container">
        {cars.map(car => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </div>
  );
}

export default Collection;
