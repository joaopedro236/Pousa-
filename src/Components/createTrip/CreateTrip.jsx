import '../../Components/RegisterUser/RegisterUser.css'
import inputs from './inputs'
import Select from 'react-select';
import itemsSelect from './selectTagsJSON'
import './CreateTrip.css'
import { useState, useEffect } from 'react'
export default function CreateTrip({ user, itemsNavbar, setItemsNavbar }) {
    const [loading, setLoading] = useState(false)
    const today = new Date().toISOString().split('T')[0]
    const [tags, setTags] = useState([])
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = Object.fromEntries(new FormData(e.target))
        data.tags = tags.map(tag => tag.value)
        try {
            setError(false)
            setErrorMessage('')
            setLoading(true)
            const response = await fetch(`${import.meta.env.VITE_API_URL}/trips`, {
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
                console.error(result?.Error)
                setErrorMessage(
                    typeof result.Error === 'string'
                        ? result.Error
                        : JSON.stringify(result.Error)
                )

                return
            }
            if (result?.Status) {
                setItemsNavbar('explore')
                window.location.reload();
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
    const MAX_TAGS = 5

    const handleTagsChange = (selected) => {
        if (selected.length <= MAX_TAGS) {
            setTags(selected)
        }
    }
    return (
        <>
            <section className={`registerUser createTrip ${user && itemsNavbar == 'create-trip' ? 'Active' : ''}`}>
                <form onSubmit={handleSubmit}>
                    <div className="userIcon">
                        <svg
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <defs>
                                <linearGradient id="tripGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#60A5FA" />
                                    <stop offset="100%" stopColor="#2563EB" />
                                </linearGradient>
                            </defs>

                            <path
                                fill="url(#tripGradient)"
                                d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5L21 16Z"
                            />

                        </svg>

                    </div>
                    <header>
                        <h1>Create Trip</h1>
                        <p>Plan your next adventure! Fill in the details below.</p>
                    </header>
                    <div className='registerUserFormDiv'>
                        {inputs.map((inputsMap) => (
                            <div className="mb-3" key={inputsMap.id}>
                                <label htmlFor={inputsMap.name} className="form-label">
                                    {inputsMap.label}
                                </label>

                                {inputsMap.type === 'textarea' ? (
                                    <textarea
                                        name={inputsMap.name}
                                        id={inputsMap.name}
                                        minLength={inputsMap.minLength}
                                        maxLength={inputsMap.maxLength}
                                        className="form-control"
                                        placeholder={inputsMap.placeholder}
                                        required
                                        onInput={(e) => {
                                            const words = e.target.value.split(/(\s+)/)
                                            const maxWordLength = inputsMap.maxWordLength

                                            if (words.some(word => word.trim().length > maxWordLength)) {
                                                console.error(`Each word can have a maximum of ${maxWordLength} characters`)

                                                e.target.value = words
                                                    .map(word =>
                                                        word.trim().length > maxWordLength
                                                            ? word.slice(0, maxWordLength)
                                                            : word
                                                    )
                                                    .join('')
                                            }
                                        }}
                                    />
                                ) : (
                                    <input
                                        type={inputsMap.type}
                                        name={inputsMap.name}
                                        id={inputsMap.name}
                                        min={inputsMap.type === 'date' ? today : undefined}
                                        minLength={inputsMap.minLength}
                                        maxLength={inputsMap.maxLength}
                                        className="form-control"
                                        placeholder={inputsMap.placeholder}
                                        required
                                    />
                                )}
                            </div>
                        ))}
                        <div className="mb-3">
                            <label htmlFor="petsAllowed" className="form-label">
                                Pets allowed?
                            </label>

                            <select
                                id="petsAllowed"
                                name="petsAllowed"
                                className="form-select"
                                defaultValue=""
                                required
                            >
                                <option value="" disabled>
                                    Select an option
                                </option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tags" className='text-sm'>Tags</label>
                            <Select
                                options={itemsSelect}
                                isMulti
                                value={tags}
                                onChange={handleTagsChange}
                                isOptionDisabled={(option) =>
                                    tags.length >= MAX_TAGS && !tags.some(tag => tag.value === option.value)
                                }
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        cursor: "pointer",
                                    }),
                                    option: (base) => ({
                                        ...base,
                                        cursor: "pointer",
                                    }),
                                    multiValueRemove: (base) => ({
                                        ...base,
                                        cursor: "pointer",
                                    }),
                                    dropdownIndicator: (base) => ({
                                        ...base,
                                        cursor: "pointer",
                                    }),
                                    clearIndicator: (base) => ({
                                        ...base,
                                        cursor: "pointer",
                                    }), menuList: (base) => ({
                                        ...base,
                                        maxHeight: '210px',
                                        overflowY: 'auto',
                                    }),
                                }} menuPlacement="top"
                                placeholder='Select tags for your trip'
                                closeMenuOnSelect={false}
                                required

                            />
                        </div>
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




                </form>
            </section >
        </>
    )
}