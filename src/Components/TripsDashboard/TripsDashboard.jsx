import './tripDashboard.css'
export default function TripsDashboard({itemsNavbar}){
    return(
        <>
        <section className={`tripsDashboard ${itemsNavbar == 'trip dashboard' ? 'd-flex' : 'd-none'}`}></section>
        </>
    )
}