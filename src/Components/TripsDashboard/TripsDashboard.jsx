import './tripDashboard.css'
import cards from './cards'
import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
export default function TripsDashboard({ itemsNavbar }) {
    const [json, setJson] = useState(null)
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const chartData = weekDays.map((day, index) => ({
    day,
    tripsobtainedhistoryS: json?.tripsobtainedhistoryS?.[index] ?? 0
}))
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
    useEffect(() => {
        requisition()
    }, [])
    return (
        <>
            <section className={`tripsDashboard ${itemsNavbar == 'trip dashboard' ? 'd-flex' : 'd-none'}`}>
                <header className='d-flex flex-column'>
                    <h1>Trip tracking dashboard </h1>
                    <p>Track revenues, operating profits, and traveler feedback in real time.</p>
                </header>
                <div className="cardsTrips ">
                    {
                        cards.map((cardsMap) => (
                            <div className="card" key={cardsMap.id}>
                                <h2 className='fw-normal'>{cardsMap.title}</h2>
                                <h1>{json?.[cardsMap?.jsonName] ?? 0}</h1>
                            </div>
                        ))
                    }
                </div>
                <div>
                    <ResponsiveContainer width="100%"  height={300}>
                        <LineChart style={{ cursor: 'pointer' }}
                            data={chartData}
                            margin={{
                                top: 10,
                                right: 10,
                                left: -20,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" niceTicks="snap125" style={{ fontSize: 11  }} interval={0} />
                            <YAxis width="40" niceTicks="snap125" style={{ fontSize:  11 }} dataKey="tripsobtainedhistoryS" />
                            <Tooltip />
                            <Line type="monotone" name='money' dataKey="tripsobtainedhistoryS" stroke="var(--bs-primary)" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </section>
        </>
    )
}