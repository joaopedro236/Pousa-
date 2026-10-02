import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const appPromise = import('./App.jsx')

function showError(message) {
    let container = document.getElementById('global-error-container')

    if (!container) {
        container = document.createElement('div')
        container.id = 'global-error-container'
        container.className = 'p-3'
        container.style.position = 'fixed'
        container.style.top = '0'
        container.style.right = '0'
        
        container.style.zIndex = '990'
        container.style.width = '450px'
        container.style.maxWidth = 'calc(100vw - 30px)'
        container.style.display = 'flex'
        container.style.flexDirection = 'column'
        container.style.gap = '10px'
        document.body.appendChild(container)
    }

    const alert = document.createElement('div')
    alert.className = 'alert alert-danger shadow mb-0'
    alert.setAttribute('role', 'alert')
    alert.style.width = '100%'

    alert.innerHTML = `
        <strong>Something went wrong.</strong>
        <br>
        <span>${message}</span>
    `

    container.appendChild(alert)

    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove()
        }

        if (container.children.length === 0) {
            container.remove()
        }
    }, 6000)
}

const originalConsoleError = console.error

console.error = (...args) => {
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

    if (
        message.includes('Cannot read properties of null (reading \'useState\'')
        || message.includes('ReferenceError: user is not defined')
    ) {
        originalConsoleError.apply(console, args)
        return
    }

    originalConsoleError.apply(console, args)
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
        || 
        event.message?.includes(
            "'NoneType' is not subscriptable"
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
        if (error?.message?.includes("'NoneType' is not subscriptable")) return
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

appPromise
    .then(({ default: App }) => {
        root.render(
            <StrictMode>
                
                <BrowserRouter>
                    <ErrorBoundary>
                        <App />
                    </ErrorBoundary>
                </BrowserRouter>
        
            </StrictMode>
        )
    })
    .catch(error => {
        console.error(error)
    })
