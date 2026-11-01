
export default async function updateImage(formData,setPhoto, setActiveFile) {
    try{
        const response = await fetch (`${import.meta.env.VITE_API_URL}/upload-image`,{
            method:"POST",
            credentials:"include",
            body: formData,
        },)
        if (!response.ok) {
            console.error(data.detail || "Error sending image ")
        }
        const data = await response.json()
        if (data?.url){
            setPhoto(data?.url)
        }
        setActiveFile(false)
    } catch (error){
        console.error(error)
    
    }
}