import axios from "axios";
import { createContext, useContext, useState } from "react";
export let CategoryContext=createContext()
export default function CategoryContextProvider(props){
    let [subCat,setSubCat]=useState(null)
 async   function getCategory(CatName){
        let res=await axios.get(`https://dummyjson.com/products/category/${CatName}`)
        .then((response)=>response)
        .catch((error)=>error)
        console.log(res?.data);
      // if(subCat==null){
        setSubCat(res)
        
      // }
        // console.log(data?.products);
    }
    return <CategoryContext.Provider value={{getCategory,subCat}}>
        {props.children}
    </CategoryContext.Provider>
}