import React, { useEffect, useContext } from 'react'
import { AuthContext } from '../authentication/AuthProvider';


const PublicLists = () => {
    const [list, setLists] = React.useState([]);
    const { user } = useContext(AuthContext);

    const handleButtonClick = () => {
      if (user) {
        console.log(`User email: ${user.email}`);
      } else {
        console.log('Not signed in');
      }
    };

    
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
        <button 
          onClick={handleButtonClick} 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Check User Status
        </button>
      </div>
    </div>
  )
}

export default PublicLists
