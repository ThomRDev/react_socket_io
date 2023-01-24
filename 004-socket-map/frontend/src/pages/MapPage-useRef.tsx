// https://docs.mapbox.com/mapbox-gl-js/guides/install/
// https://epicreact.dev/why-you-shouldnt-put-refs-in-a-dependency-array/
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { useEffect, useRef, useState } from 'react';

mapboxgl.accessToken = 'pk.eyJ1IjoidGhvbXJvbWFuIiwiYSI6ImNsN2kxbGF4cTAzMHo0MW5zZXlhcHZtc2QifQ.G7deqrqIn6bhADb2GXJNKQ';

const initialCoords = {
  lng : -77.0428,
  lat:-12.0464,
  zoom:9
}

export const MapPageUseRef = () => {

  const mapDiv = useRef<HTMLDivElement>(null)
  // const [map,setMap] = useState<mapboxgl.Map>()
  const mapRef = useRef<mapboxgl.Map>()

  const [coods,setCoords] = useState(initialCoords)


  useEffect(()=>{

    // si la api se demora, el useRef a veces funca aveces nop
    // si queremos utilizar el useRef en lugar del useState, podemos colocar toda la logica del segundo useEffect dentro del primer useEffect
    setTimeout(() => {
      const mapBox = new mapboxgl.Map({
          container: mapDiv.current as HTMLDivElement, // container ID
          style: 'mapbox://styles/mapbox/streets-v11', // style URL
          center:[initialCoords.lng,initialCoords.lat],
          zoom: initialCoords.zoom
      });
      // setMap(mapBox)
      mapRef.current = mapBox
    }, 3000);
  },[])
  
  // escuchando el evento move
  useEffect(()=>{
    const onMove = (
      event:mapboxgl.MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & mapboxgl.EventData
    ) =>{
      // const { lat,lng } = map!.getCenter()
      const { lat,lng } = mapRef.current!.getCenter()

      setCoords({
        lat:Number(lat.toFixed(4)),
        lng:Number(lng.toFixed(4)),
        // zoom:Number(map!.getZoom().toFixed(4)) 
        zoom:Number(mapRef.current!.getZoom().toFixed(4)) 
      })
    }

    // map?.on('move',onMove)
    mapRef.current?.on('move',onMove)

    return () => {
      // map?.off('move',onMove)
      mapRef.current?.off('move',onMove)
    }
  // },[map])
  // no funca
  // },[mapRef])
  // },[mapRef.current])
  },[])

  return (
    <>
      <div className='info'>
        Lng: { coods.lng } | Lat: { coods.lat } | Zoom: { coods.zoom }
      </div>
      <div
      ref={mapDiv} 
        className='mapContainer'
      />
    </>
  )
}
