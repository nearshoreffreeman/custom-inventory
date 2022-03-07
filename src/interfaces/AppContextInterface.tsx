import Product from "./Product";
import UserInterface from "./UserInterface";

interface AppContextInterface {
    products?: Array<Product>;
    setProducts?:( products: Array<Product> ) => void;
    productsByCats?: Array<Product>;
    setProductsByCats?:( products: Array<Product> ) => void;
    itemPerPage?:number;
    paged?:number;
    setPaged?:(page:number)=>void;
    productAmount?:number;
    showingInit?:number;
    setShowingInit?:(value:number)=>void;
    showingValue?:number;
    setShowingValue?:(value:number)=>void;
    quotient?:number;
    remainder?:number;
    maxPage?:number;
    isLogin?:boolean,
    user?:UserInterface,
    itemsToSearch?:Array<string>,
    setItemsToSearch?:(value:Array<string>)=>void;
    termsOnSearch?:Array<string>,
    setTermsOnSearch?:(value:Array<string>)=>void;
    categories?:Array<string>;
    itemsTagToSearch?:Array<string>;
    setItemsTagSearch?:(value:Array<string>)=>void;
    termsTagOnSearch?:Array<string>;
    setTermsTagOnSearch?:(value:Array<string>)=>void;

  }
  

  export default AppContextInterface;