import './tripsActive.css'
import { useState } from 'react'
import hiddenPhoto from '../../../assets/banner.jpeg'
import hiddenUser from '../../../assets/user.png'
export default function TripsActive({ itemsNavbar, user, selectedRestaurant, setSelectedRestaurant }) {
    const [loading, setLoading] = useState(false)
    const [showFullDescription, setShowFullDescription] = useState(false)
    const buy = async () => {
        setLoading(true)
        try {

            const response = await fetch(`${import.meta.env.VITE_API_URL}/buyTrip`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: selectedRestaurant?.id
                    })
                }

            )
            const data = await response.json()
            if (data?.Status) {
                alert('trip purchased')
            }
            if (data?.Error) {
                console.error(data?.Error)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <section className={`tripsActive ${itemsNavbar == 'explore' && user && selectedRestaurant != null ? 'show-home'
                : 'hide-home'} w-100 flex-column gap-3`}>
                <header className='w-100 position-relative'>
                    <button className='position-absolute ' onClick={() => setSelectedRestaurant(null)}>X</button>
                    <img src={hiddenPhoto} alt="hiddenPhoto" className='w-100' />
                </header>
                <div className="tripsActiveContent d-flex flex-column mt-2 px-3 ">
                    <header className="d-flex flex-column align-items-center rounded p-4 justify-contnet-center">
                        <h1 className='fw-normal text-center'>{selectedRestaurant?.name}</h1>
                        <p className='text-center'>{selectedRestaurant?.description.split(" ").length > 5
                            ? selectedRestaurant?.description.split(" ").slice(0, 12).join(" ") + "..."
                            : selectedRestaurant?.description}</p>
                        <p>{selectedRestaurant?.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                        <div className="stars d-flex flex-column align-items-center justify-content-center text-center ">
                            <h1 className='mb-0 fw-normal'>{selectedRestaurant?.review}</h1>
                            <div>


                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        className={`${star <= selectedRestaurant?.review ? "star filled" : "star"}`}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                        </div>
                    </header>
                    <div className="ownerTrip  d-flex flex-wrap gap-3  rounded p-3">
                        <img
                            src={selectedRestaurant?.ownerImage || hiddenUser}
                            alt={selectedRestaurant?.ownerName}
                            onError={(e) => {
                                e.currentTarget.onerror = null
                                e.currentTarget.src = hiddenUser
                            }}
                        />
                        <div className='mt-2'>
                            <p className='mb-0'>owner</p>
                            <h1 className='mb-0'>{selectedRestaurant?.ownerName}</h1>
                        </div>
                    </div>
                    <div className="descriptionTrip d-flex flex-column rounded gap-2 p-4">
                        <h2>Description</h2>

                        <p className={!showFullDescription ? 'collapsed' : ''}>
                            {selectedRestaurant?.description}
                        </p>

                        {selectedRestaurant?.description?.length > 150 && (
                            <button
                                className="read-more"
                                onClick={() => setShowFullDescription(!showFullDescription)}
                            >
                                {showFullDescription ? 'See less ↑' : 'See more ↓'}
                            </button>
                        )}
                    </div>
                    <button className="btn btn-primary p-3" onClick={() => buy()} disabled={loading}>{loading ? 'loading' : 'Book a trip'}</button>
                </div>
            </section>
        </>
    )
}