
export default async function registerUserRequisition(setError, setErrorMessage, setLoading, data, setUser) {
    try{
        setError(false)
        setErrorMessage("")
        setLoading(true)
        const response = await fetch(`${import.meta.env.VITE_API_URL}/registerUser`, {
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(data),
        })
        const result = await response.json()
        if (result?.Status){
            setUser(true)
            window.location.reload()
        }
        if (result?.Error) {
            setError(true)
            console.error(result?.Error)
            setErrorMessage(
                typeof result.Error === "string"
                ? result.Error
                : JSON.stringify(result.Error),
            )
            return
        }
    }catch(error){
        setError(true)
        setErrorMessage(error instanceof Error ? error.message : String(error))
        console.error(error)
    }finally{
        setLoading(false)
    }
}