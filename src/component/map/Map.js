import React, {useEffect, useRef, useState} from "react";

import {GoogleMap, useJsApiLoader, MarkerF, Circle, Marker, InfoWindow} from '@react-google-maps/api';

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

function Map({onInfosUpdate, onMarkerClick}) {

    const [map, setMap] = React.useState(null);

    const {location} = useGeolocation(map);

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyD9iknGFg_WToN8fr8iin_83E_Gz6M2ims"
    })

    const databaseLocationsRef = useRef([]);
    const databaseLocations = databaseLocationsRef.current;

    const [markers, setMarkers] = useState([]);

    const [infos, setInfos] = useState([]);

    const [selectedMarker, setSelectedMarker] = useState(null);

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
            // stylers: [{ visibility: "off" }],
            stylers: [{visibility: "on"}], // 주변 상점들까지 포함되서 나오게 하는 옵션
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const locations = await fetchLocation(location);
                databaseLocationsRef.current = locations;
                setMarkersFromDB();
                setInfosFromDB();
            } catch (error) {
                // console.error('Failed to fetch locations from the database', error);
            }
        };
        fetchData();
    }, [location]);

    const setMarkersFromDB = () => {
        if (databaseLocationsRef.current) {
            const markerPositions = databaseLocationsRef.current.map((loc) => {
                return {lat: loc.lat, lng: loc.lng};
            });
            setMarkers(markerPositions);
        }
    };

    const setInfosFromDB = () => {
        if (databaseLocationsRef.current) {
            const Infos = databaseLocationsRef.current.map((loc) => {
                return {loc};
            });
            setInfos(Infos);
            onInfosUpdate(Infos); // onInfosUpdate 함수를 호출하여 infos 값을 전달
        }
    };

    const handleMarkerClick = (markerIndex, markerPosition, map) => {
        if (selectedMarker && selectedMarker.index === markerIndex) {
            // 이미 선택된 마커를 클릭한 경우
            return;
        }

        setSelectedMarker({
            index: markerIndex,
            position: markerPosition,
            data: markers[markerIndex],
        });
    };

    useEffect(() => {
        if (selectedMarker) {
            // 선택된 마커가 있을 때에만 InfoWindow 렌더링
            const markerIndex = selectedMarker.index;
            const markerPosition = selectedMarker.position;
            const mapElement = map; // map 변수가 의존성으로 추가되어야 함

            const handleWindowClick = () => {
                const sliderElement = document.getElementById("Slider");
                if (sliderElement) {
                    sliderElement.scrollIntoView({behavior: "smooth"});
                    onMarkerClick(markerIndex, markerPosition, mapElement);
                }
            };

            // InfoWindow 렌더링
            const infoWindow = new window.google.maps.InfoWindow({
                position: selectedMarker.position,
                onCloseClick: () => setSelectedMarker(null),
                options: {pixelOffset: {width: 0, height: -30}},
            });

            // InfoWindow에 컨텐츠 추가
            const content = document.createElement("div");
            const title = document.createElement("div");
            title.style.fontWeight = "bold";
            title.innerHTML = `제목: ${infos[selectedMarker.index].loc.title}<br/>`;
            const description = document.createElement("div");
            description.innerHTML = `설명: ${infos[selectedMarker.index].loc.description}`;
            content.appendChild(title);
            content.appendChild(description);

            const button = document.createElement("button");
            button.style.backgroundColor = "white";
            button.style.border = "0";
            button.onclick = handleWindowClick;
            button.appendChild(content);

            infoWindow.setContent(button);
            infoWindow.open(map);

        }
    }, [selectedMarker, map, infos, onMarkerClick]);


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
                    zoom: 15.5,
                    disableDefaultUI: true,
                    // disableDefaultUI: false, //위성 사진 나올 수 있게하는 옵션
                    styles: myStyles
                }}
            >
                { /* Child components, such as markers, info windows, etc. */}
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
                        // onClick={() => onMarkerClick(index, markerPosition, map)} // 추가. 클릭 시 handleMarkerClick 호출하여 인덱스 전달
                        onClick={() => handleMarkerClick(index, markerPosition, map)}
                    />

                ))}
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