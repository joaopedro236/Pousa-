import { useState } from "react";

export default async function  getUser(setUserData, setStarTrip, setTripHistory) {
    try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}/getUser`,{
            credentials:"include",
        })
        const data = await response.json()
        if (data?.image_url){
            await new Promise((resolve) =>{
                const img = new Image()
                img.onload = resolve
                img.onerror = resolve
                img.src = data.image_url
            })
        }
        setUserData(data)
        setStarTrip(data?.favoriteTrips ||[])
        setTripHistory(data?.tripsAlreadyPurchased)
        return data
    }catch(error){
        console.error(error)
        return null
    }
}