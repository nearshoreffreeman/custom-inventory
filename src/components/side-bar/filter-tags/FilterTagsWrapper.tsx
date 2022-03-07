import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../../context/AppContext';
import { FilterProductsByTags } from '../../../helpers/FilterProductsHelper';
import AppContextInterface from '../../../interfaces/AppContextInterface';
import Product from '../../../interfaces/Product';

const FilterTagsWrapper = () => {
    const { products,setProducts, itemsTagToSearch, setItemsTagSearch, categories}:AppContextInterface = useContext( AppContext ); 
    const[productsOnSearch, setProductsOnSearch] = useState(products);
    const handleOnClick = (e:any, item:string)=>{
        let tags:Array<string> = [...itemsTagToSearch, item];
        tags = [...new Set(tags)];
        setItemsTagSearch(tags);
    }
    useEffect(()=>{
        if(itemsTagToSearch.length>0){
         const filterValues:Array<Product> =   FilterProductsByTags(productsOnSearch,itemsTagToSearch );
         setProducts(filterValues);
        }else{
            setProducts(productsOnSearch);
        }
    },[itemsTagToSearch])
  return (
    <div className='flex flex-col p-8'>
        <h3 className='border-b border-b-black py-4'>Filter By</h3>
        {
            categories.map((cat, idx)=>(

                <span className='cursor-pointer ' key={idx} onClick={(e)=>handleOnClick(e,cat)} >{cat}</span>
            ))
        }
    </div>
  )
}

export default FilterTagsWrapper