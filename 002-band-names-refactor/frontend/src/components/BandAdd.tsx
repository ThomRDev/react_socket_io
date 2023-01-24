import { FormEvent, useContext, useState } from "react"
import { SocketContext } from "../context/SocketContext"

export const BandAdd = () => {

  const { addBand } = useContext(SocketContext)
  const [newBand,setNewBand] = useState('')

  const onSubmitAddBand = (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if(newBand.trim().length){
      addBand(newBand.trim())
      setNewBand('')
    }
    
  }
  return (
    <>
      <h3>Agregar Banda</h3>
      <form onSubmit={onSubmitAddBand} >
        <input type="text" 
        className="form-control"
        value={newBand}
        onChange={(e)=>setNewBand(e.target.value)}
        placeholder="Nuevo nombre de banda"
        />
      </form>
    </>
  )
}
