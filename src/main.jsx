import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import App from './App.jsx'

function showError(message) {
    const existingAlert = document.getElementById('global-error-alert')

    if (existingAlert) {
        existingAlert.remove()
    }

    const alert = document.createElement('div')

    alert.id = 'global-error-alert'
    alert.className = 'alert alert-danger position-fixed top-0 end-0 m-3'
    alert.setAttribute('role', 'alert')
    alert.style.zIndex = '99999'

    alert.innerHTML = `
        <strong>Something went wrong.</strong>
        <br>
        ${message}
    `

    document.body.appendChild(alert)

    setTimeout(() => {
        alert.remove()
    }, 6000)
}

const originalFetch = window.fetch

window.fetch = async (...args) => {
    try {
        const response = await originalFetch(...args)

        if (!response.ok) {
            console.error("API Error:", response.status)

            showError(
                'We could not complete your request. Please try again later.'
            )
        }

        return response
    } catch (error) {
        console.error('Network Error:', error)

        showError(
            'Unable to connect to the server. Please try again later.'
        )

        throw error
    }
}

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError() {
        return {
            hasError: true
        }
    }

    componentDidCatch(error, info) {
        console.error('React Error:', error, info)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="alert alert-danger m-3" role="alert">
                    <strong>Something went wrong.</strong>
                    <br />
                    Please try again later.
                </div>
            )
        }

        return this.props.children
    }
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </StrictMode>
)