import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import "../../frontend/index.css"
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <HelmetProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </HelmetProvider>
  </BrowserRouter>
)
