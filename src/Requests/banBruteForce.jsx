export default async function banBruteForceRequisition(){
    try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}/banBruteForce`,{
            method:"DELETE",},
        )
        const data = await response.json()
        if (data?.Ban){
            window.location.reload()
        }
    }catch(error){
        console.error(error)
    }
}