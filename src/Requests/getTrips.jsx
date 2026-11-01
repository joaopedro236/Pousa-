export default async function getTrips(setJson){
    try{
        const tripsResponse = await fetch(
            `${import.meta.env.VITE_API_URL}/getTrips`
        )
        const tripsData = await tripsResponse.json()
        setJson({
            trips:tripsData?.trips || []
        })
    }catch(error){
        console.error()
    }
}