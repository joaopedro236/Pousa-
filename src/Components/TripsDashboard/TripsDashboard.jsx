import './tripDashboard.css'
import cards from './cards'
import { useState, useEffect } from 'react'
export default function TripsDashboard({ itemsNavbar }) {
    const [json, setJson] = useState(null)
    const requisition = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/metrics`, {
                method: 'GET',
                credentials: 'include'
            })
            const data = await response.json()
            if (data?.Error) {
                console.error(data?.Error)
            }
            setJson(data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(()=>{
        requisition()
    },[])
    return (
        <>
            <section className={`tripsDashboard ${itemsNavbar == 'trip dashboard' ? 'd-flex' : 'd-none'}`}>
                <header className='d-flex flex-column'>
                    <h1>Trip tracking dashboard </h1>
                    <p>Track revenues, operating profits, and traveler feedback in real time.</p>
                </header>
                <div className="cardsTrips ">
                    {
                        cards.map((cardsMap)=>(
                            <div className="card" key={cardsMap.id}>
                                <h2 className='fw-normal'>{cardsMap.title}</h2>
                                <h1>{json?.[cardsMap?.jsonName] ?? 0 }</h1>
                            </div>
                        ))
                    }
                </div>
            </section>
        </>
    )
}