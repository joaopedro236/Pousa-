export default async function metricsTrips(setJson ){
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/metrics`,{
            credentials:"include",
        })
        const data= await response.json()
        if (data?.Error) {
            console.error(data?.Error)
        }
        setJson(data)
    } catch(error) {
        console.error(error)
    }
}