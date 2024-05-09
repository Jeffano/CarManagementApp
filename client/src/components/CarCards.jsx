import React, { useEffect } from 'react'

const CarLists = () => {
    const [cars, setCars] = React.useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/all-cars")
        .then(response => response.json())
        .then(data => setCars(data))
    }, [])

  return (
    <div>
      Hello
    </div>
  )
}

export default CarLists
