// import {useEffect, useRef, useState} from "react";
// import {getSurveyInfoForBlog} from "../api/survey";
//
// const useBlog = (map) => {
//     const [location, setLocation] = useState({ lat: 0, lng: 0 });
//     const [surveyId, setSurveyId] = useState(null);
//     const databaseLocationsRef = useRef([]);
//     const databaseLocations = databaseLocationsRef.current;
//     const mapRef = useRef(null);
//     const arr = [];
//     useEffect(() => {
//         // useGeolocation의 useEffect 내부에서 데이터베이스에서 위치 정보를 가져오는 비동기 함수 호출
//         const fetchData = async () => {
//             try {
//                 const locations = await getSurveyInfoForBlog();
//                 databaseLocationsRef.current = locations;
//             } catch (error) {
//                 console.error('Failed to fetch locations from the database', error);
//             }
//         };
//
//         mapRef.current = map; // map 변수의 최신 값을 mapRef.current에 할당
//
//         fetchData();
//     }, [location, map]);
//
//     const onSuccess = (location) => {
//         setLocation({
//
//             lat: location.coords.latitude,
//             lng: location.coords.longitude
//
//         });
//
//         // 데이터베이스에서 받아온 경도와 위도 값과 비교하여 반경 1km 내에 있는지 확인
//         console.log("databaseLocations : ", databaseLocationsRef.current);
//
//         databaseLocationsRef.current.forEach((databaseLocation) => {
//             console.log("databaseLocation : ", databaseLocation);
//
//             const isValidLocation = validateLocation(databaseLocation, location);
//             console.log("isValidLocation : ", isValidLocation)
//
//             console.log("map: ", mapRef.current);
//
//             if (isValidLocation){
//                 setSurveyId(databaseLocation.surveyId);
//
//                 arr.push(surveyId);
//             }
//             console.log("arr : ", arr);
//         });
//
//         // 에러에 대한 로직
//         const onError = (error) => {
//             setLocation({
//                 lat: 0,
//                 lng: 0
//             })
//         }
//
//         useEffect(() => {
//             // navigator 객체 안에 geolocation이 없다면
//             // 위치 정보가 없는 것.
//             if (!("geolocation" in navigator)) {
//                 onError({
//                     code: 0,
//                     message: "Geolocation not supported",
//                 })
//             }
//             navigator.geolocation.getCurrentPosition(onSuccess, onError);
//         }, [])
//
//
//     }
//
//     return surveyId;
// }
// export {useBlog};