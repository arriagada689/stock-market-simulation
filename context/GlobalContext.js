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

    const authUser = (data) => {
        localStorage.setItem('userInfo', JSON.stringify(data))
        setIsLoggedIn(true);
        setUserData(data);
    }

    const logoutUser = () => {
        localStorage.removeItem('userInfo');
        setIsLoggedIn(false);
        setUserData({});
    };

    return (
        <GlobalContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            userData,
            setUserData,
            authUser,
            logoutUser
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export function useGlobalContext() {
    return useContext(GlobalContext)
}