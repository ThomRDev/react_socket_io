import { useEffect, useMemo, useState } from "react"
import * as io from "socket.io-client"

export const useSocket = (serverPath:string) => {
  
  const [online, setOnline] = useState(false)
  const socket = useMemo(()=>io.connect(serverPath,{
    transports:['websocket']
  }),[serverPath])
  
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
      // socket.off('connect');
      // socket.off('disconnect')
    }
  },[socket])

  return{
    socket,
    online
  }
}