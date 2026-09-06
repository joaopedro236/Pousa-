import './home.css'
import TripsActive from './components/TripsActive'
import { useState, useEffect } from 'react'
import photoUser from '../../assets/user.png'

export default function Home({ user, itemsNavbar, setItemsNavbar }) {
    const [json, setJson] = useState({

        trips: []
    })
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [userData, setUserData] = useState(null)
    const [userImage, setUserImage] = useState(photoUser)
    const [search, setSearch] = useState('')

    const fetchData = async () => {
        try {
            const [tripsResponse, userResponse] = await Promise.all([
                fetch(`${import.meta.env.VITE_API_URL}/getTrips`),
                fetch(`${import.meta.env.VITE_API_URL}/getUser`, {
                    credentials: 'include'
                })
            ])

            const tripsData = await tripsResponse.json()
            const userDataFetch = await userResponse.json()

            setJson({
                trips: tripsData?.trips || []
            })
            if (userDataFetch?.image_url) {
                setUserImage(userDataFetch.image_url)
            }

            setUserData(userDataFetch)

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
                            src={userImage}
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
                            <div className="trip" role='button' key={index} onClick={() => setSelectedRestaurant(trip)}>

                                <div>
                                    <h2>{trip.name}</h2>
                                    <p>{trip.description?.length > 80
                                        ? trip.description.slice(0, 60) + "..."
                                        : trip.description}</p>
                                </div>

                                <div className="trip-info">
                                    <span>📅 {trip.startDate} - {trip.endDate}</span>
                                    <span>👥 {trip.numberOfTravelers} travelers</span>
                                    <span>💰 {trip.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                                    <span>⭐ {trip?.review}</span>
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
            <TripsActive selectedRestaurant={selectedRestaurant} user={user} itemsNavbar={itemsNavbar} setSelectedRestaurant={setSelectedRestaurant} />
        </>
    )
}