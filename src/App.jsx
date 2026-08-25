import './StylesGlobals/reset.css'
import './StylesGlobals/assets.css'
import './StylesGlobals/root.css'
import RegisterUser from './Components/RegisterUser/RegisterUser'
import { useState, useEffect } from 'react'
function App() {
  const [user, setUser] = useState(false)
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
  }, [])
  
  return (
    <>
      <RegisterUser user={user} setUser={setUser}/>
      <main className={`${user ? 'Active': ''}`}></main>
    </>
  )
}

export default App
