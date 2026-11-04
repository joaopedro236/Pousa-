
export default async function updateImage(formData,setPhoto, setActiveFile) {
    try{
        const response = await fetch (`${import.meta.env.VITE_API_URL}/upload-image`,{
            method:"POST",
            credentials:"include",
            body: formData,
        },)
        const data = await response.json()
        if (!response.ok) {
            console.error(data.detail || "Error sending image ")
        }
        
        if (data?.url){
            setPhoto(data?.url)
        }
    
    } catch (error){
        console.error(error)
    
    }finally{
        setActiveFile(false)
    }
}