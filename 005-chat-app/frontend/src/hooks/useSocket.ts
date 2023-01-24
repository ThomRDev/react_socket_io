import { useCallback, useEffect,useMemo,useState } from "react"
import * as io from 'socket.io-client'
export const useSocket = (serverPath:string) => {

  const [socket,setSocket] = useState<io.Socket | null>(null)
  const [online,setOnline] = useState(false)


  const connectSocket = useCallback(()=>{
    const token = localStorage.getItem('token')

    const temporalSocket = io.connect(serverPath,{
      transports:['websocket'],
      autoConnect:true,
      forceNew:true,
      query:{
        'x-token':token
      }
    })
    setSocket(temporalSocket)
  },[serverPath])

  const disconnectSocket = useCallback(()=>{
    socket?.disconnect()
  },[socket])

  useEffect(()=>{
    setOnline(socket?.connected as boolean)
  },[socket])

  useEffect(() => {
    socket?.on("connect", () => {
        setOnline(true);
    });
  }, [socket]);
  useEffect(() => {
    socket?.on("disconnect", () => {
        setOnline(false);
    });
  }, [socket]);
  return {
    socket,
    online,
    connectSocket,
    disconnectSocket
  }
}