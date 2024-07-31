import React, { useEffect } from 'react'
import SingleCar from './CarCard'

const CarLists = () => {
    const [cars, setCars] = React.useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/all-cars")
        .then(response => response.json())
        .then(data => setCars(data))
    }, [])

  return (
    <div>
      <SingleCar cars = {cars} headline="CARS"/>
    </div>
  )
}

export default CarLists
