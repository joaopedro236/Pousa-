export default async function buyTrip(selectedTrip, tripQuantity, setLoading){
    setLoading(true)
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/buyTrip`,{
            method: "POST",
            credentials:"include",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: selectedTrip?.id,
                quantity: Number(tripQuantity),
            }),
        })
        const data = await response.json()
        if (data?.Status){
            alert("trip purchased")
        }
        if(data?.Error){
            console.error(data?.Error)
        }
    }catch(error){
        console.error(error)
    }finally {
        setLoading(false)
    }
}