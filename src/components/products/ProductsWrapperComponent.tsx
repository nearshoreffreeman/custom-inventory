import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AppContext';
import AppContextInterface from '../../interfaces/AppContextInterface';
import ProductGridComponent from './product-grid/ProductGridComponent';

import ProductListComponent from './product-list/ProductListComponent';
import ProductPaginatorComponent from './ProductPaginatorComponent';
import ProductTagBoxComponent from './ProductTagBoxComponent';
import ProductToggleViewComponent from './ProductToggleViewComponent';

const mountedStyle = { animation: "inAnimation 2000ms ease-in" };
const unmountedStyle = {
    animation: "outAnimation 2000ms ease-out",
    animationFillMode: "forwards"
  };
const ProductsWrapperComponent = () => {
 
  

  const { products, itemPerPage, paged, setPaged }:AppContextInterface = useContext( AppContext );
  const [isList, setIsList] = useState(false);
  const [productsOnSearch, setProductsOnSearch] = useState(products)
   
  return (
    <div className='flex flex-col'>
      <ProductTagBoxComponent productsOnSearch={productsOnSearch} />
      <ProductToggleViewComponent isList={isList} setIsList={setIsList} />
      <ProductPaginatorComponent  />
      {
        isList 
          ?
         <div style={isList ? mountedStyle : unmountedStyle}>

           <ProductListComponent   />
         </div>
        
          : 
          <div style={!isList ? mountedStyle : unmountedStyle}> 
            <ProductGridComponent />
            </div>
      }
      <ProductPaginatorComponent />
    </div>
  )
}

export default ProductsWrapperComponent