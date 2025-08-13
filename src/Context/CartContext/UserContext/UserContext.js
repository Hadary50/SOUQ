import { useState } from "react";
import { createContext } from "react";

export let UserContext=createContext()
export default function UserContextProvider(props){
    let [userToken,setUserToken]=useState(null)
    return <UserContext.Provider value={{userToken,setUserToken}}>
        {props.children}
    </UserContext.Provider>
}