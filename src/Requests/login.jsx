import banBruteForceRequisition from "../Requests/banBruteForce"
export default async function loginRequisition(setLoading, setAttempts, setUser,data) {
    try{
        setLoading(true)
        const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        const result = await response.json()
        if (result?.Status) {
            setAttempts(0)
            setUser(true)
            window.location.reload()
        }
        if(result?.Error){
            setAttempts((prev) => prev +1)
            if (attempts >=45){
                banBruteForceRequisition()
            }
        }
    }catch(error) {
        console.error(error)
    }
    finally{
        setLoading(false)
    }
}