import { createContext, useEffect } from "react";
import * as io from 'socket.io-client'
import { useSocket } from "../hooks/useSocket";
import { useMemo,ReactNode } from 'react'
import { useAuth } from "../hooks/useAuth";
import { useChat } from "../hooks/useChat";
import { scrollToBottomAnimated } from "../helpers/scrollToBottom";
interface SocketContextProps {
  socket:io.Socket | null,
  online:boolean
}
interface SocketProviderProps {
  children?:ReactNode
}
export const SocketContext = createContext<SocketContextProps>({} as SocketContextProps)
export const SocketProvider = ({ children }:SocketProviderProps) => {
  const { online,socket,connectSocket,disconnectSocket } = useSocket('http://localhost:8000')
  const { loadUsers,newMessage } = useChat()
  const { auth } = useAuth()

  useEffect(()=>{
    if(auth.logged){
      connectSocket()
    }
  },[auth,connectSocket])

  useEffect(()=>{
    if(!auth.logged){
      disconnectSocket()
    }
  },[auth,disconnectSocket])


  useEffect(()=>{
    socket?.on('list-users',(users)=>{
      console.log(users)
      loadUsers(users)
    })
  },[socket,loadUsers])

  useEffect(()=>{
    socket?.on('private-message',(message)=>{
      newMessage(message)
    })
  },[socket,loadUsers])

  const data = useMemo(()=>({
    online,
    socket,
  }),[online,socket])
  return <SocketContext.Provider value={data} >
    { children }
  </SocketContext.Provider>
}