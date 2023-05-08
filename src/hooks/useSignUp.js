import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCallback, useState, useRef, useEffect } from "react";
import { authEmailSend, authEmailConfirms } from "../api/auth";
import {userActions} from "../slices/user";
import useInput from "./useInput";
import toastMsg from "../ui/Toast";

export default function useSignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, onChangeEmail] = useInput("");
  const [authNumber, onChangeAuthNumber] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [passwordCheck, onChangePasswordCheck] = useInput("");
  const [isEmailConfirms, setIsEmailConfirms] = useState(false);

  const emailReg =
      /^[0-9a-zA-Z가-힣]([-_.]?[0-9a-zA-Z가-힣])*@[0-9a-zA-Z가-힣]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const isValidEmail = emailReg.test(email);

  const onCheckEmailAuth = () => {
    authEmailSend(email);
  };

  // const onSubmitEmailAuth = useCallback(() => {
  //   authEmailConfirms(email, authNumber)
  //       .then((res) => {
  //         const isConfirmedEmail = res.data;
  //         if (isConfirmedEmail) setIsEmailConfirms(true);
  //       })
  //       .catch((err) => {
  //         if (err.response.status === 403) {
  //           console.error("에러!");
  //         }
  //       });
  // }, [authNumber]);

  //의존성 배열에 email을 추가
  const onSubmitEmailAuth = useCallback(() => {
    authEmailConfirms(email, authNumber)
        .then((res) => {
          const isConfirmedEmail   = res.data.matches;
          if (isConfirmedEmail) setIsEmailConfirms(true);
          else {

            toastMsg("인증에 실패했습니다.",isConfirmedEmail);
          }
        })
        .catch((err) => {
          if (err.response.status === 403) {
            console.error("에러!");
          }
        });
  }, [email, authNumber]);


  const AuthTimer = () => {
    const VALIDTIME = 300;
    const time = useRef(VALIDTIME);

    const intervalRef = useRef(null);

    const [min, setMin] = useState(5);
    const [sec, setSec] = useState(0);

    const decreaseNum = () => {
      time.current -= 1;
      setMin(Math.floor(time.current / 60));
      setSec(time.current % 60);
    };
    const onStartTimer = () => {
      clearInterval(intervalRef.current);
      time.current = 300; // 재전송 눌렀을 때 5분으로 초기화
      setMin(time.current);
      onCheckEmailAuth();
      intervalRef.current = setInterval(decreaseNum, 1000);
      return () => clearInterval(intervalRef.current);
    };

    useEffect(() => {
      if (time.current <= 0) {
        clearInterval(intervalRef.current);
      }
    }, [sec]);

    return { time, min, sec, onStartTimer };
  };

  const onReplaceBack = () => {
    navigate("/signup");
  };

  const onReplaceNext = () => {
    dispatch(
        userActions.signUp({
          email,
          password,
          loginType: "GENERAL_LOGIN",
          authority: "ROLE_USER",
        }),
    );
    navigate("/signup/inform");
  };

  return {
    email,
    isValidEmail,
    authNumber,
    onChangeAuthNumber,
    password,
    passwordCheck,
    onChangeEmail,
    onChangePassword,
    onChangePasswordCheck,
    onCheckEmailAuth,
    isEmailConfirms,
    onReplaceBack,
    onReplaceNext,
    onSubmitEmailAuth,
    AuthTimer,
  };
}
