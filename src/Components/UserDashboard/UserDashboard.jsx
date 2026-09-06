import './userDashboard.css'
import cards from './cardsUsers'
import { useState, useEffect } from 'react'
import photoUser from '../../assets/user.png'
export default function User({ user, itemsNavbar }) {
    const [json, setJson] = useState(null)
    const [activeFile, setActiveFile] = useState(false)
    const [photo, setPhoto] = useState(null)

    const userFetch = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/getUser`, {
                'credentials': 'include'
            })
            const data = await response.json()
            if (!data?.Status) {
                console.error(data?.Error)
            }
            setJson(data)
            setPhoto(data?.image_url || null)
        } catch (error) {
            console.error(error)
        }
    }




    useEffect(() => {
        if (itemsNavbar !== 'User Dashboard') return

        userFetch()

        const interval = setInterval(userFetch, 300000)

        return () => clearInterval(interval)
    }, [itemsNavbar])
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
            if (data?.url) {
                setPhoto(data.url)
            }
            setActiveFile(false)

        } catch (error) {
            console.error(error)
            alert('Error sending image')
        }
    }
    return (
        <>
            <section className={`userDashboard ${user && itemsNavbar == 'User Dashboard' ? 'show-home'
                : 'hide-home'} flex-column align-items-center justify-content-center padding-top-2`}>
                <header className='d-flex flex-column  align-items-center justify-content-center '>
                    <picture className='position-relative' onClick={() => setActiveFile(prev => !prev)}>
                        <img
                            src={photo || json?.image_url || photoUser}
                            alt="photo user"
                            onError={(e) => {
                                e.currentTarget.onerror = null
                                e.currentTarget.src = photoUser
                            }}
                            className="photo w-100"

                        />
                    </picture>
                    <h1>{json?.name}</h1>
                    <p>Welcome Back!</p>
                </header>
                <div className="cards_usersDashboards d-flex flex-wrap gap-3 mt-3 px-3 aligh-items-center justify-content-center ">
                    {
                        cards.map((cardsMap) => (
                            <div key={cardsMap.id} className='d-flex  flex-column  ' >
                                <img src={cardsMap?.image} alt={cardsMap.name} style={{ background: cardsMap.color, filter: 'invert(100)' }} />
                                <h1 className='mt-3'>
                                    {cardsMap.json === 'moneyalreadyspent' || cardsMap.json === 'money'
                                        ? new Intl.NumberFormat('en-us', {
                                            style: 'currency',
                                            currency: 'usd',
                                            notation: 'compact',
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