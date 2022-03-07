import Product from "../interfaces/Product"


const FilterProductsHelper = (searchedProducts:Array<Product>, itemsToSearch:Array<string>, 
    termsOnSearch:Array<string>) => {
        let searchOnTerms: Array<Product> = []
      //  console.log(productsByCats);
        
   

        termsOnSearch.forEach(itemTerm => {
           
            if(itemTerm == "make"){
                const result = FilterProductsByTags(searchedProducts, itemsToSearch);
                console.log("rocking filter tag")
                console.log(result)
              //  setProductsByCats(result);
              searchOnTerms = searchOnTerms.concat(result)
            }else{

                let searchResult = searchedProducts.filter(itemS => {
        
                    let valSearch = itemS[itemTerm] as string
        
                    return itemsToSearch.includes(valSearch)
                })
        
                searchOnTerms = searchOnTerms.concat(searchResult)
            }
        })
    
      

  //  searchOnTerms = productsByCats.concat(searchOnTerms)

    let arrayUniqueByKey = [...new Map(searchOnTerms.map(item =>
        [item['ID'], item])).values()];


   //     arrayUniqueByKey=  filterJoin(arrayUniqueByKey, itemsToSearch, isCat,termsOnSearch)
            
      
        // console.log(arrayUniqueByKey)
    return arrayUniqueByKey;
    
     
 }


export const FilterProductsByTags = (searchedProducts:Array<Product>, tagsToSearch:Array<string>)=>{
    let searchOnTerms:Array<Product> = [];
    tagsToSearch.forEach(itemTag =>{
        let searchResult = searchedProducts.filter(itemS=>{
            return itemS.terms.includes(itemTag);
        })
        searchOnTerms = searchOnTerms.concat(searchResult);
    })
    const arrayUniqueByKey = [...new Map(searchOnTerms.map(item =>
        [item['ID'], item])).values()];
      
        
        return arrayUniqueByKey;

}

const filterJoin = (uniqueArray:Array<Product>, itemsToSearch:Array<string>, isCat:boolean, termsOnSearch:Array<string>)=>{
       
        if(itemsToSearch.length ===1){
            return uniqueArray;
        }
        let  itemSearchArray =  [...itemsToSearch]
        let termsOnSearchArray = [...termsOnSearch]
        // if(itemSearchArray.length > 1 &&  termsOnSearchArray.length >1){

        //      itemSearchArray = [...itemsToSearch.shift()]
        //      termsOnSearchArray = [...termsOnSearch.shift()]
        // }
        // console.log(itemSearchArray);
        
     let arrayResult =   uniqueArray.filter(item=>{
            let arrayTrues:Array<boolean> = [];
            
            itemSearchArray.forEach(itemS=>{
             
             //  console.log(termsOnSearchArray)
                   
               termsOnSearchArray.forEach(itemT=>{
                      // console.log(itemT)
                        if(itemT === "make"){
                            let itemTrue= item.terms.includes(itemS);
                            arrayTrues = [...arrayTrues, !!itemTrue];
                        }else{
                            // console.log(item);
                            // console.log(item[itemT]);
                            // console.log()
                           let valSearch:string |number = item[itemT] as string | number;
                            let itemTrue = (valSearch === itemS);
                            arrayTrues = [...arrayTrues, !!itemTrue];
                        }
                    })
                
            }) 
        //  console.log(arrayTrues)
           let isFoundTrue = 0;
           arrayTrues.forEach(item=>{
               if(item){
                isFoundTrue++
               }
           })
         //  console.log(isFoundTrue)
        
         
        //     let isFound = arrayTrues.find(v => v === true);
        //    // console.log(isFound);
            if(isFoundTrue === itemsToSearch.length){
              //  console.log("rocking here")
                return true
            }
            return false

        })
        console.log(arrayResult);
        return arrayResult;
}

export default FilterProductsHelper