import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { TicketApp } from './TicketApp'
import { BrowserRouter } from 'react-router-dom'

// import 'antd/dist/antd.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <TicketApp />
  // </React.StrictMode>
)
