export default async function removeStar(selectedTrip,setStarActive){
    try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}/removeStar`,{
            method: "POST",
            credentials:"include",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: selectedTrip?.id,
            })
    })
        const data = await response.json()
        if (data?.Error){
            console.error(data?.Error)
        }
        setStarActive(false)
    }catch(error){
        console.error(error)
    }
}