import React, { useCallback } from "react";
import {Link, useNavigate} from "react-router-dom";
import { GREY } from "../../component/constants/color";
import LayoutContainer from "../../component/styles/LayoutContainer";
import {
  Wrapper,
  Title,
  SubTitle,
  ButtonWrapper,
  SNSButton,
  StyledLine,
  LoginWrapper,
  Login,
} from "./index.styles";

import styled from "styled-components";

const StyledLink = styled(Link)`
  color: black;
`;

const WrapperScaled = styled(Wrapper)`
  transform: scale(0.625);
  transform-origin: top;
`;

export default function Signup() {
  const navigate = useNavigate();

  const googleSignup = `http://localhost:8080/oauth2/authorization/google?redirect_uri=http://localhost:3000/demo/react/abstrak`;
  const kakaoSignup = `http://localhost:8080/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/redirect`;

  const EmailLogin = useCallback(() => {
    navigate("/signup/email");
  }, [navigate]);

  return (
    <LayoutContainer>
      <WrapperScaled>
        <Title>DOKSEOL</Title>
        <SubTitle>
          독설에 오신걸 환영해요!
          <br />
          설문 조사를 상황에 맞게 만들어보세요!
        </SubTitle>
        <ButtonWrapper>
          <SNSButton
              title="이메일로 가입하기"
              // ImgSrc="none"
              size={0}
              onClick={EmailLogin}
          />
          <StyledLine width="100%" color={GREY[400]} />
          <SNSButton
            title="구글 계정으로 가입하기"
            ImgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/320px-Google_%22G%22_Logo.svg.png"
            href={googleSignup}
            color={GREY[100]}
            size={2.5}
          />
          <SNSButton
            title="카카오 계정으로 가입하기"
            ImgSrc="https://cdn.imweb.me/upload/S20210304872ba49a108a8/89a68d1e3674a.png"
            href={kakaoSignup}
            color="#f9da49"
            size={2.5}
          />
        </ButtonWrapper>
        <LoginWrapper>
          <div>
            계정이 있으신가요?
            <Login>
              <StyledLink to="/login">로그인하기</StyledLink>
            </Login>
          </div>
        </LoginWrapper>
      </WrapperScaled>
    </LayoutContainer>
  );
}
