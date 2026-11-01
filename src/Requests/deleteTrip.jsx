
export default async function deleteTrip(json, currentIndex){
    try{
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/deleteTrip`,
            {
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({
                    id: json?.trip[currentIndex]?.id,
                }),
            }   
        )
        const data = await response.json()
        if (data?.Error) {
            console.error(data?.Error)
        }
    }catch(error){
        console.error(error)
    }
}