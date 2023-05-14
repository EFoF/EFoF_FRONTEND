import axios, {AxiosRequestConfig} from "axios";
import API from "./config";
import {authorizationActions} from "../slices/authorization";

axios.defaults.baseURL = API.BASE_URL;
axios.defaults.withCredentials = true;

let store;

export const injectStore = _store => {
  store = _store
}

const authorizationClient = axios.create({
  baseURL: API.BASE_URL,
  withCredentials: true,
});

const setHeader = (accessToken) => {
  console.log("재시도 토큰 : " + accessToken);
  authorizationClient.defaults.headers.common['Authorization'] = "Bearer " + accessToken;
  axios.defaults.headers.common['Authorization'] = "Bearer " + accessToken;
}


authorizationClient.interceptors.response.use(

    response => {
      return response;
    },
    error => {
      console.log("유효하지 않은 토큰값");
      console.dir(error);
      switch (error.response.status) {
        // 액세스 토큰 만료
        case 401: {
          return axios
            .post(API.REISSUE)
            .then((response) => {
              // 여기서 ReIssue한 토큰을 반영해주지 않으면 에러 무한 루프가 발생한다.
              // 만료 -> ReIssue -> 반영 안됨 -> 만료 -> ReIssue -> 반영안됨 -> ...
              // 그런데 여기서 setHeader를 부르거나 authorization.defaults.headers.. 이렇게 설정을 해주면 아주 재미난 일이 발생한다.
              // 따라서 시행착오 끝에 아래와 같은 구조로 다시 보내게 되는 요청에 직접 header를 설정해주겠다.
              // 또한 비컴포넌트에서는 dispatch를 사용할 수 없는데, 이를 사용하기 위해서 store를 주입받아 왔다.
              store.dispatch(authorizationActions.setToken(response.data));
              return authorizationClient.request({
                ...error.config,
                headers: {
                  ...error.config.headers,
                  'Authorization': `Bearer ${response.data.accessToken}`,
                }
              });
            })
            .catch((error) => {
              console.log(error);
              // toastMsg("인증이 만료되었습니다. 다시 로그인해주세요.", false);
              // window.location.replace("/login");
            });
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
  
  export { authorizationClient, unAuthorizationClient, setHeader };
  