import './tripDashboard.css'
export default function TripsDashboard({itemsNavbar}){
    return(
        <>
        <section className={`tripsDashboard ${itemsNavbar == 'trip dashboard' ? 'd-flex' : 'd-none'}`}>
            <header className='d-flex flex-column'>
                <h1>Trip tracking dashboard </h1>
                <p>Track revenues, operating profits, and traveler feedback in real time.</p>
            </header>
        </section>
        </>
    )
}