import React, { useCallback } from "react";
import Input from "../../ui/Input";
import {
  Container,
  Wrapper,
  Title,
  SubTitle,
  Form,
  LoginButton,
  CheckBox,
  AutoLogin,
  FindPW,
  EtcWrapper,
  SNSWrapper,
  ImgWrapper,
  SNSIMG,
  SNSIMG2,
  SignUp,
} from "./index.styles";
import useLogin from "../../hooks/useLogin";
import styled from "@emotion/styled";
import {Link} from "react-router-dom";

const WrapperScaled = styled(Wrapper)`
    transform: scale(0.625);
    transform-origin: top;
  `;

const StyledLink = styled(Link)`
  color: black;
`;
export default function Login() {
  const { email, onChangeEmail, password, onChangePassword, onSubmitForm } =
      useLogin();
  // const { email, onChangeEmail, password, onChangePassword, onSubmitForm } ={};
  const googleLogin = `http://localhost:8080/oauth2/authorization/google?redirect_uri=http://localhost:3000/demo/react/abstrak`;
  const kakaoLogin = ``;

  const onClickGoogleLogin = useCallback(() => {
    window.location.href = googleLogin;
  }, []);
  const onClickKakaoLogin = useCallback(() => {
    window.location.href = kakaoLogin;
  }, []);
  return (
      <Container>
        <WrapperScaled>
          <Title>DOKSEOL</Title>
          <SubTitle>설문을 스마트하게, 독설</SubTitle>
          <Form onSubmit={onSubmitForm}>
            <Input
                value={email}
                onChange={onChangeEmail}
                size={35}
                label="이메일"
                type="email"
                required
            />
            <Input
                value={password}
                onChange={onChangePassword}
                size={35}
                label="비밀번호"
                type="password"
                required
            />
            <LoginButton>로그인</LoginButton>
          </Form>
          <EtcWrapper>
            <CheckBox type="checkbox" />
            <AutoLogin>로그인 유지</AutoLogin>
            <FindPW>비밀번호 찾기 {">"}</FindPW>
          </EtcWrapper>
          <SNSWrapper>
            SNS로 간편하게 로그인
            <br />
            <ImgWrapper>
              <SNSIMG2
                  size={4}
                  onClick={onClickGoogleLogin}
                  ImgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/320px-Google_%22G%22_Logo.svg.png"
                  color={"white"}
              />
              <SNSIMG2
                  onClick={onClickKakaoLogin}
                  size={4}
                  ImgSrc="https://cdn.imweb.me/upload/S20210304872ba49a108a8/89a68d1e3674a.png"
                  color={"white"}

              />
              {/* <SNSIMG src = "https://i.pinimg.com/564x/fb/71/04/fb71048e03a5ada757f70d61b583d0bf.jpg"/> */}
            </ImgWrapper>
            <div>
              아직 독수리 설문 회원이 아니신가요?
              <br />
              <SignUp>
                {/* <Link href="/signup">회원가입하기</Link> */}
                <StyledLink to="/signup">
                  회원가입하기
                </StyledLink>
              </SignUp>
            </div>
          </SNSWrapper>
        </WrapperScaled>
      </Container>
  );
}