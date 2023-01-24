import { ChangeEvent, useContext, useEffect, useState } from "react"
import { Band, SocketContext } from "../context/SocketContext"

export const BandList = () => {


  const {socket,changeName,vote,deleteBand } = useContext(SocketContext)

  const [bands,setBands] = useState<Band[]>([])

  useEffect(()=>{
    socket.on('current-bands',(bands:Band[]) => {
      setBands(bands)
    })
    return ()=> {
      socket.off('current-bands')
    }
  },[socket])

  const onChangeInput = (event:ChangeEvent<HTMLInputElement>,id:string) => {
    event.preventDefault()
    setBands((bds:any)=>bds.map((bd:any)=>{
      if(bd.id== id) {
        bd.name = event.target.value
      }
      return bd
    }))
  }

  const onBlurInput = (id:string,name:string) => {
    changeName(id,name)
  }



  const createRows = () => {
    return (
      bands.map((band:any) => <tr key={band.id}>
        <td>
          <button className="btn btn-primary"
            onClick={() => vote(band.id)}
          >+1</button>
        </td>
        <td>
          <input 
            type="text" 
            value={band.name}
            onChange={(event)=>onChangeInput(event,band.id)}
            onBlur={() => onBlurInput(band.id,band.name)} 
          />
        </td>
        <td>
          <h3>{band.votes}</h3>
        </td>
        <td><button className="btn btn-danger"
        onClick={()=>deleteBand(band.id)}
        >Borrar</button></td>
      </tr>)
    )
  }
  
  return (
    <>
      <h3>Bandas actuales</h3>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>
          {
            createRows()
          }
        </tbody>
      </table>
    </>
  )
}
