// import React, { useEffect } from 'react';
// import mapboxgl from 'mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
// import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
// import styled from 'styled-components';

// // const MapContainer = styled.div`
// //   display: flex;
// //   justify-content: center;
// //   align-items: center;
// //   height: 50vh; /* Adjust the height as needed */
// // `;

// // const Second = () => {
// //   useEffect(() => {
// //     mapboxgl.accessToken = 'pk.eyJ1IjoiaGFyeGhoaGgiLCJhIjoiY2xwYTJkNjN4MDJrczJqb2J0OXA0eHR2ZSJ9.sDlw3eFcPqHN13QTSCZ8Fg';
    
// //     const map = new mapboxgl.Map({
// //       container: 'map',
// //       style: 'mapbox://styles/mapbox/streets-v11',
// //       center: [-79.4512, 43.6568],
// //       zoom: 12,
// //     });

// //     map.addControl(
// //       new mapboxgl.GeolocateControl({
// //         positionOptions: {
// //           enableHighAccuracy: true,
// //         },
// //         trackUserLocation: true,
// //         showUserHeading: true,
// //       })
// //     );

// //     navigator.geolocation.getCurrentPosition(function (position) {
// //       var center = [position.coords.longitude, position.coords.latitude];
// //       map.setCenter(center);
// //     });

// //     map.on('load', function () {
// //       map.addSource('route', {
// //         type: 'geojson',
// //         data: {
// //           type: 'FeatureCollection',
// //           features: [],
// //         },
// //       });

// //       map.addLayer({
// //         id: 'route',
// //         type: 'line',
// //         source: 'route',
// //         layout: {
// //           'line-join': 'round',
// //           'line-cap': 'round',
// //         },
// //         paint: {
// //           'line-color': '#888',
// //           'line-width': 8,
// //         },
// //       });
// //     });

// //     const directions = new MapboxDirections({
// //       accessToken: mapboxgl.accessToken,
// //       interactive: true,
// //     });

// //     directions.on('route', function (event) {
// //       const route = event.route[0]; // Assuming there is only one route
// //       const origin = route.geometry.coordinates[0];
// //       const destination = route.geometry.coordinates[route.geometry.coordinates.length - 1];

// //       console.log('Origin:', origin);
// //       console.log('Destination:', destination);

// //       // You can use the origin and destination coordinates as needed
// //       // For example, display them on the map as markers
// //       new mapboxgl.Marker().setLngLat(origin).addTo(map);
// //       new mapboxgl.Marker().setLngLat(destination).addTo(map);
// //     });

// //     map.addControl(directions, 'top-left');
// //   }, []);

// //   return (
// //     <MapContainer>
// //       <div id="map" style={{ width: '570px', height: '400px' }} />
// //     </MapContainer>
// //   );
// // };

// // export default Second;



// // import React, { useEffect } from 'react';
// // import mapboxgl from 'mapbox-gl';
// // import 'mapbox-gl/dist/mapbox-gl.css';
// // import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
// // import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
// // import styled from 'styled-components';

// // const MapContainer = styled.div`
// //   display: flex;
// //   justify-content: center;
// //   align-items: center;
// //   height: 50vh; /* Adjust the height as needed */
// // `;

// // const Second=()=> {
// //   useEffect(() => {
// //   mapboxgl.accessToken = 'pk.eyJ1IjoiaGFyeGhoaGgiLCJhIjoiY2xwYTJkNjN4MDJrczJqb2J0OXA0eHR2ZSJ9.sDlw3eFcPqHN13QTSCZ8Fg'
// //   const map= new mapboxgl.Map({
// //     container: 'map',
// //     style: 'mapbox://styles/mapbox/streets-v11',
// //     center:[-79.4512, 43.6568],
// //     zoom:12,
// //   });
// //   map.addControl(
// //     new mapboxgl.GeolocateControl({
// //       positionOptions:{
// //         enableHighAccuracy:true,
// //       },
// //       trackUserLocation:true,
// //       showUserHeading:true,
// //     })
// //   );
// //   navigator.geolocation.getCurrentPosition(function(position){
// //     var center=[position.coords.longitude,position.coords.latitude];
// //     map.setCenter(center);
// //   });
// //   map.on('load',function(){
// //     map.addSource('route',{
// //       type:'geojson',
// //       data:{
// //         type:'FeatureCollection',
// //         features:[],
// //       },
// //     });
// //     map.addLayer({
// //       id:'route',
// //       type:'line',
// //       source:'route',
// //       layout:{
// //         'line-join':'round',
// //         'line-cap':'round',
// //       },
// //       paint:{
// //         'line-color':'#888',
// //         'line-width':8,
// //       },
// //     });
// //   });
// //   map.addControl(
// //     new MapboxDirections({
// //       accessToken:mapboxgl.accessToken,
// //     }),
// //     'top-left'
// //   );
// // },[]);
// //   return (
// //     <MapContainer>
// //       <div id="map" style={{ width: '570px', height: '400px' }} />
// //     </MapContainer>    
// //   )
// // }

// // export default Second

// const Map = () => {
//   useEffect(() => {
//     mapboxgl.accessToken = 'pk.eyJ1IjoiaGFyeGhoaGgiLCJhIjoiY2xwYTJkNjN4MDJrczJqb2J0OXA0eHR2ZSJ9.sDlw3eFcPqHN13QTSCZ8Fg';

//     const map = new mapboxgl.Map({
//       container: 'map',
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: [-79.4512, 43.6568],
//       zoom: 12,
//     });

// //     const MapContainer = styled.div`
// //   display: flex;
// //   justify-content: center;
// //   align-items: center;
// //   height: 100vh; /* Adjust the height as needed */
// // `;
//     map.addControl(
//       new mapboxgl.GeolocateControl({
//         positionOptions: {
//           enableHighAccuracy: true,
//         },
//         trackUserLocation: true,
//         showUserHeading: true,
//       })
//     );

//     navigator.geolocation.getCurrentPosition(function (position) {
//       var center = [position.coords.longitude, position.coords.latitude];
//       map.setCenter(center);
//     });

//     map.on('load', function () {
//       map.addSource('route', {
//         type: 'geojson',
//         data: {
//           type: 'FeatureCollection',
//           features: [],
//         },
//       });

//       map.addLayer({
//         id: 'route',
//         type: 'line',
//         source: 'route',
//         layout: {
//           'line-join': 'round',
//           'line-cap': 'round',
//         },
//         paint: {
//           'line-color': '#888',
//           'line-width': 8,
//         },
//       });
//     });

//     map.addControl(new MapboxDirections({
//       accessToken: mapboxgl.accessToken,
//     }), 'top-left');

//   }, []); // Empty dependency array to run the effect only once

//   return (
//     <div id="map" style={{ width: '570px', height: '400px' }} />
//   );
// };

// export default Map;





//
import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import styled from 'styled-components';

const MapContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; /* Adjust the height as needed */
`;
// const Map = () => {
//   useEffect(() => {
//     mapboxgl.accessToken = 'pk.eyJ1IjoiaGFyeGhoaGgiLCJhIjoiY2xwYTJkNjN4MDJrczJqb2J0OXA0eHR2ZSJ9.sDlw3eFcPqHN13QTSCZ8Fg';

//     const map = new mapboxgl.Map({
//       container: 'map',
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: [-79.4512, 43.6568],
//       zoom: 12,
//     });

//     map.addControl(
//       new mapboxgl.GeolocateControl({
//         positionOptions: {
//           enableHighAccuracy: true,
//         },
//         trackUserLocation: true,
//         showUserHeading: true,
//       })
//     );

//     navigator.geolocation.getCurrentPosition(function (position) {
//       var center = [position.coords.longitude, position.coords.latitude];
//       map.setCenter(center);
//     });

//     map.on('load', function () {
//       map.addSource('route', {
//         type: 'geojson',
//         data: {
//           type: 'FeatureCollection',
//           features: [],
//         },
//       }
      
//       );

//       map.addLayer({
//         id: 'route',
//         type: 'line',
//         source: 'route',
//         layout: {
//           'line-join': 'round',
//           'line-cap': 'round',
//         },
//         paint: {
//           'line-color': '#888',
//           'line-width': 8,
//         },
//       });
//     });

//     map.addControl(new MapboxDirections({
//       accessToken: mapboxgl.accessToken,
//     }), 'top-left');

//   }, []); // Empty dependency array to run the effect only once

//   return (
//     <MapContainer>
//       <div id="map" style={{ width: '570px', height: '400px' }} />
//     </MapContainer>
//   );
// };

// export default Map;