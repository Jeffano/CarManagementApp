import React, { useEffect } from 'react'

const PublicLists = () => {
    const [list, setLists] = React.useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/all-lists")
        .then(response => response.json())
        .then(data => setLists(data))
    }, [])

  return (
    <div>
      Hello
    </div>
  )
}

export default PublicLists
