import { ReactElement,FC } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth";

interface PublicRouteProps{
  children: ReactElement<any, any> | null;
}

export const PublicRoute:FC<PublicRouteProps> = ({ children })=> {
  const { auth:{ logged } } = useAuth()
  return !logged ?  children : <Navigate to={'/'} />
}
