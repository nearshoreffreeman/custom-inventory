import React, { useContext, useEffect, useState } from 'react'
import CheckBoxFilterComponent from './CheckBoxFilterComponent';
import axios from 'axios';

import { TailSpin } from  'react-loader-spinner';
import Product from '../../../interfaces/Product';
import AppContextInterface from '../../../interfaces/AppContextInterface';
import AppContext from '../../../context/AppContext';
import FilterProductsHelper, { FilterProductsByTags } from '../../../helpers/FilterProductsHelper';

interface Props{
    name:string,   
    term?:string;
    isCat?:boolean;
  
}


interface GenericObjNumber {
    [key: string]: number;
   
} 



const FilterWrapperComponent = ({name, term, isCat}:Props) => {

    const { products,setProducts, itemsToSearch, setItemsToSearch,termsOnSearch, setTermsOnSearch, categories, productsByCats, setProductsByCats}:AppContextInterface = useContext( AppContext );
    const [enable, setEnable]= useState(false);
    const [terms, setTerms] = useState<GenericObjNumber>({});
    const[loaderState, setLoaderState] = useState(false);
    const[selected, setSelected] = useState(false);
    const [termsOnSearchLocal, setTermsOnSearchLocal] = useState([]);
    const [itemsToSearchLocal, setItemsToSearchLocal] = useState([]);
    const[productsOnSearch, setProductsOnSearch] = useState(products);

    const handleOnclick =(e:any)=>{
        setEnable(!enable)
    }
    const handleOnChange =(e:any)=>{
        
      
       

            let termsOnSearchValues: Array<string> = [...termsOnSearch, term];
           
    
            termsOnSearchValues = [...new Set(termsOnSearchValues)];
           
           if(e.target.value){

               setTermsOnSearch(termsOnSearchValues);
           }
    
            
            
            
           
            if(itemsToSearch.includes(e.target.value)){
                console.log("rocking on if wrapper")
                let itemsClean = itemsToSearch.filter(item=> item !== e.target.value );
               
               
                 setItemsToSearch(itemsClean);
               
                 if(itemsClean.length === 0){
                     setItemsToSearch([])
                 }
               
                
               
            }else{
             console.log("rocking on else wrapper")
             setItemsToSearch( [...itemsToSearch, e.target.value]);
           
               
            }
            let itemsToSearchValues =  [...itemsToSearch, e.target.value];

            if(itemsToSearchValues.length > 0){
                let filterVal = [];
              
               filterVal = FilterProductsHelper(productsOnSearch, itemsToSearchValues, termsOnSearchValues,);
                  
             
            setProducts([...filterVal]);
              
           }else{
               setProducts(productsOnSearch);
           }

       
        
    }
    const getData = async()=>{

        if(isCat){
          let  termsGotIt:GenericObjNumber={};
          categories.forEach(itemCat=>{
              let productAmount = 0;
              
              productsOnSearch.forEach(itemProd=>{
               if( itemProd.terms.includes(itemCat)){
                productAmount=  productAmount+1
                   termsGotIt[itemCat] = productAmount
               }
                
              })
          })
          
         
          setTerms(termsGotIt);
         
        }else{
            let  termsGotIt:GenericObjNumber={};
            
             let termsAtt:Array<string> = [];
             productsOnSearch.forEach(itemProd=>{
                 let att = itemProd[term] as string
              termsAtt = [...termsAtt, att];
             })
             termsAtt = [...new Set(termsAtt)]
            
             termsAtt.forEach(itemTerm=>{
                let productAmount:number = 0;
                 productsOnSearch.forEach(itemProd=>{
                     let itemObj = itemProd[term] as string;
                     if(itemTerm){
                         if(itemObj.includes(itemTerm)){
                            productAmount=  productAmount+1
                            termsGotIt[itemTerm] = productAmount
                         }
                     }
                 })
             })
           //  console.log(termsGotIt);
             setTerms(termsGotIt);
             
        }
        // if(!isCat){

        //     const url = `/wp-json/terms/v1/get?term=${name}`
   
        //    try {
        //        setLoaderState(true);
        //        const data = await axios.get(url);
        //        console.log(data.data);
        //        if(data.data.ok){
        //            setTerms(data.data.terms)
        //            setLoaderState(false);
        //        }
        //    } catch (error) {
        //        console.log(error)
        //    }
        // }
        
        
    }

    const mountedStyle = { animation: "inAnimation 500ms ease-in" };
    const unmountedStyle = {
        animation: "outAnimation 500ms ease-out",
        animationFillMode: "forwards"
      };
      useEffect(()=>{
          
        getData();
      },[]);
      useEffect(()=>{
      
            console.log("rocking trebien");
            // if(itemsToSearch.length > 0){
            //      let filterVal = [];
            //     // if(itemsToSearch.length ===1){
                   
            //     //      filterVal = FilterProductsHelper(productsOnSearch, itemsToSearch, termsOnSearch,isCat, productsByCats, setProductsByCats);
            //     // }else{
                    
            //     //      filterVal = FilterProductsHelper(products, itemsToSearch, termsOnSearch,isCat, productsByCats, setProductsByCats );
            //     //     }
            //     filterVal = FilterProductsHelper(productsOnSearch, itemsToSearch, termsOnSearch,isCat, productsByCats, setProductsByCats);
                   
              
            //  setProducts([...filterVal]);
               
            // }else{
            //     setProducts(productsOnSearch);
            // }
       
        
      },[])
    //   useEffect(()=>{
    //       console.log("rocking here on cat")
    //    const  searchOnTerms = products.concat(productsByCats)

    //     const arrayUniqueByKey = [...new Map(searchOnTerms.map(item =>
    //         [item['ID'], item])).values()];
    //         setProducts(arrayUniqueByKey);
    //   },[productsByCats])
  return (
    <>
    
        <div className='casauto-filters-wrapper pl-[0!important] pr-[2rem!important] my-6'>
              {/* {
                  loaderState &&
                  <div className="absolute ml-10">
                      <TailSpin
                          height="100"
                          width="100"
                          color='grey'
                          ariaLabel='loading'
                         
                      />
                  </div>
              }
              {
                  loaderState &&
                  <div className='casauto-grid-backdrop'></div>
              } */}
            <div className='casauto-filter-header cursor-pointer'>
                <h4>{name}</h4>
                <span onClick={handleOnclick}>{
                enable?<i className="fa fa-chevron-up"></i>:<i className='fa fa-chevron-down'></i>}</span>
            </div>
        {
         enable &&   
        <div className='casauto-filter-att-wrapper'  style={enable ? mountedStyle : unmountedStyle}>
            {
              terms &&
                  Object.keys(terms).map((item:string, idx)=>{
                      
                   
                    
                  return  <CheckBoxFilterComponent key={idx} name={item} amount={terms[item]} handleOnchange={handleOnChange} selected={itemsToSearch} />
                  }
                       
                  )
              
            }
        </div>
        }
        </div>
        </>
  )
}

export default FilterWrapperComponent