import { useEffect, useState } from 'react'
import './App.css'
import { BandAdd } from './components/BandAdd'
import { BandList } from './components/BandList'
import * as io from 'socket.io-client'

// esto me hace varias llamadas a mi backend
const connectSocketServer = () => {
  const socket = io.connect('http://localhost:3000',{
    // indica al servidor que tipo de comunicacion se hara
    transports:['websocket']
  })
  return socket
}

function App() {
  const [socket] = useState( connectSocketServer() )
  const [online, setOnline] = useState(false)

  const [bands,setBands] = useState<any>([])

  useEffect(()=>{
    setOnline(socket.connected)
  },[socket])


  useEffect(()=>{
    socket.on('connect',()=>{
      setOnline(true)
    })

    return ()=>{
      socket.disconnect()
    }
  },[socket])
  
  useEffect(()=>{
    socket.on('disconnect',()=>{
      setOnline(false)
    })
    return ()=>{
      socket.disconnect()
    }
  },[socket])
  useEffect(()=>{
    socket.on('current-bands',bands=>{
      setBands(bands)
    })
  },[socket])

  const vote = (id:string) => {
    socket.emit('vote',id)
  }

  const deleteBand =  (id:string) => {
    socket.emit('remove',id)
  }

  const changeName = (id:string,name:string) => {
    socket.emit('change-name',{
      id,name
    })
  }
  
  const addBand = (name:string) => {
    socket.emit('add-band',name)
  }

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
        <div className="col-8">
          <BandList
            data={bands}
            vote={vote}
            changeName={changeName}
            deleteBand={deleteBand}
          />
        </div>
        <div className="col-4">
          <BandAdd
            addBand={addBand}
          />
        </div>
      </div>
    </div>
  )
}

export default App
