import React, { useState } from 'react'

interface Props{
    name:string;
    amount:number;    
    handleOnchange?: (e:any)=>void;
    selected:Array<string>;
}

const CheckBoxFilterComponent = ({name,amount,handleOnchange, selected }:Props) => {
  console.log(selected)
  const isSelected =()=>{
    return selected.includes(name);
  }
  return (
    <div className='casauto-filter-radio-item'>    
    <input type="checkbox" id={name} name={name} value={name} checked={isSelected()} onChange={handleOnchange}/>
    <label htmlFor={name} >{name} </label>
    <span>{amount}</span>
    </div>
  )
}

export default CheckBoxFilterComponent