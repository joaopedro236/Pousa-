import "./footer.css"
export default function Footer(){
    return (
        <>
        <section className="footer">
            <h3>This site was created by João Pedro; If you want to see the project, click on <span  
            onClick={() => window.open('https://github.com/joaopedro236/Pousa-', '_blank')}>Github</span>.</h3>
        </section>
        </>
    )
}