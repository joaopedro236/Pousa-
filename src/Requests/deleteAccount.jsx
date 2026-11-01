export default async function deleteAccount(){
    try{
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/deleteAccount`,
            {
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json",
                },
                credentials:"include"
            }
        )
        const data = await response.json()
        if (data?.Error){
            console.error(data?.Error)
        }
        window.location.reload()
    }catch(error){
        console.error(error)
    }
}