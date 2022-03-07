import React, { useContext } from 'react'


import ProductsWrapperComponent from '../products/ProductsWrapperComponent';

const MainComponent = () => {
  
  return (
    <div className='flex flex-col my-8 row-start-1 p-4 md:p-0   '>
      <h1>Inventory</h1>
      <ProductsWrapperComponent />
    </div>
  )
}

export default MainComponent;