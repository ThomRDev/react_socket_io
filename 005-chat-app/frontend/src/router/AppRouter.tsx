import { useEffect } from 'react'
import { BrowserRouter, Routes, Navigate, Route } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { ChatPage } from '../pages/ChatPage'
import { AuthRoute } from './AuthRoute'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
export const AppRouter = () => {

  const { auth,verifyToken } = useAuth()

  useEffect(()=>{
    verifyToken()
  },[])

  if(auth.checking){
    return <h1>Cargando ...</h1>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/auth/*'
          element={
            <PublicRoute>
              <AuthRoute />
            </PublicRoute>
          }
        />
        <Route
          path='/'
          element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          }
        />
        
        <Route path='*' element={<Navigate to={'/'} />} />
      </Routes>
    </BrowserRouter>
  )
}
