import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// 1. Importamos el Router
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 2. Envolvemos la App */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
