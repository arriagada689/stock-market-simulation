'use client'
import { createContext, useContext, useState, useEffect } from "react"

const GlobalContext = createContext()

export function GlobalProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userData, setUserData] = useState({})

    useEffect(() => {
        const storedUserData = localStorage.getItem('userInfo');

        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
            setIsLoggedIn(true);
        }
    }, [])

    return (
        <GlobalContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            userData,
            setUserData
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export function useGlobalContext() {
    return useContext(GlobalContext)
}