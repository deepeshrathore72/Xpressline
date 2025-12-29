import React, { useEffect,useState } from 'react';
import * as mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
// import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from '../states/action-creators/index';

const MapContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; /* Adjust the height as needed */
`;
function Map() {
    const latitude1 = useSelector((state) => state.reducer.latitude1);
    const longitude1 = useSelector((state) => state.reducer.longitude1);
    const latitude2 = useSelector((state) => state.reducer.latitude2);
    const longitude2 = useSelector((state) => state.reducer.longitude2);
    const dispatch = useDispatch();
    const [count,setCount] = useState(0);
    const [o,setO]=useState({
        latitude1:"",
        longitude1:""
    });
    const [d,setD]=useState({
        latitude2:"",
        longitude2:""
    });
    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiaGFyeGhoaGgiLCJhIjoiY2xwYTJkNjN4MDJrczJqb2J0OXA0eHR2ZSJ9.sDlw3eFcPqHN13QTSCZ8Fg';
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [-122.662323, 45.523751], // starting position
            zoom: 12
        });

        async function getRoute(origin,destination) {
            const query = await fetch(
                `https://api.mapbox.com/directions/v5/mapbox/cycling/${origin[0]},${origin[1]};${destination[0]},${destination[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
                { method: 'GET' }
            );
            const json = await query.json();
            const data = json.routes[0];
            const route = data.geometry.coordinates;
            const duration = data.legs[0].duration; // ETA in seconds
            const distance = data.legs[0].distance; // Distance in meters
            // console.log(JSON.stringify(data, null, 2));
            // console.log(`ETA: ${{ duration }} seconds, Distance: ${{ distance }} meters`);
            console.log("duration:"+duration)
            console.log("distance:"+distance)
            const geojson = {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'LineString',
                    coordinates: route
                }
            };
            if (map.getSource('route')) {
                map.getSource('route').setData(geojson);
            } else {
                map.addLayer({
                    id: 'route',
                    type: 'line',
                    source: {
                        type: 'geojson',
                        data: geojson
                    },
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    paint: {
                        'line-color': '#3887be',
                        'line-width': 5,
                    }
                });
            }
            console.log("l1:"+latitude1)
            console.log("l2:"+longitude1)
            console.log("l3:"+latitude2)
            console.log("l4:"+longitude2)
        }

        const geolocate = new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserHeading: true
        });

        map.addControl(geolocate);

        let origin = null;
        let destination = null;
        const markers = [];
        
        map.on('click', (event) => {
          const coords = Object.keys(event.lngLat).map((key) => event.lngLat[key]);
          const marker = new mapboxgl.Marker().setLngLat(coords).addTo(map);
          
          markers.push(marker);
          
          if (markers.length === 3) {
              // Remove the first two markers
              const markersToRemove = markers.splice(0, 2);
              markersToRemove.forEach((markerToRemove) => markerToRemove.remove());
          }
          
          if (!origin) {
              origin = coords;
              console.log("origin:" + origin);
              setO({
                  latitude1: origin[0],
                  longitude1: origin[1]
              });
          } else if (!destination) {
              destination = coords;
              console.log("destination:" + destination);
              setD({
                  latitude2: destination[0],
                  longitude2: destination[1]
              });
              if (origin && destination) {
                  getRoute(origin, destination);
              }
          } else {
              origin = coords;
              console.log("origin:" + origin);
              setO({
                  latitude1: origin[0],
                  longitude1: origin[1]
              });
              destination = null;
              console.log("destination:" + destination);
              setD({
                  latitude2: "",
                  longitude2: ""
              });
          }
      });
      
    }, []);
    return (
      <MapContainer>
            <div id="map" style={{ width: '800px', height: '600px' }} onClick={
                () => {
                    if(count%2==0){
                        dispatch(actionCreators.updateLatitude1(o.latitude1));
                        dispatch(actionCreators.updateLongitude1(o.longitude1));
                    }
                    else{
                        dispatch(actionCreators.updateLatitude2(d.latitude2));
                        dispatch(actionCreators.updateLongitude2(d.longitude2));
                    }
                    setCount(count+1);
                }
            }></div>
        </MapContainer>
    )
}

export default Map