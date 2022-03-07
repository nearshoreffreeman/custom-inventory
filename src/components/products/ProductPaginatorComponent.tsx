import React, { ReactElement, ReactNode, useContext, useEffect, useRef, useState } from 'react'
import AppContext from '../../context/AppContext';
import AppContextInterface from '../../interfaces/AppContextInterface';



const ProductPaginatorComponent = () => {
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
          maxPage }: AppContextInterface = useContext(AppContext);

  let itemsToRender:Array<number>|null = [];

  for(let i:number = 1; i<= maxPage; i++){
    itemsToRender = [...itemsToRender, i];
  }
  const handlePaged = ( item:number):void=>{
    
     let valueToShow:number = item*itemPerPage;
     console.log(valueToShow);
     if(maxPage === item){
       
      valueToShow =  productAmount
     }
     setShowingValue(valueToShow)
    setPaged(item)
    if (item ===1){
      
      setShowingInit(1);
    }else  if(item === maxPage){
     if(remainder !== 0){

       setShowingInit(productAmount-remainder)
     }else{
      setShowingInit(productAmount-itemPerPage)
     }

    }else{
      
      setShowingInit(valueToShow+1 - itemPerPage);    
    }
  }
  useEffect(()=>{
    console.log("rocking paginator")
  }, [products])

  
  return (
    <div className='flex flex-col mb-8 my-8'>
      
      <div className='flex'>
      {
      (productAmount >= itemPerPage) &&
      <div className='flex'>
        <span>Showing {showingInit}-{showingValue} of {productAmount}</span>
      </div>
      }
      {
        itemsToRender.length > 0 &&
      <div className='flex ml-auto gap-x-4'>
            {

              (paged !== 1 ) &&
              <div className='cursor-pointer text-black h-10 w-10 flex items-center justify-center bg-zinc-200' onClick={() => { setPaged(1); setShowingValue(12); setShowingInit(1) }}><i className="fa fa-angle-left" aria-hidden="true"></i></div>
            }
        {
          itemsToRender.map((item, idx)=>{
            
            if(maxPage < 10){
              return (
                (productAmount >= itemPerPage) &&
                <div className='cursor-pointer' key={idx} onClick={()=>handlePaged( item)}>{item}</div>
              )
            }
            
            else if((   idx+1 == paged+3 || idx+1 == paged+4 || idx+1 == paged+5) && ( idx+1 !== maxPage|| idx+1 !== maxPage-1)  ){
              
              return <span key={idx}>.</span>
            }
        
           
            else if(idx+1 < paged+6){
              
              return <div className={`cursor-pointer text-white h-10 w-10 flex items-center justify-center ${(paged=== idx+1)? 'bg-main-dark' :'bg-zinc-200'}`}  key={idx} onClick={()=>handlePaged(item)}>{item}</div>
            }
           
            
            
          })
        }
            {

              (paged !== maxPage ) &&
              <div className='cursor-pointer text-black h-10 w-10 flex items-center justify-center bg-zinc-200' onClick={()=>{setPaged(maxPage); setShowingValue(productAmount); setShowingInit(productAmount-remainder)}}><i className="fa fa-angle-right" aria-hidden="true"></i></div>
            }
      </div>
      }
    </div>
    </div>
    
  )
}

export default ProductPaginatorComponent