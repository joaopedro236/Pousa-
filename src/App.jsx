import './StylesGlobals/reset.css'
import './StylesGlobals/assets.css'
import './StylesGlobals/root.css'
import RegisterUser from './Components/RegisterUser/RegisterUser'
import UserDashboard from './Components/UserDashboard/UserDashboard'
import Navbar from './Components/Navbar/Navbar'
import { useState, useEffect } from 'react'
function App() {
  const [user, setUser] = useState(false)
  const [itemsNavbar, setItemsNavbar] =  useState('explore')
  useEffect(() => {
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
    checkUser()
    const interval = setInterval(checkUser, 2000)

    return () => clearInterval(interval)

  }, [])
  useEffect(() => {
    document.body.classList.toggle('user-active', user)
  }, [user])
  return (
    <>
      <RegisterUser user={user} setUser={setUser} />
      <main className={`d-flex flex-column ${user ? 'Active' : ''}`}>
        <Navbar ItemsNavbar={setItemsNavbar} user={user} />
        <UserDashboard itemsNavbar={itemsNavbar} user={user} />
      </main>
    </>
  )
}

export default App
