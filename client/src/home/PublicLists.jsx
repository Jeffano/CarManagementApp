import React, { useEffect } from 'react'
import ListCards from '../components/ListCards';

const PublicLists = () => {
    const [list, setLists] = React.useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/all-lists")
        .then(response => response.json())
        .then(data => setLists(data))
    }, [])

  return (
    <div>
      <ListCards list/>
    </div>
  )
}

export default PublicLists
