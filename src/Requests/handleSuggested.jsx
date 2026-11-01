export default async function suggestedDescription(dataFormHS,setDescription){
    try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}/suggestedDescription`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify(dataFormHS),
        })
        const data = await response.json()
        if (data?.Error){
            console.error(data?.Error)
        }
        setDescription(data?.Response)
    }catch(error){
        console.error(error)
    }
}