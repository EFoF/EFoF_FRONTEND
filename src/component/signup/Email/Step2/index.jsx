/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import Input from "../../../../ui/Input";
import {
  Container,
  Wrapper,
  FormWrapper,
  Title,
  SubTitle,
  Ment,
  Form,
  UserTypeTitle,
  UserTypeWrapper,
  UserType,
  LeftButton,
  RightButton,
  ButtonWrapper,
  TypeTitle,
  TypeSubTitle,
  CheckBox,
  Agree,
  AgreeButton,
  EtcWrapper,
  ButtonDisabled,
} from "./index.styles";
import useUserType from "../../../../hooks/useUserType";
import toastMsg from "../../../../ui/Toast";
import styled from "styled-components";

const WrapperScaled = styled(Wrapper)`
  transform: scale(0.625);
  transform-origin: top;
`;

export default function Step2() {
  const {
    name,
    onChangeName,
    types,
    onReplaceBack,
    onToggleCheck,
    onSubmitForm,
    signUpDone,
    signUpError,
    bchecked,
    checkHandler,
  } = useUserType();

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (signUpDone) {
  //     navigate("/login");
  //   }
  //   if (signUpError) {
  //     toastMsg("회원가입 실패. 다시 시도해주세요", false);
  //   }
  // }, [signUpDone, signUpError]);

  useEffect(() => {
    if (signUpDone) {
      navigate("/login");
    }
    if (signUpError) {
      toastMsg("회원가입 실패. 다시 시도해주세요", false);
    }
  }, [signUpDone, signUpError, navigate, toastMsg]);

  return (
    <Container>
      {/*<Wrapper>*/}
      <WrapperScaled>
        <FormWrapper>
          <div>
            <Title>DOKSEOL</Title>
            <SubTitle>독설 회원 정보 입력하기</SubTitle>
            <Ment>마지막 단계에요!</Ment>
          </div>
          <Form>
            <div>
            <Input
              value={name}
              onChange={onChangeName}
              size={30}
              label="별명"
              type="text"
            />
            </div>
            별명은 마이페이지에서 언제든지 변경하실 수 있습니다!
            <div>
              {/*<UserTypeTitle>*/}
              {/*  회원타입 선택<span> *</span>*/}
              {/*</UserTypeTitle>*/}
            </div>
            {/*{types.map(item => (*/}
            {/*  <UserTypeWrapper*/}
            {/*    checked={item.selected}*/}
            {/*    key={item.id}*/}
            {/*    onClick={() => {*/}
            {/*      onToggleCheck(item.id);*/}
            {/*    }}*/}
            {/*  >*/}
            {/*    {item.selected ? (*/}
            {/*      <Icon className="checked" border={0.5} size="3rem" />*/}
            {/*    ) : (*/}
            {/*      <Icon className="unchecked" border={0.5} size="3rem" />*/}
            {/*    )}*/}
            {/*    <UserType>*/}
            {/*      <TypeTitle> {item.title}</TypeTitle>*/}
            {/*      <TypeSubTitle>{item.subTitle}</TypeSubTitle>*/}
            {/*    </UserType>*/}
            {/*  </UserTypeWrapper>*/}
            {/*))}*/}
          </Form>
          <EtcWrapper>
            <CheckBox
              checked={bchecked}
              onChange={() => checkHandler()}
              type="checkbox"
              required
            />
            <Agree>DOKSEOL 가입 약관에 모두 동의합니다.</Agree>
            <AgreeButton>확인하기</AgreeButton>
          </EtcWrapper>
          <ButtonWrapper>
            <LeftButton
              buttonTheme="tertiary"
              title="이전"
              onClick={onReplaceBack}
            />
            {
              // (types[0].selected || types[1].selected) &&
            name.length > 0 &&
            bchecked ? (
              <RightButton onClick={onSubmitForm} title="가입 완료" />
            ) : (
              <ButtonDisabled title="가입 완료" disabled />
            )}
          </ButtonWrapper>
        </FormWrapper>
      </WrapperScaled>
      {/*</Wrapper>*/}
    </Container>
  );
}
