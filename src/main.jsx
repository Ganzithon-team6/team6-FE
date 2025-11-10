import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import FirstVisit from './apps/firstVisit.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FirstVisit />
  </StrictMode>,
)
