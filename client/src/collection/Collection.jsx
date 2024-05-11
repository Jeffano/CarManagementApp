import React from 'react'
import Banner from './Banner'
import SearchCar from './SearchCar'
import AllCars from '../components/AllCars'
import MyCars from './MyCars'


const Collection = () => {
  return (
    <div>
      <Banner/>
      <SearchCar/>
      <MyCars/>
      <AllCars/>

    </div>
  );
}


export default Collection
