import React, { useEffect,useState } from 'react';
import * as mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from '../states/action-creators/index';

const MapContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; /* Adjust the height as needed */
`;

function Map2() {
    const latitude1 = useSelector((state) => state.reducer.latitude1);
    const longitude1 = useSelector((state) => state.reducer.longitude1);
    const latitude2 = useSelector((state) => state.reducer.latitude2);
    const longitude2 = useSelector((state) => state.reducer.longitude2);
    const duration1 = useSelector((state) => state.reducer.duration);
    const distance1 = useSelector((state) => state.reducer.distance);
    const dispatch = useDispatch();
    var place1="";
    var place2="";

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiaGFyeGhoaGgiLCJhIjoiY2xwYTJkNjN4MDJrczJqb2J0OXA0eHR2ZSJ9.sDlw3eFcPqHN13QTSCZ8Fg';
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [-122.662323, 45.523751], // starting position
            zoom: 12
        });
        const storedLatitude1 = localStorage.getItem('latitude1');
        const storedLongitude1 = localStorage.getItem('longitude1');
        const storedLatitude2 = localStorage.getItem('latitude2');
        const storedLongitude2 = localStorage.getItem('longitude2');
        if(storedLatitude1 && storedLongitude1 && storedLatitude2 && storedLongitude2){
            getRoute([storedLatitude1,storedLongitude1],[storedLatitude2,storedLongitude2]);}
        async function getRoute(origin,destination) {
            const query = await fetch(
                `https://api.mapbox.com/directions/v5/mapbox/cycling/${origin[0]},${origin[1]};${destination[0]},${destination[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
                { method: 'GET' }
            );
            const location1= await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${origin[0]},${origin[1]}.json?access_token=${mapboxgl.accessToken}`,{method:'GET'});
            const location2= await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${destination[0]},${destination[1]}.json?access_token=${mapboxgl.accessToken}`,{method:'GET'});
            const json = await query.json();
            const json1 = await location1.json();
            const json2 = await location2.json();
            const data = json.routes[0];
            const route = data.geometry.coordinates;
            const duration = data.legs[0].duration; // ETA in seconds
            const distance = data.legs[0].distance; // Distance in meters
            console.log("duration:"+duration+"s")
            console.log("distance:"+distance+"m")
            place1=json1.features[0].place_name;
            console.log("origin:"+json1.features[0].place_name)
            place2=json2.features[0].place_name;
            console.log("destination:"+json2.features[0].place_name)
            dispatch(actionCreators.updateDuration(duration));
            dispatch(actionCreators.updateDistance(distance));
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
        }

        const geolocate = new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserHeading: true
        });

        map.addControl(geolocate);

        let origin = {latitude1,longitude1};
        let destination = {latitude2,longitude2};
        const markers = [];

        map.on('click', (event) => {
            const coords = Object.keys(event.lngLat).map((key) => event.lngLat[key]);
            const marker = new mapboxgl.Marker().setLngLat(coords).addTo(map);
            
            markers.push(marker);
            
            if (markers.length === 3) {
                // Remove the first two markers
                const markersToRemove = markers.splice(0, 2);
                markersToRemove.forEach((markerToRemove) => markerToRemove.remove());
                dispatch(actionCreators.updateLatitude2(""));
                dispatch(actionCreators.updateLongitude2(""));
            }
            
            if (!origin) {
                origin = coords;
                console.log("origin:" + origin);
                dispatch(actionCreators.updateLatitude1(origin[0]));
                dispatch(actionCreators.updateLongitude1(origin[1]));
            } else if (!destination) {
                destination = coords;
                console.log("destination:" + destination);
                dispatch(actionCreators.updateLatitude2(destination[0]));
                dispatch(actionCreators.updateLongitude2(destination[1]));
                if (origin && destination) {
                    getRoute(origin, destination);
                }
            } else {
                origin = coords;
                dispatch(actionCreators.updateLatitude1(origin[0]));
                dispatch(actionCreators.updateLongitude1(origin[1]));
                destination = null;
                console.log("destination:" + destination);
                dispatch(actionCreators.updateLatitude2(""));
                dispatch(actionCreators.updateLongitude2(""));
            }
        });
    }, []);

    useEffect(() => {
        console.log("l1::", latitude1);
        console.log("l2::", longitude1);
        console.log("l3::", latitude2);
        console.log("l4::", longitude2);
        console.log("l5::", duration1);
        console.log("l6::", distance1);
        localStorage.setItem('latitude1', latitude1);
        localStorage.setItem('longitude1', longitude1);
        localStorage.setItem('latitude2', latitude2);
        localStorage.setItem('longitude2', longitude2);
        localStorage.setItem('duration', duration1);
        localStorage.setItem('distance', distance1);
    }, [latitude1, longitude1, latitude2, longitude2,duration1,distance1,place1,place2]);
  return (
    <MapContainer><div id="map" style={{ width: '800px', height: '600px' }}></div>
    </MapContainer>
  )
}

export default Map2