import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AppContext';
import FilterProductsHelper, { FilterProductsByTags } from '../../helpers/FilterProductsHelper';
import AppContextInterface from '../../interfaces/AppContextInterface';
import Product from '../../interfaces/Product';

interface Props{
  productsOnSearch:Array<Product>;
}

const ProductTagBoxComponent = ({productsOnSearch}:Props) => {
  const { products,setProducts,  itemsToSearch, setItemsToSearch, categories, termsOnSearch, productsByCats,setProductsByCats}:AppContextInterface = useContext( AppContext ); 
  
  const handleOnClick = (e:any, item:string)=>{
    let tags:Array<string> = [...itemsToSearch, item];
    tags = tags.filter(tagItem=>{
      return tagItem !== item
    })
    tags = [...new Set(tags)];
   console.log(tags)
    setItemsToSearch(tags);
   
    
      if(tags.length > 0){


      let filterVal = [];
       
        filterVal = FilterProductsHelper(productsOnSearch, tags, termsOnSearch, );
      console.log(filterVal)
      setProducts([...filterVal]);
        
      }else{

      console.log(productsOnSearch);
        setProducts(productsOnSearch);
      }
}
// useEffect(()=>{
  
//   if(itemsToSearch.length>0){
//    const filterValues:Array<Product> =   FilterProductsByTags(productsOnSearch,itemsToSearch );
//    setProducts(filterValues);
//   }else{
//       setProducts(productsOnSearch);
//   }
// },[itemsToSearch])
        // useEffect(()=>{
           
        //     let isCat:boolean = false;
        //     let value=    itemsToSearch.find(item=> categories.includes(item));
        //     if(value){
        //       isCat = true;
        //     }

        // if(itemsToSearch.length > 0){

          
        //   let filterVal = [];
        //     // if(itemsToSearch.length ===1){
        //     //       filterVal = FilterProductsHelper(productsOnSearch, itemsToSearch, termsOnSearch,isCat, productsByCats, setProductsByCats, );
        //     // }else{

        //     //       filterVal = FilterProductsHelper(products, itemsToSearch, termsOnSearch,isCat, productsByCats, setProductsByCats, );
        //     // }
        //     filterVal = FilterProductsHelper(productsOnSearch, itemsToSearch, termsOnSearch, productsByCats, setProductsByCats, );
        //   console.log(filterVal)
        //   setProducts([...filterVal]);
            
        // }else{
          
        //   console.log(productsOnSearch);
        //     setProducts(productsOnSearch);
        // }


        // },[itemsToSearch])
        // useEffect(()=>{
        // const  searchOnTerms = products.concat(productsByCats)

        // const arrayUniqueByKey = [...new Map(searchOnTerms.map(item =>
        // [item['ID'], item])).values()];
        // setProducts(arrayUniqueByKey);
        // },[productsByCats])
  return (
    <div className='flex gap-4'>

      {
                  
          itemsToSearch.map((item:string, idx:number)=>(
            <div className='p-2 bg-[#CFDAE9] flex gap-4 items-center justify-center' key={idx}><span>{item}</span> 
                        <i className="fa fa-window-close cursor-pointer" aria-hidden="true" onClick={(e)=>handleOnClick(e,item)}></i> </div>
          ))            
         
      }
    </div>
  )
}

export default ProductTagBoxComponent