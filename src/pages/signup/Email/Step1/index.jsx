/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import Input from "../../../../ui/Input";
import {
  Container,
  Wrapper,
  FormWrapper,
  Title,
  SubTitle,
  Ment,
  Form,
  EmailWrapper,
  AuthButton,
  LeftButton,
  RightButton,
  ButtonDisabled,
  Wrong,
  Success,
  ButtonWrapper,
} from "./index.styles";

import useSignUp from "../../../../hooks/useSignUp";
import styled from "styled-components";

const WrapperScaled = styled(Wrapper)`
  transform: scale(0.625);
  transform-origin: top;
`;

function Step1() {
  const {
    email,
    isValidEmail,
    authNumber,
    onChangeAuthNumber,
    password,
    passwordCheck,
    onChangeEmail,
    onChangePassword,
    onChangePasswordCheck,
    isEmailConfirms,
    isConfirmedCode,
    isValidPassword,
    onSubmitEmailAuth,
    onReplaceBack,
    onReplaceNext,
    AuthTimer,
  } = useSignUp();

  const { time, min, sec, onStartTimer } = AuthTimer();
  const isPasswordValid = isValidPassword(password);
  return (
      <Container>
        {/*<Wrapper>*/}
        <WrapperScaled>
          <FormWrapper>
            <div>
              <Title>DOKSEOL</Title>
              <SubTitle>이메일로 가입하기</SubTitle>
              <Ment>반갑습니다 👋</Ment>
            </div>
            <Form>
              <div>
                <EmailWrapper>
                  <div style={{ display: 'flex', alignItems: 'end' }}>
                    <Input
                        value={email}
                        onChange={onChangeEmail}
                        size={22}
                        label="이메일 주소"
                        type="email"
                        required
                    />
                    {isValidEmail ? (
                        <AuthButton
                            title={min < 5 ? "재전송" : "인증"}
                            width="6.5rem"
                            onClick={onStartTimer}
                        />
                    ) : (
                        <AuthButton title="인증" width="6.5rem" disabled />
                    )}
                  </div>
                </EmailWrapper>
                {!isValidEmail && email.length > 0 && (
                    <Wrong>이메일 형식이 올바르지 않습니다.</Wrong>
                )}
              </div>
              {min < 5 && (
                  <div>
                    <EmailWrapper>
                      <div style={{ display: 'flex', alignItems: 'end' }}>
                        <Input
                            value={authNumber}
                            onChange={onChangeAuthNumber}
                            size={22}
                            label="인증번호 입력"
                            type="text"
                            required
                        />
                        {authNumber.length === 6 && !isEmailConfirms ? (
                            <AuthButton
                                title="인증"
                                width="9rem"
                                onClick={onSubmitEmailAuth}
                            />
                        ) : (
                            <AuthButton title="인증" width="9rem" disabled />
                        )}
                      </div>
                    </EmailWrapper>
                    {!isEmailConfirms && time.current > 0 && (
                        <Wrong>
                          {min < 10 ? `0${min}` : min} : {sec < 10 ? `0${sec}` : sec}
                        </Wrong>
                    )}
                    {!isEmailConfirms && time.current <= 0 && (
                        <Wrong>입력시간이 초과되었습니다. 재전송 버튼을 눌러주세요.</Wrong>
                    )}
                    {(isConfirmedCode == false) && (
                        <Wrong>인증 코드가 올바르지 않습니다. 다시 입력해주세요.</Wrong>
                    )}
                    {isEmailConfirms && (
                        <Success>이메일 인증이 완료되었습니다!</Success>
                    )}
                  </div>
              )}
              <Input
                  value={password}
                  onChange={onChangePassword}
                  size={30}
                  label="비밀번호"
                  type="password"
              />
              {password && !isPasswordValid && (
                  <Wrong>비밀번호는 8~20자 영문자, 숫자, 특수문자를 포함해야 합니다.</Wrong>
              )}
              <div>
                <Input
                    value={passwordCheck}
                    onChange={onChangePasswordCheck}
                    size={30}
                    label="비밀번호 확인"
                    type="password"
                />
                {passwordCheck.length > 0 && password !== passwordCheck ? (
                    <Wrong>비밀번호가 일치하지 않습니다.</Wrong>
                ) : null}
              </div>
              <ButtonWrapper>
                <div style={{ display: 'flex', alignItems: 'end' }}>
                  <LeftButton
                      onClick={onReplaceBack}
                      buttonTheme="tertiary"
                      title="이전"
                  />
                  {isValidEmail &&
                  password.length > 0 &&
                  password === passwordCheck &&
                  isValidPassword(password) == true &&
                  isEmailConfirms ? (
                      <RightButton onClick={onReplaceNext} title="다음" />
                  ) : (
                      <ButtonDisabled title="다음" disabled />
                  )}
                </div>
              </ButtonWrapper>
            </Form>
          </FormWrapper>
        </WrapperScaled>
        {/*</Wrapper>*/}
      </Container>
  );
}

export default Step1;
