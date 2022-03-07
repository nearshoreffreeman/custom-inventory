import React, { useState } from 'react'
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
const ProductGridBoxComponent = ({product, isLogin, user}:Props) => {
  

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
      //  console.log(dataAdd);
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
       // console.log(dataAdd);
        setProductState({...productState, wishlist:false });
        setLoaderState(false);
      } catch (error) {
        console.log(error)
      }
    }
 }
  return (
    <div className='flex flex-col bg-white casauto-filter-car-box' >
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
      <picture>{
        product.imgUrl ?
        <img className='w-full h-[50vw] md:h-[15vw] object-cover' src={product.imgUrl} />
        :
        ''
        }

        {
          (product.terms.includes('On Demand'))?
            <span className='absolute top-0 left-0 max-w-[140px] bg-[#5120AA] text-white uppercase px-2 py-0'>On Demand</span> :
            (product.terms.includes('New')) ?
              <span className='absolute top-0 left-0 max-w-[140px] bg-[#00A650] text-white uppercase px-2 py-0'>New Arrival</span> :
              ''
        }
        {
          isLogin &&
          <div onClick={handleWishList} className={`cursor-pointer bg-white text-[#cccccc]  casauto-wishlist casauto-add-to-wishlist ${productState.wishlist ? 'active':''}`}  title={`${product.wishlist ? 'Remove': 'Add'} Remove from Wish List`} >
            <i className="fas fa-heart"></i>
          </div>
        }

      </picture>
      <div className='grid grid-cols-1  p-6 min-h-[320px] max-h-[320px]'>
        {
          product.post_title ? <h3 >{product.post_title}</h3>: ''
        }
        {
          product.trim ? <span className='inline-block mt-[-20px]'>{product.trim}</span>:''
        }
        {
          isLogin
            ?
            product.price && <span className='inline-block mt-6'>{formatter.format(parseInt(product.price))}</span>
            :
            <span><span className='font-semibold'>$</span> <a className='text-[#0086E1] underline' href='/sign-in'>Login</a> or <a className='text-[#0086E1] underline' href='/sign-up'>Create a free Account</a> for Pricing</span>
        }
        <div className='mt-8 border-t-[1px] border-t-[#999] border-solid flex px-2 py-4'>
          <h5 className='text-[#8a8a8a]'>Worldwide Delivery</h5>
          {
            isLogin
              ?
              <a className='ml-auto uppercase text-[#0086E1]' href={`/inventory/${product.slug}`}>view</a>
              :
              <a className='ml-auto uppercase text-[#8a8a8a] '  href='/sign-in'>login</a>
          }
        </div>
      </div>
    </div>
  )
}

export default ProductGridBoxComponent

