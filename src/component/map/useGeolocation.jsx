import {useState, useEffect, useRef} from 'react';
import {fetchLocation} from "../../api/survey";
import {MarkerF} from '@react-google-maps/api';

const useGeolocation = (map, onValidMarkerClick) => {
    const [location, setLocation] = useState({ lat: 0, lng: 0 });
    const [surveyId, setSurveyId] = useState(null);
    // console.log("surveyId : ",surveyId);

    // const [surveyIds, setSurveyIds] = useState([]);
    // const arr=[];

    console.log("map : ", map);

    const databaseLocationsRef = useRef([]);
    const databaseLocations = databaseLocationsRef.current;
    const mapRef = useRef(null);

    // useEffect(() => {
    //     // useGeolocation의 useEffect 내부에서 데이터베이스에서 위치 정보를 가져오는 비동기 함수 호출
    //     const fetchData = async () => {
    //         try {
    //             const locations = await fetchLocation();
    //             databaseLocationsRef.current = locations;
    //         } catch (error) {
    //             console.error('Failed to fetch locations from the database', error);
    //         }
    //     };
    //
    //     mapRef.current = map; // map 변수의 최신 값을 mapRef.current에 할당
    //
    //     fetchData();
    // }, [location, map]);

    // 성공에 대한 로직
    const onSuccess = (location) => {
        setLocation({

            lat: location.coords.latitude,
            lng: location.coords.longitude

        });

        // 데이터베이스에서 받아온 경도와 위도 값과 비교하여 반경 1km 내에 있는지 확인
        // console.log("databaseLocations : ", databaseLocationsRef.current);

        // databaseLocationsRef.current.forEach((databaseLocation) => {
        //     console.log("databaseLocation : ", databaseLocation);
        //
        //     const isValidLocation = validateLocation(databaseLocation, location);
        //     console.log("isValidLocation : ", isValidLocation)
        //
        //     console.log("map: ", mapRef.current);
        //
        //     const markerPosition = {
        //         lat: databaseLocation.lat,
        //         lng: databaseLocation.lng
        //     };
        //
        //     console.log("markerPosition : ", markerPosition);
        //
        //     if (isValidLocation && typeof onValidMarkerClick === "function"){
        //         onValidMarkerClick(markerPosition);
        //     }
        //
        //     if (isValidLocation){
        //         setSurveyId(databaseLocation.surveyId);
        //         arr.push(databaseLocation.surveyId);
        //         // setSurveyIds((prevState) => [...prevState, databaseLocation.surveyId]);
        //     }
        //     // console.log("arr : ", arr)
        //
        //     // const getSurveyInfoForBlog = (arr) => {
        //     //     getSurveyInfoForBlog(arr);
        //     // }
        //
        //
        //
        //     // const handleValidMarkerClick = (markerPosition) => {
        //     //     console.log("마커가 클릭되었습니다:", markerPosition);
        //     //     // 클릭 이벤트가 발생했을 때 실행될 로직을 작성
        //     // };
        //
        //     // if (isValidLocation) {
        //     //     // 반경 1km 내에 있으면 해당 위치를 마커로 표시
        //     //     const marker = new window.google.maps.Marker({
        //     //         position: {
        //     //             lat: databaseLocation.lat,
        //     //             lng: databaseLocation.lng,
        //     //         },
        //     //         map: mapRef.current,
        //     //         // 추가적인 마커 설정을 원하면 여기에 추가
        //     //     });
        //     //     // <MarkerF position={marker.position}/>
        //     //
        //     //     // 마커 클릭 이벤트 리스너 추가
        //     //     window.google.maps.event.addListener(marker, 'click', function () {
        //     //         // 마커를 클릭했을 때 실행될 동작을 정의
        //     //         console.log('마커가 클릭되었습니다.');
        //     //         // 여기에 클릭 이벤트가 발생했을 때 실행될 로직을 작성
        //     //     });
        //     //     return marker.position;
        //     // }
        //
        // });
    }

    // const validateLocation = (databaseLocation, myLocation) => {
    //     // 반경 1km 내에 있는지 검증하는 로직
    //     const distance = getDistance(databaseLocation, myLocation);
    //     console.log("distance : ", distance);
    //     return distance <= 1; // 1km 내에 있는 경우 true, 그렇지 않은 경우 false
    // };

    // const getDistance = (location1, location2) => {
    //     // 경도와 위도 값을 기반으로 두 위치 간의 거리를 계산하는 함수
    //     // 거리 계산 로직을 구현해야 합니다.
    //     // 예: Haversine formula 등을 사용하여 거리를 계산할 수 있습니다.
    //     // 계산된 거리를 반환합니다.
    //     const earthRadius = 6371; // 지구의 반지름 (단위: km)
    //
    //     const lat1 = location1.lat;
    //     const lng1 = location1.lng;
    //     const lat2 = location2.coords.latitude;
    //     const lng2 = location2.coords.longitude;
    //     const toRadians = (degrees) => {
    //         return degrees * (Math.PI / 180);
    //     };
    //
    //     const deltaLat = toRadians(lat2 - lat1);
    //     const deltaLng = toRadians(lng2 - lng1);
    //
    //     const a =
    //         Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    //         Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    //         Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
    //
    //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    //
    //     const distance = earthRadius * c;
    //
    //     return distance;
    // };

    // 에러에 대한 로직
    const onError = (error) => {
        setLocation({
            lat: 0,
            lng: 0
        })
    }

    useEffect(() => {
        // navigator 객체 안에 geolocation이 없다면
        // 위치 정보가 없는 것.
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported",
            })
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError);

        // (async () => {
        //     const position = await new Promise((resolve, reject) => {
        //         navigator.geolocation.getCurrentPosition(resolve, reject);
        //     }).catch(onError);
        //
        //     if (position) {
        //         onSuccess(position);
        //     }
        // })();

        // navigator.geolocation.watchPosition(onSuccess, onError);
    }, [])

    // useEffect(() => {
    //     // surveyIds가 변경될 때마다 실행되는 함수
    //     const fetchSurveyInfo = async () => {
    //         console.log("surveyIds.length : ", surveyIds.length)
    //         if (surveyIds.length > 0) {
    //             try {
    //                 const response = await getSurveyInfoForBlog(arr);
    //                 console.log(response);
    //                 // 받아온 블로그 정보를 컴포넌트 상태 또는 콘솔에 출력하거나 이를 사용하여 어떤 작업을 수행합니다.
    //             } catch (error) {
    //                 console.log(error);
    //             }
    //         }
    //     }
    //     fetchSurveyInfo();
    // },[surveyIds])




    return {
        location,
        surveyId,
    };
}

// export default useGeolocation;
export default useGeolocation;
