import { getEnvVariables } from "./getEnvVariables"

const { VITE_BACKEND_URL } = getEnvVariables()

export const fetchWithToken = 
async (endpoint:string,data:any = {},method = 'GET') => {
  const token = localStorage.getItem('token') || ''
  const headers = new Headers()
  headers.append('x-token',token)
  headers.append('Content-type','application/json')
  const url = `${VITE_BACKEND_URL}/${endpoint}`
  if(method == 'GET'){
    const response = await fetch(url,{
      headers
    })
    return await response.json()
  }else{
    const response = await fetch(url,{
      method,
      headers,
      body:JSON.stringify(data)
    })
    return await response.json()
  }
}
export const fetchWithoutToken = 
async (endpoint:string,data:any,method = 'GET') => {
  const headers = new Headers()
  headers.append('Content-type','application/json')
  const url = `${VITE_BACKEND_URL}/${endpoint}`

  if(method == 'GET'){
    const response = await fetch(url,{
      headers
    })
    return await response.json()
  }else{
    const response = await fetch(url,{
      method,
      headers,
      body:JSON.stringify(data)
    })
    return await response.json()
  }
}