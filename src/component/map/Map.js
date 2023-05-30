import React, {useEffect, useRef, useState} from "react";

import { GoogleMap, useJsApiLoader, MarkerF, Circle, Marker } from '@react-google-maps/api';

import useGeolocation from './useGeolocation';
import {fetchLocation} from "../../api/survey";

const containerStyle = {
    width: '100%',
    // height: '475px'
    height: '650px'
};

const center = {
    lat: -3.745,
    lng: -38.523
};

function Map({ onInfosUpdate, onMarkerClick }) {

    const [map, setMap] = React.useState(null);

    const { location } = useGeolocation(map);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyD9iknGFg_WToN8fr8iin_83E_Gz6M2ims"
    })
    // const [currentIndex, setCurrentIndex] = useState(0);

    const databaseLocationsRef = useRef([]);
    const databaseLocations = databaseLocationsRef.current;

    console.log("databaseLocations : ", databaseLocationsRef.current);

    const [markers, setMarkers] = useState([]);
    const [infos, setInfos] = useState([]);


    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(location);
        map.fitBounds(bounds);

        setMap(map)
    }, []);

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const locations = await fetchLocation(location);
                databaseLocationsRef.current = locations;
                setMarkersFromDB();
                setInfosFromDB();
            } catch (error) {
                console.error('Failed to fetch locations from the database', error);
            }
        };
        fetchData();
    }, [location]);

    const setMarkersFromDB = () => {
        if (databaseLocationsRef.current) {
            const markerPositions = databaseLocationsRef.current.map((loc) => {
                return { lat: loc.lat, lng: loc.lng };
            });
            setMarkers(markerPositions);
        }
    };

    const setInfosFromDB = () => {
        if (databaseLocationsRef.current) {
            const Infos = databaseLocationsRef.current.map((loc) => {
                return { loc };
            });
            setInfos(Infos);
            onInfosUpdate(Infos); // onInfosUpdate 함수를 호출하여 infos 값을 전달
        }
    };

    // const handleMarkerClick = (markerIndex) => {
    //     onMarkerClick(markerIndex);
    // };

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

                {markers.map((markerPosition, index) => (
                    <Marker
                        key={index}
                        position={markerPosition}
                        options={{
                            icon: {
                                path: window.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW, // 원 모양 아이콘
                                fillColor: 'green', // 색상 설정 (파란색)
                                fillOpacity: 1, // 색상의 불투명도 (1은 완전히 불투명)
                                strokeWeight: 0.2, // 외곽선의 두께 (0은 표시하지 않음)
                                scale: 7, // 아이콘의 크기 (원의 반지름)
                                // url: greenMarkerIcon, // 초록색 마커 아이콘 이미지 경로
                            },
                        }}
                        onClick={() => onMarkerClick(index)} // 추가. 클릭 시 handleMarkerClick 호출하여 인덱스 전달
                    />
                ))}

                {/* 반경 1km인 원 */}
                <Circle
                    center={location}
                    radius={1000}
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