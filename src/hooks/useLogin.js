import { useNavigate } from "react-router";
import { authLogin, authLogout } from "../api/auth";
import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 원래 useInput을 통해서 받아왔지만, 자꾸 타입 에러가 떠서 포기하고 그냥 여기서 선언함.
  // 로그인 화면에서 사용자가 이메일, 패스워드로 입력한 값을 받아오는데 사용됨.
  const onChangeEmail = ({target}) => {
    setEmail(target.value);
  }
  const onChangePassword = ({target}) => {
    setPassword(target.value);
  }

  const dispatch = useDispatch();
  const { loginDone, me } = useSelector((state) => state.user);

  const useoAuthRedirct = () => {
    // 인증 완료 후, 세션에 저장된 직전 페이지 경로가 있다면 해당 페이지로, 
    // 없다면 홈화면으로 redirection
    const prevPath = sessionStorage.getItem("prevPath");
    if (prevPath) {
      navigate('${prevPath}');
    } else {
      navigate('/');
    }
  };

  const useLogout = useCallback(async () => {
    console.log("로그아웃 요청 실행")
    // Cookies.remove('tokenPublishConfirm');
    await dispatch(authLogout());
    window.location.replace("/");
  }, []);


  const onSubmitForm = useCallback(
      (e) => {
        e.preventDefault();
        dispatch(authLogin({ email, password }));

      },
      [email, password],
  );

  useEffect(() => {
    // 로그인이 완료돼서 fulfilled action이 전송되면 loginDone이 true로 변경되고 me 객체에 값이 할당된다.
    // 로그아웃이 되어도 리다이렉션이 일어나는 것을 방지하기 위해서 me 객체도 함께 고려한다.
    if (loginDone && me) {
      navigate('/', {replace:true});
    }
  }, [loginDone]);

  return {
    email,
    onChangeEmail,
    password,
    onChangePassword,
    onSubmitForm,
    useoAuthRedirct,
    useLogout,
  };
}