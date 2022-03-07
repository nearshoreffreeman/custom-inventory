import React, {useEffect, useState} from 'react'
import MainComponent from './components/ui/MainComponent'
import SideBarComponent from './components/ui/SideBarComponent';
import Product from './interfaces/Product';
import AppContext from './context/AppContext';
import AppContextInterface from './interfaces/AppContextInterface';




const {Provider} = AppContext;
const App = ({ products, isLogin, user, categories }:AppContextInterface) => {
  const [productsState, setProducts] = useState(products);
  const[page, setPage] = useState(1);
  const[itemsToSearch, setItemsToSearch] = useState([]);
  const [termsOnSearch, setTermsOnSearch] = useState([]);
  const productAmount:number = productsState.length;
  const showingValue: number = (productsState.length < 12) ? products.length : 12;
  const [showingValueState,setShowingValueState] = useState(showingValue);
  const [showingInit, setShowingInit] = useState(1);
  const quotient: number = Math.floor(productAmount/12);
  const remainder: number = productAmount%12;
  const maxPage: number = remainder? quotient+1:quotient;
  const [itemsTagToSearch, setItemsTagSearch] = useState([]);
  const [termsTagOnSearch, setTermsTagOnSearch] = useState([]);
  const [productsByCats, setProductsByCats] = useState([]);
  const contextValue: AppContextInterface  = {
    products:productsState,
    setProducts,
    itemPerPage:12,
    paged:page,
    setPaged: setPage,
    productAmount,
    showingInit,
    setShowingInit,
    showingValue:showingValueState,
    setShowingValue:setShowingValueState,
    quotient,
    remainder,
    maxPage,
    isLogin,
    user,
    itemsToSearch,
    setItemsToSearch,
    termsOnSearch, 
    setTermsOnSearch ,
    categories,
    itemsTagToSearch,
    setItemsTagSearch,
    productsByCats,
    setProductsByCats,
  }
  useEffect(()=>{
    console.log("rocking app")
  }, [productsState])
  
  
  return (
    <Provider value={contextValue}>

    <div className='grid   grid-cols-1 	md:grid-cols-[300px_minmax(900px,_1fr)]   '>
        <SideBarComponent   />
        <MainComponent  />
    </div>
    </Provider>
  )
}

export default App