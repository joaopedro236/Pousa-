import './home.css'
import TripsActive from './components/TripsActive'
import { useState, useEffect } from 'react'
import photoUser from '../../assets/user.png'
import { useNavigate, useParams } from 'react-router-dom'

export default function Home({ user, userData, selectedRestaurant, setSelectedRestaurant, itemsNavbar, setItemsNavbar, starTrip, stars }) {
    const [json, setJson] = useState({

        trips: []
    })
    const [search, setSearch] = useState('')
    const { tripId } = useParams()
    useEffect(() => {
    if (!tripId || !json.trips.length) return

    const trip = json.trips.find(
        trip => String(trip.id) === String(tripId)
    )

    if (trip) {
        setSelectedRestaurant(trip)
    }
}, [tripId, json.trips])
    const navigate = useNavigate()

    const fetchData = async () => {
        try {
            const tripsResponse = await fetch(
                `${import.meta.env.VITE_API_URL}/getTrips`
            )

            const tripsData = await tripsResponse.json()

            setJson({
                trips: tripsData?.trips || []
            })


        } catch (error) {
            console.error(error)
        }
    }




    useEffect(() => {
        fetchData()

        const interval = setInterval(fetchData, 300000)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (itemsNavbar !== 'explore') return

        fetchData()
    }, [itemsNavbar])
    return (
        <>
            <section className={`home ${user && itemsNavbar == 'explore' && selectedRestaurant == null ? 'show-home'
                : 'hide-home'} flex-column gap-2`}>
                <header className='px-3 m-auto mt-3 d-flex flex-column align-items-center justify-content-center'>
                    <form className="search-form" onSubmit={(e) => e.preventDefault()} role="search">
                        <div className="search-box">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="21"
                                height="21"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.3-4.3" />
                            </svg>


                            <input
                                type="search"
                                className="form-control"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search for accommodations"
                                aria-label="Search for accommodations"
                            />
                        </div>


                    </form>
                </header>
                <div className='d-flex flex-column p-4'>


                    <div className="userInfo d-flex  justify-content-between gap-2 align-items-start">
                        <div className='d-flex flex-column '>
                            <p className='fw-bold mb-0'>
                                Hello, {userData?.name?.split(' ').slice(0, 2).join(' ')}👋
                            </p>
                            <h1 className='mb-0'>Trips For Sale</h1>
                            <p className='small'>Browse trips and buy them.</p>
                        </div>
                        <img
                            src={userData?.image_url || photoUser}
                            alt="photo user"
                            role="button"

                            className="photo"
                            onClick={() => setItemsNavbar('User Dashboard')}
                        />
                    </div>
                </div>
                <div className="trips ">

                    {json?.trips
                        ?.filter(trip =>
                            trip.name.toLowerCase().includes(search.toLowerCase()) ||
                            trip.description.toLowerCase().includes(search.toLowerCase())
                        )
                        .map((trip, index) => (
                            <div className="trip" role='button' key={index} onClick={() => {
                                sessionStorage.setItem('selectedTrip', JSON.stringify(trip))
                                setSelectedRestaurant(trip)
                                navigate(`/trip/${trip.id}`)
                            }}>

                                <div>
                                    <h2>{trip.name}</h2>
                                    <p>{trip.description}</p>
                                </div>

                                <div className="trip-info">
                                    <span>📅 {trip.startDate} - {trip.endDate}</span>
                                    <span>👥 {trip.numberOfTravelers} travelers</span>
                                    <span>💰 {trip.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                                    <span>⭐ {trip?.review}</span>
                                    <span>😺 Pets {trip?.petsAllowed}</span>

                                </div>

                                <div className="trip-owner">
                                    <img
                                        src={trip.ownerImage || photoUser}
                                        alt={trip.ownerName}
                                        onError={(e) => {
                                            e.currentTarget.onerror = null
                                            e.currentTarget.src = photoUser
                                        }}
                                    />

                                    <span>{trip.ownerName}</span>
                                </div>

                            </div>
                        ))}

                </div>
            </section>
            <TripsActive selectedRestaurant={selectedRestaurant} stars={stars} starTrip={starTrip} user={user} itemsNavbar={itemsNavbar} setSelectedRestaurant={setSelectedRestaurant} />
        </>
    )
}