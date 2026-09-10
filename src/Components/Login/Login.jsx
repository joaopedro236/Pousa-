import './login.css'
import inputs from './inputs'
import { useState } from 'react'
export default function Login({ user, login, setUser,checkUser ,setLogin }) {

    const [loading, setLoading] = useState(false)
    
    const handleLogin = async (e) => {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.target))

        try {
            setLoading(true)
            const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const result = await response.json()
            if (result?.Status) {
                setUser(true)
                await checkUser()
                window.location.reload()
            }
            if (result?.Error) {
                console.error(result?.Error)

            }
        } catch (error) {
            console.error(error)
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <>
            <section className={`login ${!user && login ? 'd-flex' : 'd-none'} p-4 flex-column align-items-center justify-content-center`}>
            <button className='position-absolute loginClose d-flex align-items-center justify-content-center p-2'onClick={()=> setLogin(false)}>X</button>
                <div className='loginForm d-flex flex-column gap-2 p-5 '>
                    <header className="loginHeader ">
                        <h2>Welcome back!</h2>
                        <p>Log in to your account to continue.</p>
                    </header>

                    <form onSubmit={handleLogin} className='d-flex flex-column gap-3 '>
                        {
                            inputs.map((inputsMap) => (
                                <div key={inputsMap?.id} className='d-flex flex-column gap-2'>
                                    <label htmlFor={inputsMap.name} className='form-label mb-0'>{inputsMap.label}</label>
                                    <input type={inputsMap.type} name={inputsMap.name} className='form-control' id={inputsMap.type} required placeholder={inputsMap.placeholder} minLength={inputsMap.minLenght} maxLength={inputsMap.maxLenght} />
                                </div>
                            ))
                        }
                        <button type="submit" disabled={loading} className='btn btn-primary mt-4'>{loading ? 'loading' : 'Submit'}</button>
                    </form>
                    <div className="registerLink">
                        <span>Don't have an account yet?</span>
                        <a href="#">Sign up</a>
                    </div>

                    <p className="loginFooter">
                        By entering, you agree to our terms of use.
                    </p>

                </div>
            </section>
        </>
    )
}