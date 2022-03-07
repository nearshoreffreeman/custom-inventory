import React, { useContext, useState } from 'react'
import AppContext from '../../context/AppContext';
import AppContextInterface from '../../interfaces/AppContextInterface';
import Product from '../../interfaces/Product';



const SearchByNameComponent = () => {
  const { products,setProducts}:AppContextInterface = useContext( AppContext );
 
    const [formState, setFormState] = useState('');
    const [productsState, setProductsState] = useState(products);
    
    const handleOnSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
       let productsOnSearch:Array<Product> = productsState.filter(item=>{          
             let itemTitle:string = item.post_title.toLocaleLowerCase();
             let itemToSearch:string = formState.toLocaleLowerCase();
           return itemTitle.includes(itemToSearch);
       })
      console.log(productsOnSearch);
       setProducts(productsOnSearch);
    }
   
  return (
    <form className=' mt-12 md:my-8 ' onSubmit={handleOnSubmit}>
           <i className="fa fa-search  absolute p-3 min-w-[40px] "></i>
        <input 
            type="text" 
            className='appearance-none bg-white casauto-search-box-filter pl-8 py-2' 
            name="search"
            placeholder='Search vehicles...'
            onChange={(e)=>setFormState(e.target.value)}
            value={formState}
             />
        <input  type="submit" className='hidden casauto-search-box-filter-input'  />
    </form>
  )
}

export default SearchByNameComponent