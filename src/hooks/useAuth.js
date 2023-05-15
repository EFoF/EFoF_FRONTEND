import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { refreshAuth, loadMe } from "../api/auth";
// import { loadMsgReceived, loadMsgSend } from "../api/message";
import {useLocation, useNavigate} from "react-router";
import {authorizationActions} from "../slices/authorization";

export default function useAuth() {
    const navigator = useNavigate();
    const location = useLocation();
    const useUser = (loginRequired) => {
        const { IsUserLoggedIn } = useSelector((state) => state.user);

        if (!IsUserLoggedIn && loginRequired && typeof window !== "undefined") {
            // alert("로그인이 필요한 기능입니다.");
            navigator('/login');
            sessionStorage.setItem("prevPath", location.pathname);
        }

        if (IsUserLoggedIn && typeof window !== "undefined") {
            sessionStorage.setItem("prevPath", ``);
        }
    };

    return { useUser };
}
export const useRedirect = () => {
    const { loadMeError } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        switch (loadMeError?.code) {
            // 로그인 하지 않은 사용자가 요청
            case 400:
                break;
            // 액세스 토큰 만료
            case 401:
                refreshAuth()
                    .then(async (response) => {
                        // await dispatch(loadMe());
                        await dispatch(authorizationActions.setLoginDTO(response.data.loginLastDTO))
                    })
                    .catch(async () => {});
                break;
            // 접근 권한 없음(ex. ADMIN페이지에 USER가 접근)
            case 403:
                break;
            default:
                break;
        }
    }, [loadMeError]);
    return null;
};


export const useMessageRoomRedirect = () => {
    const { loadMeError } = useSelector((state) => state.user);
    const { tokenIssueDTO } = useSelector((state) => state.authorization);
    const { loadMsgSendError, loadMsgRecievedError } = useSelector(
        (state) => state.message,
    );
    const dispatch = useDispatch();
    useEffect(() => {
        switch (loadMeError?.code) {
            // 로그인 하지 않은 사용자가 요청
            case 400:
                break;
            // 액세스 토큰 만료
            case 401:
                refreshAuth(tokenIssueDTO.accessToken)
                    .then(async (response) => {
                        await dispatch(loadMe());
                        await dispatch(authorizationActions.setLoginDTO(response.data.loginLastDTO));
                        // await dispatch(loadMsgSend({ page: 0, size: 4 }));
                        // await dispatch(loadMsgReceived({ page: 0, size: 4 }));
                    })
                    .catch(async () => {});
                break;
            // 접근 권한 없음(ex. ADMIN페이지에 USER가 접근)
            case 403:
                break;
            default:
                break;
        }
    }, [loadMeError, loadMsgSendError, loadMsgRecievedError]);
    return null;
};
