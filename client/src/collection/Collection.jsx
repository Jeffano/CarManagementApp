import React from 'react'
import Banner from './Banner'
import SearchCar from './SearchCar'
import AddCar from './AddCar'
import SortCars from './SortCars'

const Collection = () => {
  return (
    <div>
      <Banner/>
      <SearchCar/>
      <AddCar/>
      <SortCars/>
    </div>
  );
}


export default Collection
