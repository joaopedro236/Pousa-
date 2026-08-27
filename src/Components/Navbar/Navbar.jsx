import './Navbar.css'
import { useEffect } from 'react'
export default function Navbar({ ItemsNavbar, user }) {
    const itemsNavbar = [
        { name: 'Explore', href: '#', value: 'explore' },
        { name: 'Trips', href: '#', value: 'trips' },
        { name: 'Stays', href: '#', value: 'stays'},
        { name: 'User Dashboard', href: '#', value: 'User Dashboard'},
        { name: 'Create Trip', href: '#', value: 'create-trip'}
    ]
    useEffect(() => {
        const handleKeyDown = (event) => {

            if (!user) return
            if (!event.ctrlKey) return
            const sections = {
                '1': 'explore',
                '2': 'trips',
                '3': 'stays',
                '4': 'User Dashboard',
                '5': 'create-trip'
            }

            const section = sections[event.key]

            if (section) {
                event.preventDefault()
                ItemsNavbar(section)
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }

    }, [ItemsNavbar, user])
    return (
        <>
            <nav className=" navbar navbar-expand-lg bg-primary px-2 d-flex">
                <div className="container-fluid d-flex align-items-center  justify-content-between">
                    <h1 className="navbar-brand text-white m-0">
                        PousaÊ
                    </h1>
                    <button
                        className="navbar-toggler p-0 border-0 shadow-none"
                        type="button"
                        data-bs-toggle="collapse"

                        data-bs-target="#navbarSupportedContent"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse bg-primary p-3" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {itemsNavbar.map((item, index) => (
                                <li className="nav-item" key={index}>
                                    <a
                                        href={item.href}
                                        onClick={() => ItemsNavbar(item.value)}
                                        className={`nav-link text-white ${item.active ? 'active' : ''
                                            } ${item.disabled ? 'disabled' : ''
                                            }`}
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))}

                        </ul>
                        <form className="d-flex p-1 align-items-center" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn  btn-light search-btn" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav >
        </>
    )
}