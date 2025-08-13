import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Children, createContext } from "react";
let userTokenEncode=localStorage.getItem('userToken')
let userTokenDecode=jwtDecode(userTokenEncode)
let userId=userTokenDecode.id
export let CartContext=createContext()
 
export default function CartContextProvider(props){
    function AddCart(productId){
        return axios.post(`https://dummyjson.com/carts/add`,
            {
                userId:userId,
                products:[
                    {
                        productId:productId,
                        quantitiy:1
                    }
                ]
            }
        )
        .then((response)=>response)
        // .catch((error)=>error('try again'))
    }
    function getLoggedCart(){
        return axios.get(`https://dummyjson.com/carts`)
        .then((response)=>response)
        .catch((error)=>error)
    }
    return <CartContext.Provider value={{AddCart,getLoggedCart}}>
{props.children}
    </CartContext.Provider>
}