import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import * as io from "socket.io-client"

interface SocketContextProps {
  online : boolean
  socket:io.Socket
  vote : (id:string) =>void
  deleteBand:(id:string) =>void
  changeName:(id:string,name:string) => void
  addBand:(name:string) => void
}

interface SocketProviderProps {
  children?: React.ReactNode
}

export interface Band {
  name:string,
  id:string
  votes : number
}

export const SocketContext = createContext<SocketContextProps>({} as SocketContextProps)

export const SocketProvider = ({ children }:SocketProviderProps) => {
  
  const { online,socket } = useSocket('http://localhost:3000')


  const vote = useCallback((id:string) => {
    socket.emit('vote',id)
  },[socket])

  const deleteBand =  useCallback((id:string) => {
    socket.emit('remove',id)
  },[socket])

  const changeName = useCallback((id:string,name:string) => {
    socket.emit('change-name',{
      id,name
    })
  },[socket])
  
  const addBand = useCallback((name:string) => {
    socket.emit('add-band',name)
  },[socket])

  const data = useMemo(()=>({
    vote,
    deleteBand,
    changeName,
    addBand,
    online,
    socket,
  }),[vote, deleteBand, changeName, addBand,online,socket])

  return <SocketContext.Provider value={data}>
    { children }
  </SocketContext.Provider>
}
