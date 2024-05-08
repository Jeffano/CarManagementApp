import React, { useEffect } from 'react'
import ListCards from '../components/ListCards';

const PublicLists = () => {
    const [cars, setCars] = React.useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/all-cars")
        .then(response => response.json())
        .then(data => setCars(data))
    }, [])

  return (
    <div>

    </div>
  )
}

export default PublicLists
