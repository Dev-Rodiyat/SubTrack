import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'
import { SubscriptionsProvider } from './context/SubscriptionsProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SubscriptionsProvider>
      <ToastContainer />
      <App />
    </SubscriptionsProvider>
  </StrictMode>,
)
