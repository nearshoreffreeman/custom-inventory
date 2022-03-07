import React, { useContext, useState } from 'react';
import InputRange from 'react-input-range';
import AppContext from '../../context/AppContext';
import  { formatter } from '../../helpers/NumberHelpers';
import AppContextInterface from '../../interfaces/AppContextInterface';
import Product from '../../interfaces/Product';

  

const FilterByPriceComponent = () => {
    const { products,setProducts}:AppContextInterface = useContext( AppContext );
    const [formState, setFormState] = useState<Range|number|any>(3800);
    const[minPrice, setMinPrice] = useState<Range|number|any>(3800);
    const [productsState, setProductsState] = useState(products);
   
    const  handleOnSubmit =(e:any)=>{
        e.preventDefault();
        let productsOnSearch:Array<Product> = productsState.filter(item=>{
            return (parseInt(item.price)   >= minPrice && parseInt(item.price)  <= formState)
        })
        setProducts(productsOnSearch);
    }
  return (
    <form className='flex flex-col my-8 pr-8' onSubmit={handleOnSubmit}>
          
        <input 
            type="range" 
            className=' py-2' 
            name="price"
            min={minPrice}
            max={120000}
            onChange={(e)=>setFormState(parseInt(e.target.value))}
            value={formState}
             />

          {/* <InputRange
              step={2}
              value={formState}
              onChange={(val:)=>setFormState(val)} /> */}
        <button className='mt-2 bg-[#002864] text-white'  type="submit"   >Filter</button>
        <span className='px-4'>{`Price: ${formatter.format(minPrice)}-${formatter.format(formState)}`}</span>
    </form>
  )
}

export default FilterByPriceComponent