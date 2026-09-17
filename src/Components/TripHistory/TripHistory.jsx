
import { useState, useEffect } from 'react'
import photoUser from '../../assets/user.png'

export default function TripHistory({ user, itemsNavbar, setSelectedRestaurant, setItemsNavbar, json }) {

    return (
        <>
            <section className={`tripHistory ${user && itemsNavbar == 'trip history' ? 'd-flex' : 'd-none'} flex-column gap-2 star home`}>
                <header className='d-flex flex-column gap-1 p-2'>
                    <h1>Purchased Trips</h1>
                    <p>Here is the history of the trips you have purchased.</p>
                </header>
                <div className="trips">
                    {json?.length > 0 ? json.map((trip, index) => (
                        <div className="trip" role='button' key={index} onClick={() => {
                            setSelectedRestaurant(trip)
                            setItemsNavbar('explore')
                        }}>

                            <div>
                                <h2>{trip?.name}</h2>
                                <p>{trip?.description?.length > 80
                                    ? trip?.description.slice(0, 60) + "..."
                                    : trip?.description}</p>
                            </div>

                            <div className="trip-info">
                                <span>📅 {trip?.startDate} - {trip?.endDate}</span>
                                <span>👥 {trip?.numberOfTravelers} travelers</span>
                                <span>💰 {trip?.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
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