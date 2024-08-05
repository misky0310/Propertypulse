"use client";

import { useSession } from "next-auth/react";
import { useContext,createContext,useState, useEffect } from "react";

const GlobalContext = createContext();

export const GlobalContextProvider=({children}) => {
    const [unreadCount, setUnreadCount] = useState(0);

    const {data:session}=useSession();

    useEffect(() => {
        if(session && session.user){
            fetch('/api/messages/unreadCount')
            .then(res=>res.json())
            .then(data=>{
                setUnreadCount(data);
            })
        }
    },[session])

    return(
        <GlobalContext.Provider value={{
            unreadCount,
            setUnreadCount
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}