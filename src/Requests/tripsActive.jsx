export default async function tripsActiveRequisition(setSelectedTrip, setNotFound){
    try{
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/getTrips`,
        )
        const data = response.json()
        const trip = data?.trips?.find(
            (trip) => String(trip.id) === String(tripId),
        )
        if (trip) {
            setSelectedTrip(trip)
        }else{
            setNotFound(true)
        }
    }catch(error){
        console.error(error)
    }
}