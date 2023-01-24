
import { useContext, useEffect } from "react"
import { SocketContext } from "../context/SocketContext"
import { useMapBox } from "../hooks/useMapBox"

const initialCoords = {
  lng : -77.0428,
  lat:-12.0464,
  zoom:9
}

export const MapPage = () => {

  // const { coods,mapDiv } = useMapBox(initialCoords)
  const { coods,setRef,newMarker$,movementOfAMarker$,addMarker,updateMarker } = useMapBox(initialCoords)

  const { socket } = useContext(SocketContext)

  useEffect(()=>{
    socket.on('active-markers',(markers)=>{
      // cuando obtengo los marcadores
      // quiero crearlos en el mapa
      // console.log(markers)
      // console.log(markers);
      for( const key of Object.keys( markers ) ) {
        addMarker(markers[key],key)
      }
    })
  },[socket,addMarker])

  useEffect(()=>{
    socket.on('new-marker',(marker)=>{
      // cuando obtengo los marcadores
      // quiero crearlos en el mapa
      // console.log(markers)
      // console.log(markers);
      addMarker(marker,marker.id)
    })
  },[socket,addMarker])


  useEffect(()=>{
    newMarker$.subscribe(marker => {
      // emitir de aqui con el socket
      // para no tener que meterlo dentro del useMapBox
      // console.log(marker);
      socket.emit('new-marker',marker)
    })
    return () => {
      newMarker$.unsubscribe()
    }
  },[newMarker$])

  useEffect(()=>{
    movementOfAMarker$.subscribe(marker => {
      socket.emit('update-marker',marker)
    })
    return () => {
      movementOfAMarker$.unsubscribe()
    }
  },[movementOfAMarker$])

  useEffect(()=>{
    socket.on('update-marker',marker=>{
      updateMarker(marker)
    })
  },[socket])

  return (
    <>
      <div className='info'>
        Lng: { coods.lng } | Lat: { coods.lat } | Zoom: { coods.zoom }
      </div>
      <div
      ref={setRef} 
        className={`mapContainer`}
      />
    </>
  )
}
