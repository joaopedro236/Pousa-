import './tripsActive.css'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import hiddenPhoto from '../../../assets/banner.jpeg'
import hiddenUser from '../../../assets/user.png'
export default function TripsActive({ itemsNavbar, stars, user, starTrip, selectedRestaurant, setSelectedRestaurant }) {
    const [loading, setLoading] = useState(false)
    const [notFound, setNotFound] = useState(false)
    const { tripId } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        if (selectedRestaurant || !tripId) return

        const fetchTrip = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/getTrips`
                )

                const data = await response.json()

                const trip = data.trips?.find(
                    trip => String(trip.id) === String(tripId)
                )

                if (trip) {
                    setSelectedRestaurant(trip)
                } else {
                    setNotFound(true)
                }
            } catch (error) {
                console.error(error)
            }
        }

        fetchTrip()
    }, [tripId])
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
    const [starActive, setStarActive] = useState(false)
    useEffect(() => {
        const isFavorite = Array.isArray(starTrip)
            ? starTrip.some(star => star?.id === selectedRestaurant?.id)
            : false

        setStarActive(isFavorite)
    }, [starTrip, selectedRestaurant?.id])
    const addStar = async () => {
        try {
            const responseAS = await fetch(`${import.meta.env.VITE_API_URL}/addStar`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: selectedRestaurant?.id
                })
            })
            const dataAS = await responseAS.json()
            if (dataAS?.Error) {
                console.error(dataAS?.Error)
            }
            setStarActive(true)
            await stars()
        } catch (error) {
            console.error(error)
        }
    }
    const removeStar = async () => {
        try {
            const responseRS = await fetch(`${import.meta.env.VITE_API_URL}/removeStar`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: selectedRestaurant?.id
                })
            })
            const dataRS = await responseRS.json()
            if (dataRS?.Error) {
                console.error(dataRS?.Error)
            }
            setStarActive(false)
            await stars()

        } catch (error) {
            console.error(error)
        }
    }
    if (notFound) {
        return (
            <div className="bug-page">
                <h1>404</h1>
                <p>Trip not found.</p>
            </div>
        )
    }
    return (
        <>
            <section className={`tripsActive position-relative ${itemsNavbar == 'explore' && user && selectedRestaurant != null ? 'show-home'
                : 'hide-home'} w-100 flex-column gap-3`}>
                <header className='w-100 position-relative tripsActiveHeader'>
                    <button className='position-absolute ' onClick={() => {
                        setSelectedRestaurant(null)
                        navigate('/', { replace: true })

                    }}>X</button>
                    <img src={hiddenPhoto} alt="hiddenPhoto" />
                </header>
                <div className="tripsActiveContent  mt-2 px-3 position-relative">
                    <header className="d-flex flex-column position-relative align-items-center rounded p-4 justify-contnet-center">
                        <button className={` starTrip position-absolute d-flex align-items-center justify-content-center ${starActive ? 'text-primary' : ''}`}  onClick={starActive ? removeStar : addStar}>★</button>
                       
                        <h1 className='fw-normal text-center'>{selectedRestaurant?.name}</h1>
                        <p className='text-center'>{selectedRestaurant?.description?.split(" ").length > 5
                            ? selectedRestaurant?.description?.split(" ").slice(0, 12).join(" ") + "..."
                            : selectedRestaurant?.description}</p>
                        <p>{selectedRestaurant?.price?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
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
                    <div className="tagsTrip d-flex flex-column gap-3 rounded p-4 ">
                        <h1 className='fw-normal text-center'>Tags</h1>
                        <div className='d-flex flex-wrap gap-3 align-items-center justify-content-center'>

                            <span>📅 {selectedRestaurant?.startDate} - {selectedRestaurant?.endDate}</span>
                            <span>👥 {selectedRestaurant?.numberOfTravelers} travelers</span>
                            <span>💰 {selectedRestaurant?.price?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                            <span>⭐ {selectedRestaurant?.review}</span>
                            <span>😺 Pets {selectedRestaurant?.petsAllowed}</span>

                        </div>
                    </div>
                    <div className="descriptionTrip d-flex flex-column rounded gap-2 p-4">
                        <h2>Description</h2>

                        <p>{selectedRestaurant?.description}</p>
                    </div>
                    <button className="btn btn-primary p-3 buyTrip" onClick={() => buy()} disabled={loading}>{loading ? 'loading' : 'Book a trip'}</button>
                </div>
            </section>
        </>
    )
}