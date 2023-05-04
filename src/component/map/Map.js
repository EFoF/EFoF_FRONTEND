import React from "react";

import { GoogleMap, useJsApiLoader,MarkerF } from '@react-google-maps/api';

import useGeolocation from './useGeolocation';

const containerStyle = {
    width: '100%',
    height: '475px'
};

const center = {
    lat: -3.745,
    lng: -38.523
};


function Map() {

    const location = useGeolocation();

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyD9iknGFg_WToN8fr8iin_83E_Gz6M2ims"
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(location);
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    const myStyles = [
        {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
        },
    ];

    return isLoaded ? (
        <div className="container">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={location}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                    zoom: 19,
                    disableDefaultUI: true,
                    styles: myStyles
                }}
            >
                { /* Child components, such as markers, info windows, etc. */ }
                <></>
                <MarkerF position={location}/>

            </GoogleMap>
        </div>
    ) : <></>
}

export default React.memo(Map)