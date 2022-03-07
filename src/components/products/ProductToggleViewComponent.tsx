import React from 'react'


interface Props {
    isList:boolean;
    setIsList: (value:boolean)=>void;

  }

const ProductToggleViewComponent = ({isList, setIsList}:Props) => {
  return (
      <div className='flex justify-end mr-8 '>
          <div className='casauto-list-grid-btn flex justify-center items-center cursor-pointer'onClick={()=>setIsList(false)} >
              <i className="fa fa-th"></i>
          </div>
          <div className='casauto-list-grid-btn flex justify-center items-center cursor-pointer ml-1' onClick={()=>setIsList(true)}>
              <i className="fa fa-bars"></i>
          </div>
      </div>
  )
}

export default ProductToggleViewComponent