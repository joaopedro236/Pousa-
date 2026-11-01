
export default async function sendMessage(e, setMessage, setMessages, setLoading, message, userData, selectedTrip, quantityMessage, setQuantityMessage, messages){
    e.preventDefault()
    try{
        setMessages(prev => [...prev, { role: "user", content: message.trim() }])
        setMessage("")
        setLoading(true)
        const response = await fetch(`${import.meta.env.VITE_API_URL}/chatbot`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                message:message,
                nameUser:userData?.name,
                nameTrip:selectedTrip?.name,
                descriptionTrip:selectedTrip?.description ,
                reviewTrip:selectedTrip?.review,
                priceTrip:selectedTrip?.price,
                petsTrip: selectedTrip?.petsAllowed,
                travelersTrip: selectedTrip?.numberOfTravelers,
                quantityMessage:quantityMessage,
            })
        })
    const data = await response.json()
    if(data.Status){
        setMessages((prev) =>[
            ...prev,
            {role: "assistant", content:data.Response},
        ])
        setQuantityMessage((prev) => prev +1)
    }else{
        setMessages((prev) => [
            ...prev,
            {
                role: "assistant",
                content:"An error occurred while processing your message.",
            },
        ])
    }
    if (data?.Error){
        console.error(data?.Error)
        setMessages((prev) => [...prev, {
              role: "assistant",
                content: "Unable to connect to the chatbot."
                }]);
        
    }
    }catch(error){
        console.error(error)
        setMessages((prev) => [...prev, {
              role: "assistant",
                content: "Unable to connect to the chatbot."
                }]);
        
    }finally{
        setLoading(false)
    }
}