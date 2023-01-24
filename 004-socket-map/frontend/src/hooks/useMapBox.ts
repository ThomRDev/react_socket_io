import { CoordsInitialState } from './../interfaces/Coords';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { useCallback, useEffect, useRef, useState } from 'react';
import {v4} from 'uuid'
import { Subject } from 'rxjs'

type MarkerType = mapboxgl.Marker & { id:string } 



mapboxgl.accessToken = 'pk.eyJ1IjoidGhvbXJvbWFuIiwiYSI6ImNsN2kxbGF4cTAzMHo0MW5zZXlhcHZtc2QifQ.G7deqrqIn6bhADb2GXJNKQ';
export const useMapBox = (initialCoords:CoordsInitialState) => {

  const mapDiv = useRef<HTMLDivElement | null>(null)
  const markersRef = useRef({} as any)

  // referencia al div del mapa
  const setRef = useCallback((node:HTMLDivElement)=>{
    mapDiv.current = node
  },[])

  // en esta parte tambien puedo usar un useState y que cambie cada ves que el marcador se mueve
  // o poner directamente el useContext del socket y obtener el socket
  // y emitir
  // pero estariamos combinando varias cosas en este custom hook
  // asi que utilizaremos Observables de rxjs
  // y que este custom hook useMapBox no tenga nada externo
  const movementOfAMarker = useRef(new Subject()) 
  const newMarker = useRef(new Subject())


  const [map,setMap] = useState<mapboxgl.Map>()
  const [coods,setCoords] = useState(initialCoords)


  useEffect(()=>{
    // QUITE EL SETTIMEOUT, CREO QUE ESTO ES SINCRONO
    const mapBox = new mapboxgl.Map({
        container: mapDiv.current as HTMLDivElement, // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center:[initialCoords.lng,initialCoords.lat],
        zoom: initialCoords.zoom
    });
    setMap(mapBox)
  },[initialCoords])
  
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


  const addMarker = useCallback((
    event:mapboxgl.MapLayerEventType & mapboxgl.EventData,id:undefined | string = undefined
  ) => {
    console.log('cambie');
    const { lat,lng } = event.lngLat || event
    const marker = new mapboxgl.Marker() as MarkerType
    // Object.defineProperty(marker,'id',{
    //   value : v4(),
    //   writable: true,
    //   enumerable: true,
    //   configurable: true
    // })

    marker.id = id ?? v4()
    marker
    .setLngLat([lng,lat])
    .addTo(map as mapboxgl.Map)
    .setDraggable(true)

    // markersRef.current[ marker.id ] = {
    //   lng,lat,
    //   id : marker.id
    // };
    markersRef.current[ marker.id ] = marker
    
    // !TODO si el marcador tiene ID no emitir
    // esto quiere decir que el markador fue creado por el click
    if(!id){
      newMarker.current.next({
        id:marker.id,
        lng,lat
      })
    }

    // drag emite en todo momento que se arrastre, hasy otros INVESTIGAR SI LO NECESITAS
    // dragStart,dragEnd etc
    marker.on('drag',(evt:any)=>{
      const { id } = evt.target
      const { lng,lat } = evt.target.getLngLat()
      // !TODO EMITIR LOS CAMBIOS DEL MARCADOR
      movementOfAMarker.current.next({
        id,
        lng,lat
      })
    })

  },[map])

  const updateMarker = useCallback(({id,lng,lat}:any)=>{
    markersRef.current[id].setLngLat([lng,lat])
  },[map])

  // agregar marcadores cuando se hace click
  useEffect(()=>{
    // const onClick = 
    map?.on('click',addMarker)
    return () => {
      map?.off('click',addMarker)
    }
  },[map,addMarker])

  return {
    coods,
    setRef,
    // mapDiv,
    markersRef,
    addMarker,
    newMarker$ : newMarker.current,
    movementOfAMarker$ : movementOfAMarker.current,
    updateMarker
  }
}
