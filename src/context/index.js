'use client'
import { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie'

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {

    const [showNavModal, setShowNavModal] = useState(false)
    const [pageLevelLoader, setPageLevelLoader] = useState(false)
    const [componentLevelLoader, setComponentLevelLoader] = useState({ loading: false, id: '' })
    const [isAuthUser, setIsAuthUser] = useState(null)
    const [user, setUser] = useState(null)


    useEffect(() => {
        console.log(Cookies.get('token'))

        if (Cookies.get('token') !== undefined) {
            setIsAuthUser(true)
            const userData = JSON.parse(localStorage.getItem('user')) || {};
            setUser(userData)
        } else {
            setIsAuthUser(false)
        }
    }, [Cookies]

    )



    return <GlobalContext.Provider value={{ showNavModal, setShowNavModal, user, setUser, isAuthUser, setIsAuthUser, pageLevelLoader, setPageLevelLoader, componentLevelLoader, setComponentLevelLoader }}>{children}</GlobalContext.Provider>;

}