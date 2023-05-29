import React, {useState} from "react";

import { GoogleMap, useJsApiLoader, MarkerF, Circle, Marker } from '@react-google-maps/api';

import useGeolocation from './useGeolocation';
// import useBlog from '/src/hooks/useBlog'

const containerStyle = {
    width: '100%',
    // height: '475px'
    height: '650px'
};

const center = {
    lat: -3.745,
    lng: -38.523
};


function Map() {
    const [map, setMap] = React.useState(null);

    const { location } = useGeolocation(map);
    // const { surveyId } = useBlog(map);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyD9iknGFg_WToN8fr8iin_83E_Gz6M2ims"
    })


    const [markers, setMarkers] = useState([]);


    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(location);
        map.fitBounds(bounds);

        setMap(map)
    }, []);

    const handleValidMarkerClick = (markerPosition) => {
        setMarkers((prevMarkers) => [...prevMarkers, markerPosition]);
    };

    // const location = useGeolocation(map, handleValidMarkerClick);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    const handleCircleLoaded = (circle) => {
        const bounds = new window.google.maps.LatLngBounds(location);
        bounds.extend(circle.getBounds().getNorthEast());
        bounds.extend(circle.getBounds().getSouthWest());
        map.fitBounds(bounds);
    };

    const myStyles = [
        {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
            // stylers: [{ visibility: "on" }],
        },
    ];

    console.log("location : ", location);

    return isLoaded ? (
        <div className="container">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={location}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                    // zoom: 19,
                    zoom: 17,
                    disableDefaultUI: true,
                    styles: myStyles
                }}
            >
                { /* Child components, such as markers, info windows, etc. */ }
                <></>


                {/*내 위치 표시*/}
                <MarkerF position={location}/>
                {/*<Marker position={location}/>*/}
                {/*<MarkerF position={(location.lat+1, location.lng-1)}/>*/}
                {/*<Marker position={{ lat: 33.2152917, lng: 129.9590608 }} />*/}
                <MarkerF position={{ lat: 33.2152917, lng: 129.9590608 }} />

                {markers.map((markerPosition, index) => (
                    <Marker
                        key={index}
                        position={markerPosition}
                        onClick={() =>handleValidMarkerClick(markerPosition)}
                    />
                ))}

                {/*주변 설문 표시*/}
                {/*{location && <MarkerF position={} />}*/}

                {/* 반경 1km인 원 */}
                <Circle
                    center={location}
                    radius={500}
                    options={{
                        strokeColor: "#fca6a6",
                        // strokeColor: "#00FF00",
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        // fillColor: "#FF0000",
                        fillColor: "#fca6a6",
                        fillOpacity: 0.35,
                    }}
                    onLoad={handleCircleLoaded}
                />
            </GoogleMap>
        </div>
    ) : <></>
}

export default React.memo(Map)