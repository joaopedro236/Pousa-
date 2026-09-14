import './star.css'
import photoUser from '../../assets/user.png'

export default function Star({ itemsNavbar, setItemsNavbar, setSelectedRestaurant, json }) {

    return (
        <>
            <section className={`star home ${itemsNavbar == 'stars' ? 'show-home' : 'hide-home'}`}>
                <header className='d-flex flex-column gap-1 p-2'>
                    <h1>Your Stars</h1>
                    <p>Here you can see the stars you left on your trips.</p>
                </header>
                <div className="trips ">
                    {json?.length > 0 ? json.map((trip, index) => (
                        <div className="trip" role='button' key={index} onClick={() => {
                            setSelectedRestaurant(trip)
                            setItemsNavbar('explore')
                        }}>

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
                    )) : (
                        <div className="no-trips">
                            <h2>No trips found</h2>
                            <p>You don't have any trips yet.</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}