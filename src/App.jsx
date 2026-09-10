import './StylesGlobals/reset.css'
import './StylesGlobals/assets.css'
import './StylesGlobals/root.css'
import TripsActive from './Components/Home/components/TripsActive'  
import { useNavigate } from 'react-router-dom'
import RegisterUser from './Components/RegisterUser/RegisterUser'
import UserDashboard from './Components/UserDashboard/UserDashboard'
import Navbar from './Components/Navbar/Navbar'
import CreateTrip from './Components/createTrip/CreateTrip'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import Loading from './Components/loading/Loading'
import Star from './Components/Stars/Stars'
import Chatbot from './Chatbot/Chatbot'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function App() {
    const [user, setUser] = useState(false)
    const [login, setLogin] = useState(false)
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    const [itemsNavbar, setItemsNavbar] = useState('explore')
    const [userData, setUserData] = useState(null)
    const [starTrip, setStarTrip] = useState(null)
    const [loading, setLoading] = useState(true)


    const checkUser = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/checkUser`, {
                credentials: 'include'
            })

            const data = await response.json()

            setUser(data.authenticated)

            return data
        } catch (error) {
            console.error(error)
            setUser(false)
            return null
        }
    }

    const getUser = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/getUser`, {
                credentials: 'include'
            })

            const data = await response.json()

            if (data?.image_url) {
                await new Promise(resolve => {
                    const img = new Image()

                    img.onload = resolve
                    img.onerror = resolve

                    img.src = data.image_url
                })
            }

            setUserData(data)

            return data
        } catch (error) {
            console.error(error)
            return null
        }
    }

    const stars = async () => {
        try {
            const responseStar = await fetch(`${import.meta.env.VITE_API_URL}/getStar`, {
                method: 'GET',
                credentials: 'include'
            })

            const dataStar = await responseStar.json()

            if (dataStar?.Status) {
                setStarTrip(dataStar.Trips || [])
            } else {
                setStarTrip([])
            }

            if (dataStar?.Error) {
                console.error(dataStar.Error)
            }

            return dataStar
        } catch (error) {
            console.error(error)
            setStarTrip([])
            return null
        }
    }

    useEffect(() => {
        const initializeApp = async () => {
            await Promise.all([
                checkUser(),
                getUser(),
                stars()
            ])

            setLoading(false)
        }

        initializeApp()
    }, [])

    useEffect(() => {
        document.body.classList.toggle('user-active', user)
    }, [user])

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <RegisterUser
                checkUser={checkUser}
                user={user}
                setUser={setUser}
                login={login}
                setLogin={setLogin}
            />

            <Login
                user={user}
                setUser={setUser}
                checkUser={checkUser}
                login={login}
                setLogin={setLogin}
            />

            <main className={`d-flex flex-column ${user ? 'Active' : ''}`}>
                <Navbar
                    ItemsNavbar={setItemsNavbar}
                    user={user}
                />

                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home
                                user={user}
                                userData={userData}
                                itemsNavbar={itemsNavbar}
                                setItemsNavbar={setItemsNavbar}
                                selectedRestaurant={selectedRestaurant}
                                setSelectedRestaurant={setSelectedRestaurant}
                                stars={stars}
                                starTrip={starTrip}
                            />
                        }
                    />
                    <Route path="/trip/" element={<Navigate to="/" replace />} />
                    <Route
                        path="/trip/:tripId"
                        element={
                            <TripsActive
                                stars={stars}
                                user={user}
                                starTrip={starTrip}
                                selectedRestaurant={selectedRestaurant}
                                setSelectedRestaurant={setSelectedRestaurant}
                                itemsNavbar={itemsNavbar}
                            />
                        }
                    />
                </Routes>

                <UserDashboard
                    itemsNavbar={itemsNavbar}
                    user={user}
                    userData={userData}

                />

                <CreateTrip
                    user={user}
                    itemsNavbar={itemsNavbar}
                    setItemsNavbar={setItemsNavbar}
                />
                <Star
                    setSelectedRestaurant={setSelectedRestaurant}
                    itemsNavbar={itemsNavbar}
                    json={starTrip}
                    setItemsNavbar={setItemsNavbar}
                />
                <Chatbot
                selectedRestaurant={selectedRestaurant}
                userData={userData}/>
            </main>
        </>
    )


}

export default App
