import { createContext, ReactNode, useCallback, useMemo, useState } from "react";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import { useChat } from "../hooks";

interface AUTH_STATE {
  auth:{
    checking:boolean,
    logged:boolean,
    name?:null | string,
    email?:null | string,
    uid?:null | string
  },
  login:(email:string,password:string)=>Promise<void | boolean>,
  register:(name:string,email:string,password:string)=>Promise<true|string>,
  verifyToken:()=>Promise<boolean>,
  logout:()=>void,
}

interface AuthProviderProps {
  children?:ReactNode
}

const initialState = {
  checking:true,
  logged:false,
  name:null,
  email:null,
  uid:null
}

export const AuthContext = createContext<AUTH_STATE>({} as AUTH_STATE)
export const AuthProvider = ({ children }:AuthProviderProps)=>{

  const [auth,setAuth] = useState(initialState)
  const { clearData } = useChat()
  

  const login = useCallback(async (email:string,password:string)=>{
    setAuth({
      checking: true,
      logged: false,
      email:null,
      name:null,
      uid:null
    });
    const resp = await fetchWithoutToken('api/auth/login',{email,password},'POST')
    if(resp.ok){
      localStorage.setItem('token',resp.token)
      const { user } = resp
      setAuth({
        checking:false,
        logged:true,
        name:user.name,
        email:user.email,
        uid:user.uid
      })
    }else{
      setAuth({
        checking: false,
        logged: false,
        email:null,
        name:null,
        uid:null
      });
    }
    return resp.ok
  },[])

  const register = useCallback(async (name:string,email:string,password:string)=>{
    setAuth({
      checking: true,
      logged: false,
      email:null,
      name:null,
      uid:null
    });
    const resp = await fetchWithoutToken('api/auth/register',{name,email,password},'POST')
    if ( resp.ok ) {
      localStorage.setItem('token', resp.token );
      const { user } = resp;
      setAuth({
          uid: user.uid,
          checking: false,
          logged: true,
          name: user.name,
          email: user.email,
      });
      return true;
    }else{
      setAuth({
          uid: null,
          checking: false,
          logged: false,
          name: null,
          email: null,
      });
    }

    return resp.msg;
  },[])

  const logout = useCallback(()=>{
    localStorage.removeItem('token');
    setAuth({
        checking: false,
        logged: false,
        email:null,
        name:null,
        uid:null
    });
    clearData()
  },[])


  const verifyToken = useCallback(async ()=>{
    const token = localStorage.getItem('token')
    if(!token){
      setAuth({
        checking: false,
        logged: false,
        email:null,
        name:null,
        uid:null
      });
      return false
    }
    const resp = await fetchWithToken('api/auth/renew')
    if(resp.ok){
      localStorage.setItem('token', resp.token );
      const { user } = resp;
      setAuth({
          uid: user.uid,
          checking: false,
          logged: true,
          name: user.name,
          email: user.email,
      });
    }else{
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
    });
    }
    return resp.ok
  },[])

  
  return <AuthContext.Provider value={{login,auth,register,logout,verifyToken}}>
    {
      children
    }
  </AuthContext.Provider>
}