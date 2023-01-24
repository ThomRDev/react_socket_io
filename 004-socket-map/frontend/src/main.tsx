import React from 'react'
import ReactDOM from 'react-dom/client'
import { MapsApp } from './MapsApp'
import './index.css'
import { MapPageUseRef } from './pages/MapPage-useRef'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <MapsApp />
    // <MapPageUseRef />
  // </React.StrictMode>
)
