import './RegisterUser.css'
import inputs from './inputs'
import { useState } from 'react'
export default function RegisterUser({ user, setUser }) {
    const [loading, setLoading] = useState(false)

    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = Object.fromEntries(new FormData(e.target))
        try {
            setError(false)
            setErrorMessage('')
            setLoading(true)
            const response = await fetch(`${import.meta.env.VITE_API_URL}/registerUser`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const result = await response.json()
            if (result?.authenticated) {
                setUser(true)
            }
            if (result?.Error) {
                setError(true)
                setErrorMessage(
                    typeof result.Error === 'string'
                        ? result.Error
                        : JSON.stringify(result.Error)
                )

                return
            }

        }
        catch (error) {
            setError(true)
            setErrorMessage(error instanceof Error ? error.message : String(error))
            console.error(error)
        }
        finally {
            setLoading(false)
        }

    }
    return (
        <>
            <section className={`registerUser ${user ? 'Active' : ''}`}>
                <form onSubmit={handleSubmit}>
                    <div className="userIcon">
                        <svg
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <defs>
                                <linearGradient id="userGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#60A5FA" />
                                    <stop offset="100%" stopColor="#2563EB" />
                                </linearGradient>
                            </defs>

                            <path
                                fill="url(#userGradient)"
                                d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5Zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5Z"
                            />
                        </svg>
                    </div>
                    <header>
                        <h1>Create Account</h1>
                        <p>Join us today, Please fill un the details below.</p>
                    </header>
                    <div className='registerUserFormDiv'>
                        {inputs.map((inputsMap) => (
                            <div className="mb-3" key={inputsMap.id}>
                                <label htmlFor={inputsMap.name} className="form-label">
                                    {inputsMap.label}
                                </label>

                                <input
                                    type={inputsMap.type}
                                    name={inputsMap.name}
                                    id={inputsMap.name}
                                    minLength={inputsMap.minLength}
                                    maxLength={inputsMap.maxLength}
                                    className="form-control"
                                    placeholder={inputsMap.placeholder}
                                />
                            </div>
                        ))}


                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Submit'}
                    </button>

                    {error && (
                        <p className="text-danger mt-2">
                            {errorMessage}!
                        </p>
                    )}


                    <p className='mt-2'>Already have an account? <span className='link-primary'>Login</span></p>
                </form>
            </section>
        </>
    )
}
