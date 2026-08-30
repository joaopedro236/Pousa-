import './userDashboard.css'
import cards from './cardsUsers'
import { useState, useEffect } from 'react'
import photoUser from '../../assets/user.png'
export default function User({ user, itemsNavbar }) {
    const [json, setJson] = useState({})
    const [activeFile, setActiveFile] = useState(false)
    const [photo, setPhoto] = useState(null)
    useEffect(() => {
        const user = async () => {
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
            <section className={`userDashboard ${user && itemsNavbar == 'User Dashboard'? 'd-flex' : 'd-none'} flex-column align-items-center justify-content-center padding-top-2`}>
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
                <div className="cards_usersDashboards d-flex flex-wrap gap-3 mt-3 px-3 aligh-items-center justify-content-center ">
                    {
                        cards.map((cardsMap) => (
                            <div key={cardsMap.id} className='d-flex flex-column align-items-center justify-content-center text-center ' >
                                <h1>
                                    {cardsMap.json === 'moneyalreadyspent'
                                        ? new Intl.NumberFormat('en-us', {
                                            style: 'currency',
                                            currency: 'usd'
                                        }).format(json?.[cardsMap.json] || 0)
                                        : json?.[cardsMap.json] || 0
                                    }
                                </h1>

                                <p>{cardsMap.title}</p>
                            </div>
                        ))
                    }
                </div>
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