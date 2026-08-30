import './home.css'
import { useState, useEffect } from 'react'
import photoUser from '../../assets/user.png'

export default function Home({ user, itemsNavbar, setItemsNavbar }) {
    const [json, setJson] = useState({
        name: '',
        trips: []
    })
    const [search, setSearch] = useState('')
    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/getTrips`)
                const data = await response.json()
                if (!data?.Status) {
                    console.error(data?.Error)
                }
                setJson({ trips: data?.trips })
            } catch (error) {
                console.error(error)
            }
        }
        fetchTrips()
        const interval = setInterval(fetchTrips, 300000)

        return () => clearInterval(interval)
    }, [])
    return (
        <>
            <section className={`home ${user && itemsNavbar == 'explore' ? 'd-flex' : 'd-none'} flex-column gap-2`}>
                <header className='px-3 d-flex flex-column align-items-center justify-content-center'>
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

                            <p className='fw-bold mb-0 '>Hello, {json?.trips?.[0]?.ownerName?.split(' ').slice(0, 2).join(' ')}👋</p>
                            <h1 className='mb-0'>Trips For Sale</h1>
                            <p className='small'>Browse trips and buy them.</p>
                        </div>
                        <img
                            src={json?.trips?.[0]?.ownerImage || photoUser}
                            alt="photo user"
                            role="button"
                            className="photo"

                            onClick={() => setItemsNavbar('User Dashboard')}
                        />
                    </div>
                </div>
                <div className="trips d-flex flex-column gap-3">

                    {json?.trips
                        ?.filter(trip =>
                            trip.name.toLowerCase().includes(search.toLowerCase()) ||
                            trip.destination.toLowerCase().includes(search.toLowerCase())
                        )
                        .map((trip, index) => (
                            <div className="trip" key={index}>

                                <div>
                                    <h2>{trip.name}</h2>
                                    <p>📍 {trip.destination}</p>
                                </div>

                                <div className="trip-info">
                                    <span>📅 {trip.startDate} - {trip.endDate}</span>
                                    <span>👥 {trip.numberOfTravelers} travelers</span>
                                    <span>💰 {trip.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>

                                </div>

                                <div className="trip-owner">
                                    <img
                                        src={trip.ownerImage || photoUser}
                                        alt={trip.ownerName}
                                    />

                                    <span>{trip.ownerName}</span>
                                </div>

                            </div>
                        ))}

                </div>
            </section>
        </>
    )
}