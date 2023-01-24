import { useContext } from "react"
import { SocketContext } from "../context"

export const useAuthSocket = () => {
  return useContext(SocketContext)
}
