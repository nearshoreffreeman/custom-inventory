import React, { useEffect, useRef, useState } from 'react'
import Product from '../../interfaces/Product'
import FilterWrapperComponent from '../side-bar/filter-attribute/FilterWrapperComponent'
import FilterTagsWrapper from '../side-bar/filter-tags/FilterTagsWrapper'
import FilterByPriceComponent from '../side-bar/FilterByPriceComponent'
import SearchByNameComponent from '../side-bar/SearchByNameComponent'
const clickedStyle = " "
const unClickedStyle = "fixed max-w-xs min-w-[30px]  w-14   md:w-100% h-14  md:h-full rounded-[50%]   top-[50vh] z-10 bg-black opacity-50  md:border-0   transition-all	 group  md:w-full md:bg-white  row-start-1  p-4  md:p-0  md:relative md:opacity-100 md:relative lg:relative"
const childEl = " "
const unClickedEl = "opacity-0";
const SideBarComponent = () => {
  const [fixedState, setFixedState] = useState(false);
 
  
  return (
    <div  className={`absolute ${fixedState ?'w-[80%] ': 'w-0 p-0 border-r-0 border-none'}  h-full rounded-none top-0   bg-white border-r-black  border-r-[1px]  z-10  md:border-0   transition-all	 group md:w-full md:bg-white  row-start-1  p-4  md:p-0  md:opacity-100 md:relative lg:relative`}
     >
                 <div  onClick={()=>setFixedState(!fixedState)} className={`fixed cursor-pointer rounded-[50%] h-[40px] w-[40px]  top-[70vh] ${fixedState ? 'left-[65vw] top-[20vh] bg-white':'bg-black opacity-40'}   md:hidden z-20`}>{!fixedState?<i className="fas fa-arrow-right  text-xl casauto-center "></i>:<i className="fas fa-times  text-xl casauto-center  "></i>} </div>
              
      <div className={`${fixedState? 'opacity-100': 'opacity-0'}  md:opacity-100 md:border-r-0 lg:border-r-0 xl:border-r-0`}>



      <SearchByNameComponent  />
      {/* <FilterTagsWrapper /> */}
      <FilterByPriceComponent />
      <FilterWrapperComponent name="make" term="make" isCat={true} />
      <FilterWrapperComponent name="location"   term={"location"} isCat={false} />    
      
      <FilterWrapperComponent name="fuel-type	"  term={"fuelType"} isCat={false}    />
      <FilterWrapperComponent name="exterior-color"  term={"exteriorColor"}  isCat={false}   />
      </div>
    </div>
  )
}

export default SideBarComponent