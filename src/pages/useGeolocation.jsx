import { useState, useEffect } from 'react';


const useGeolocation = () => {
  const [location, setLocation] = useState({
    lat: 0, lng: 0, }
  )

  // 성공에 대한 로직
  const onSuccess = (location) => {
    setLocation({
      
        lat: location.coords.latitude,
        lng: location.coords.longitude
      
    })
  }

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
  }, [])

  return location;
}

export default useGeolocation
