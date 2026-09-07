import './StylesGlobals/reset.css'
import './StylesGlobals/assets.css'
import './StylesGlobals/root.css'
import RegisterUser from './Components/RegisterUser/RegisterUser'
import UserDashboard from './Components/UserDashboard/UserDashboard'
import Navbar from './Components/Navbar/Navbar'
import CreateTrip from './Components/createTrip/CreateTrip'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import { useState, useEffect } from 'react'
function App() {
  const [user, setUser] = useState(false)
  const [login, setLogin] = useState(false)
  const [itemsNavbar, setItemsNavbar] = useState('explore')
  const [userData, setUserData] = useState(null)
  const checkUser = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/checkUser`, {
        credentials: 'include'
      })
      const data = await response.json()
      setUser(data.authenticated)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    checkUser()
  }, [])
  useEffect(() => {
    document.body.classList.toggle('user-active', user)
  }, [user])
  
  return (
    <>
      <RegisterUser checkUser={checkUser} user={user} setUser={setUser} login={login} setLogin={setLogin} />
      <Login user={user} setUser={setUser} checkUser={checkUser} login={login} setLogin={setLogin} />
      <main className={`d-flex flex-column ${user ? 'Active' : ''}`}>
        <Navbar ItemsNavbar={setItemsNavbar} user={user} />
        <Home user={user} itemsNavbar={itemsNavbar} setItemsNavbar={setItemsNavbar} />
        <UserDashboard itemsNavbar={itemsNavbar} user={user} />
        <CreateTrip user={user} itemsNavbar={itemsNavbar} setItemsNavbar={setItemsNavbar} />
      </main>
    </>
  )
}

export default App
