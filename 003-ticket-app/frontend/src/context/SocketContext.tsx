import { createContext, useMemo } from "react"
import * as io from "socket.io-client"
import { useSocket } from "../hooks/useSocket"
interface SocketContextProps {
  online : boolean
  socket:io.Socket
}

interface SocketProviderProps {
  children?: React.ReactNode
}
export const SocketContext = createContext<SocketContextProps>({} as SocketContextProps)

export const SocketProvider = ({ children }:SocketProviderProps) => {
  
  const { online,socket } = useSocket('http://localhost:3000')

  const data = useMemo(()=>({
    online,
    socket,
  }),[online,socket])

  return <SocketContext.Provider value={data}>
    { children }
  </SocketContext.Provider>
}
