import { useState } from "react"
export default async function checkUser(setUser, setBanInfo) {
    try{
        const response = await fetch (
            `${import.meta.env.VITE_API_URL}/checkUser`,
            {
                credentials:"include"
            }
        )
        const data = await response.json()
        setUser(data.authenticated)
        setBanInfo(data.Error === "Ban Detected" ? data: null)
        return data
    }catch(error){
        console.error(error)
        setUser(false)
        setBanInfo(null)
        return null
    }
}