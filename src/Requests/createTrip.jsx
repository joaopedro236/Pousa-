
export default async function handleSubmitVerification(setError, setErrorMessage, setLoading, setStage, stage, data, setUser, setItemsNavbar){
    try{
        setError(false)
        setErrorMessage("")
        setLoading(true)
        setStage((prev) =>prev +1)
        if(stage>2){
            setStage(0)
        }
        if (stage === 2){
            const response = await fetch (`${import.meta.env.VITE_API_URL}/trips`, {
                method:"POST",
                credentials:"include",
                body:data
            }
            )
            const result= await response.json()
            if (result?.authentication ){
                setUser(true)
            }
            if (result?.Error){
                setError(true)
                console.error(result?.Error)
                setErrorMessage(
                    typeof result.Error === "string" 
                    ? result.Error : JSON.stringify(result.Error),
                )
                return
            }
            if (result?.Status) {
                setItemsNavbar("explore")
                window.location.reload()
            }
        }
    }catch(error){
        setError(true)
        setErrorMessage(error instanceof Error ? error.message: String(error))
        console.error(error)
    } finally {
        setLoading(false)
    }
}