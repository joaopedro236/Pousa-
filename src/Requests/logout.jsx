export default async function logOut(){
    try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}/logout`,{
            method:"POST",
            credentials:"include",
        })
        const data = await response.json()
        if (data?.Status) {
            window.location.reload()
        }
        if(data?.Error) {
            console.error(data?.Error)
        }
    }catch(error){
        console.error(error)
    }
}