export default async function addStar(selectedTrip, setStarActive){
    try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}addStar`, {
            method:"POST",
            credentials:"include",
            headers: {
                "Content-Type":"application/json",
            }, 
            body: JSON.stringify({
                id: selectedTrip?.id,
            }),
        })
        const data = await response.json()
        if (data?.Error){
            console.error(data?.Error)
        }
        setStarActive(true)
    } catch (error) {
        console.error(error)

}
}
