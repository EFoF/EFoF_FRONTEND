/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap';
import { useState } from "react";
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
import { Wrong } from "../Step1/index.styles";
import PrivacyPolicyDetail from "./PrivacyPolicyDetail";

const StyledLink = styled(Link)`
  color: black;
`;

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
        isValidName,
    } = useUserType();

    const navigate = useNavigate();

    const isNameValid = isValidName(name);

    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };
    const policy = useCallback(() => {
        navigate("/privacy-policy");
    }, [navigate]);

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
                        <StyledLink to="/">
                            <Title>DOKSEOL</Title>
                        </StyledLink>
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
                            {name && !isNameValid && (
                                <Wrong>별명은 최소 2글자 최대 8글자입니다.</Wrong>
                            )}
                        </div>
                        별명은 마이페이지에서 언제든지 변경하실 수 있습니다!
                    </Form>
                    <EtcWrapper>
                        <CheckBox
                            checked={bchecked}
                            onChange={() => checkHandler()}
                            type="checkbox"
                            required
                        />
                        <Agree>DOKSEOL 가입 약관에 모두 동의합니다.</Agree>
                        <AgreeButton>
                            <Button variant="primary" onClick={openModal} class="btn btn-primary">
                                약관 확인
                            </Button>
                            <Modal show={modalOpen} onHide={closeModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title>개인정보 처리 방침</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="row justify-content-center">
                                        <div className="col-lg-10">
                                            <PrivacyPolicyDetail />
                                        </div>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="primary" onClick={closeModal}>
                                        확인
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </AgreeButton>
                    </EtcWrapper>
                    <ButtonWrapper>
                        <LeftButton
                            buttonTheme="tertiary"
                            title="이전"
                            onClick={onReplaceBack}
                        />
                        {
                            // (types[0].selected || types[1].selected) &&
                            isNameValid == true &&
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
