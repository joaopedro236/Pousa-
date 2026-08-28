import './userDashboard.css'
import { useState, useEffect } from 'react'
import photoUser from '../../assets/user.png'
export default function User({user}) {
    const [loading, setLoading] = useState(false)
    const [json, setJson] = useState({})
    const [activeFile, setActiveFile] = useState(false)
    const [photo, setPhoto] = useState(null)
    useEffect(() => {
        const user = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/getUser`, {
                    'credentials': 'include'
                })
                const data = await response.json()
                if (!data?.Status) {
                    console.error(data?.Error)
                }
                setJson(data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        setTimeout(user, 700)
        const interval = setInterval(user, 500000)

        return () => clearInterval(interval)

    }, [])
    const handleFile = async (event) => {
        const file = event.target.files[0]

        if (!file) return

        const formData = new FormData()
        formData.append('file', file)

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/upload-image`,
                {
                    method: 'POST',
                    credentials: 'include',
                    body: formData
                }
            )

            const data = await response.json()

            if (!response.ok) {
                console.error(data?.detail || 'Error sending image')
            
            }

            setPhoto(data.url)
            setActiveFile(false)

        } catch (error) {
            console.error(error)
            alert('Error sending image')
        }
    }
    return (
        <>
            <section className={`userDashboard ${user ? 'd-flex': 'd-none'} flex-column align-items-center justify-content-center padding-top-2`}>
                <header className='d-flex flex-column  align-items-center justify-content-center '>
                    <picture className='position-relative' onClick={() => setActiveFile(prev => !prev)}>
                        <img
                            src={photo || json?.image_url || photoUser}
                            alt="photo user"
                            className="photo w-100"
                        />
                    </picture>
                    <h1>{json?.name}</h1>
                    <p>Welcome Back!</p>
                </header>
                <div className={`file-upload position-fixed ${activeFile ? 'd-flex' : 'd-none'}`}>
                    <input type="file" id="fileInput" accept="image/jpeg,image/png,image/webp"
                        onChange={handleFile} />

                    <label htmlFor="fileInput">
                        <div className="upload-content">
                            <span>📁</span>
                            <h2>Select a file</h2>
                            <p>Click here to choose an image</p>
                        </div>
                    </label>
                </div>
            </section>
        </>
    )
}