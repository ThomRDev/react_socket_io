import { useContext, useEffect, useState } from 'react'
import './App.css'
import { BandAdd } from './components/BandAdd'
import { BandList } from './components/BandList'
import * as io from 'socket.io-client'
import { SocketContext } from './context/SocketContext'
import { BandChart } from './components/BandChart'

function App() {

  const { online } = useContext(SocketContext)

  return (
    <div className="container">
      <div className="alert">
        <p>
          Service status:&nbsp;&nbsp;
          {
            online ? 
            <span className="text-success fw-bold">Online</span> :
            <span className="text-danger fw-bold">Offline</span>
          }
        </p>
      </div>
      <h1>BandNames</h1>
      <hr />
      
      <div className="row">
        <div className="col">
          <BandChart />
        </div>
      </div>

      <div className="row">
        <div className="col-8">
          <BandList/>
        </div>
        <div className="col-4">
          <BandAdd />
        </div>
      </div>
    </div>
  )
}

export default App
