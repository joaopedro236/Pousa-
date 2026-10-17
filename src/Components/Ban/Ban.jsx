import "./ban.css"
export default function Ban({user}){
    return(
        <section className={`ban ${user?.Error =="Ban Detected"? "Active" :""}`}>
            <h1>You have been banned!</h1>
            <p>Reason: {user?.Reason}</p>
        </section>
    )
}