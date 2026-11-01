export default async function createComment(selectedTrip,message, note){
    try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}/createComment`,{
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            credentials:"include",
            body: JSON.stringify({
                tripId: selectedTrip?.id,
                comment:message,
                note: Number(note)
            })
        })
        const data = response.json()
        if(data?.Error) {
            console.error(data?.Error)
        }
    }catch(error){
        console.error(error)
    }
}