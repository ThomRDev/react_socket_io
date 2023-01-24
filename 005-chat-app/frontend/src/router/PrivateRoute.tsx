import { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

interface PrivateRouteProps{
  children: ReactNode
}

export const PrivateRoute = ({ children }:PrivateRouteProps) => {
  const { auth:{ logged } } = useAuth()
  return  <>{
    logged ? children : <Navigate to={'/auth/login'}  />
  }</>
}
