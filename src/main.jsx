
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Loading from './Components/loading/Loading'
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
    alert.className = 'alert alert-danger position-fixed top-0 end-0 m-3 shadow'
    alert.setAttribute('role', 'alert')
    alert.style.zIndex = '99999'
    alert.style.minWidth = '300px'
    alert.style.maxWidth = '450px'

    alert.innerHTML = `
        <strong>Something went wrong.</strong>
        <br>
        <span>${message}</span>
    `

    document.body.appendChild(alert)

    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove()
        }
    }, 6000)
}

const originalConsoleError = console.error

console.error = (...args) => {
    originalConsoleError.apply(console, args)

    const message = args
        .map(arg => {
            if (arg instanceof Error) {
                return arg.message
            }

            if (typeof arg === 'object' && arg !== null) {
                try {
                    return JSON.stringify(arg)
                } catch {
                    return String(arg)
                }
            }

            return String(arg)
        })
        .join(' ')

    showError(message)
}


window.addEventListener('error', event => {
    if (
        event.message?.includes(
            'ResizeObserver loop completed with undelivered notifications'
        ) ||
        event.message?.includes(
            'ResizeObserver loop limit exceeded'
        )
    ) {
        return
    }

    console.error(
        event.error?.message ||
        event.message ||
        'An unexpected error occurred.'
    )
})

window.addEventListener('unhandledrejection', event => {
    console.error(
        event.reason?.message ||
        String(event.reason) ||
        'An unexpected asynchronous error occurred.'
    )
})

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
        originalConsoleError('React Error:', error, info)

        showError(
            error?.message ||
            'An unexpected error occurred in the application.'
        )
    }

    render() {
        if (this.state.hasError) {
            return (
                <div
                    className="alert alert-danger m-3"
                    role="alert"
                >
                    <strong>Something went wrong.</strong>
                    <br />
                    Please try again later.
                </div>
            )
        }

        return this.props.children
    }
}

const rootElement = document.getElementById('root')

if (!rootElement) {
    throw new Error('Root element not found.')
}

if (!window.__APP_ROOT__) {
    window.__APP_ROOT__ = createRoot(rootElement)
}

const root = window.__APP_ROOT__

root.render(<Loading />)

setTimeout(() => {
    root.render(
        <StrictMode>
            <ErrorBoundary>
                <App />
            </ErrorBoundary>
        </StrictMode>
    )
}, 1500)

