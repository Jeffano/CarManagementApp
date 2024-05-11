import React, { useEffect } from 'react'

const PublicLists = () => {
    const [list, setLists] = React.useState([]);
    /*

    useEffect(() => {
        fetch("http://localhost:3000/all-lists")
        .then(response => response.json())
        .then(data => setLists(data))
    }, [])
    */

  return (
    <div className="px-4 lg:px-24 items-center" style={{ backgroundColor: '#374151' }}>
      <div>
        <h2 className='text-5xl font-bold leading-snug' style={{ color: '#92d5e6' }}>
          Public Lists
        </h2>
      </div>

    </div>
  )
}

export default PublicLists
