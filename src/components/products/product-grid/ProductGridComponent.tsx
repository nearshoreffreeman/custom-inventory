import React, {useContext, useEffect, useState} from 'react'
import AppContext from '../../../context/AppContext';
import AppContextInterface from '../../../interfaces/AppContextInterface';
import Product from '../../../interfaces/Product';
import ProductGridBoxComponent from './ProductGridBoxComponent';

const ProductGridComponent = () => {
  const { products, 
    itemPerPage,
    paged,
    setPaged,
    productAmount,
    showingInit,
    setShowingInit,
    showingValue,
    setShowingValue, 
    quotient, 
    remainder, 
    maxPage,
    isLogin,
    user
  }: AppContextInterface = useContext(AppContext);



    const [productsToGrid, setProductsToGrid] = useState([]);
    useEffect(()=>{
        const productsValue:Array<Product> = products.filter((item, idx)=>{
            if(idx +1  >= showingInit && idx+1 <= showingValue){
              return item
            }
        })
      //  console.log(productsValue);
        setProductsToGrid(productsValue);
        
    },[paged, products])
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 '>
      {
        productsToGrid.map(item=>(
          <div key={item.ID}><ProductGridBoxComponent product={item} isLogin={isLogin} user={user} /></div>
        ))
      }
    </div>
  )
}

export default ProductGridComponent