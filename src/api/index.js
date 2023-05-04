import axios from "axios";
import API from "./config";

axios.defaults.baseURL = API.BASE_URL;
axios.defaults.withCredentials = true;

const authorizationClient = axios.create({
  baseURL: API.BASE_URL,
  withCredentials: true,
});

// authorizationClient.interceptors.request.use(
//     (config) => {
//       const cookie = getCookieFromStorage()
//     }
// )

authorizationClient.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      switch (error.response.data.code) {
        // 액세스 토큰 만료
        case 401: {
          return axios
            .post(API.REISSUE)
            .then(() => {
              return authorizationClient.request(error.config);
            })
            .catch(() => {});
        }
        case 400:
          break;
        // 접근 권한 없음(ex. ADMIN페이지에 USER가 접근)
        case 403:
          break;
        default:
          break;
      }
      console.error("[Axios]", error);
      return Promise.reject(error);
    },
  );

// 얘네는 권한 필요 없는 애들
// ex : 로그인, 회원가입 -> 이런 기능은 권한을 요구하면 사람들이 가입을 못하겠쥬?
  const unAuthorizationClient = axios.create({
    baseURL: API.BASE_URL,
    withCredentials: true,
  });
  
  unAuthorizationClient.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      console.error("[Axios]", error);
      return Promise.reject(error);
    },
  );
  
  export { authorizationClient, unAuthorizationClient };
  