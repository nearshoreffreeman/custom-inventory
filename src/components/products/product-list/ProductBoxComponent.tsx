import React, { useEffect, useState } from 'react'
import Product from '../../../interfaces/Product'
import UserInterface from '../../../interfaces/UserInterface';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { TailSpin } from  'react-loader-spinner'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

 interface Props {
  product?: Product;
  isLogin?: Boolean;
  user?:UserInterface;
}

const ProductBoxComponent = ({product, isLogin, user}:Props) => {

  const [productState, setProductState] = useState<Product>(product);
  const [loaderState, setLoaderState]= useState<Boolean>(false)
  
const handleWishList = async()=>{
   setLoaderState(true);
   let headers = new Headers();
    headers.append("Content-Type", "application/json");
   if(!productState.wishlist){
     let raw = JSON.stringify({
       "pid": product.ID,
       "email": user.user_email,
       "variation_id": 0
     });
     let requestOptions:RequestInit = {
       method: 'POST',
       headers: headers,
       body: raw,
       redirect: 'follow'
     }
     try {
       
       const resAdd = await fetch('/wp-json/wishlist/v1/add', requestOptions);
       const dataAdd = await resAdd.text();
       console.log(dataAdd);
       setProductState({...productState, wishlist:true });
       setLoaderState(false);
     } catch (error) {
       console.log(error)
     }
   }else{
     let raw = JSON.stringify({
       "pid": product.ID,
       "email": user.user_email,
       "variation_id": 0
     });
     let requestOptions:RequestInit = {
       method: 'POST',
       headers: headers,
       body: raw,
       redirect: 'follow'
     }
     try {
       
       const resAdd = await fetch('/wp-json/wishlist/v1/remove', requestOptions);
       const dataAdd = await resAdd.text();
       console.log(dataAdd);
       setProductState({...productState, wishlist:false });
       setLoaderState(false);
     } catch (error) {
       console.log(error)
     }
   }
}
  
  return (
    <div className='grid grid-cols-[200px_auto_auto_auto_auto] casauto-filter-car-box shadow-[10px_10Array<Product>px_0px_rgb(245_245_245)]'>
       {
        loaderState &&
        <TailSpin
        height="100"
        width="100"
        color='grey'
        ariaLabel='loading'
      />
      }
      {
        loaderState &&
        <div className='casauto-grid-backdrop'></div>
      }
      <picture>
        <img className='w-full h-[10vw] object-cover' src={product.imgUrl} />

        {
         (product.terms.includes('On Demand')) ?
            <span className='absolute top-0 left-0 max-w-[140px] bg-[#5120AA] text-white uppercase px-2 py-0'>On Demand</span> :
            (product.terms.includes('New')) ?
              <span className='absolute top-0 left-0 max-w-[140px] bg-[#00A650] text-white uppercase px-2 py-0'>new arrival</span> :
              ''
        }
        {
          isLogin &&
          <div onClick={handleWishList} className={`cursor-pointer bg-white text-[#cccccc]  casauto-wishlist casauto-add-to-wishlist ${productState.wishlist ? 'active':''} left-36 top-[5px]`}  title={`${product.wishlist ? 'Remove': 'Add'} Remove from Wish List`} >
            <i className="fas fa-heart"></i>
          </div>
        }

      </picture>
      <div className='flex flex-col justify-center items-start ml-2'>
        {
          product.sku && <span>{product.sku}</span>
        }
        {
          product.post_title && <h3 >{product.post_title}</h3>
        }
        

      </div>
      <div className='flex flex-col justify-center items-start ml-2'>

        {
          isLogin
            ?
            product.price && <span className='inline-block mt-6'>{formatter.format(parseInt(product.price))}</span>
            :
            <span><span className='font-semibold'>$</span> <a className='text-[#0086E1] underline' href='/sign-in'>Login</a> or <a className='text-[#0086E1] underline' href='/sign-up'>Create a free Account</a> for Pricing</span>
        }
      </div>
      <div className='flex flex-col justify-center items-start  ml-2'>
        <span>{`Location ${product.location && product.location}`}</span>
        <span>{`Fuel Type ${product.fuelType && product.fuelType}`}</span>
      </div>
      <div className='flex flex-col justify-center items-start  ml-2'>

          <h5 className='text-[#8a8a8a]'>Worldwide Delivery</h5>
          {
            isLogin
              ?
              <a className='uppercase text-[#0086E1]' href={`/inventory/${product.slug}`}>view</a>
              :
              <a className='uppercase text-[#8a8a8a] '  href='/sign-in'>login</a>
          }
      </div>
      
    </div>
  )
}

export default ProductBoxComponent