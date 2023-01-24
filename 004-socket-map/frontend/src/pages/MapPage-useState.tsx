// https://docs.mapbox.com/mapbox-gl-js/guides/install/
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { useEffect, useRef, useState } from 'react';

mapboxgl.accessToken = 'pk.eyJ1IjoidGhvbXJvbWFuIiwiYSI6ImNsN2kxbGF4cTAzMHo0MW5zZXlhcHZtc2QifQ.G7deqrqIn6bhADb2GXJNKQ';
// const map = new mapboxgl.Map({
//     container: 'map', // container ID
//     style: 'mapbox://styles/mapbox/streets-v11', // style URL
//     center: [-74.5, 40], // starting position [lng, lat]
//     zoom: 9, // starting zoom
//     // projection: 'globe' // display the map as a 3D globe
// });
// map.on('style.load', () => {
//     map.setFog({}); // Set the default atmosphere style
// });
// window.navigator.geolocation.getCurrentPosition(console.log)
const initialCoords = {
  lng : -77.0428,
  lat:-12.0464,
  zoom:9
}

export const MapPage = () => {

  const mapDiv = useRef<HTMLDivElement>(null)
  const [map,setMap] = useState<mapboxgl.Map>()
  const [coods,setCoords] = useState(initialCoords)


  useEffect(()=>{
    setTimeout(() => {
      const mapBox = new mapboxgl.Map({
          container: mapDiv.current as HTMLDivElement, // container ID
          style: 'mapbox://styles/mapbox/streets-v11', // style URL
          center:[initialCoords.lng,initialCoords.lat],
          zoom: initialCoords.zoom
      });
      setMap(mapBox)
    }, 3000);
  },[])
  
  // escuchando el evento move
  useEffect(()=>{

    const onMove = (
      event:mapboxgl.MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & mapboxgl.EventData
    ) =>{
      const { lat,lng } = map!.getCenter()

      setCoords({
        lat:Number(lat.toFixed(4)),
        lng:Number(lng.toFixed(4)),
        zoom:Number(map!.getZoom().toFixed(4)) 
      })
    }

    map?.on('move',onMove)

    return () => {
      map?.off('move',onMove)
    }
  },[map])

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
