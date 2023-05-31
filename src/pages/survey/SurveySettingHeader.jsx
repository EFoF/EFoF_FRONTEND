import React from 'react';
import styled from 'styled-components';
import { FaArrowRight,FaArrowLeft } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import {useNavigate} from "react-router-dom";
import toastMsg from '../../ui/Toast';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  /* background-color: #eee; */
`;

const ArrowButton = styled.button`
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: black;
  transition: 0.1s;

  &:hover {
    color: gray;
    transform: scale(1.1);
  }
`;

export default function SurveySettingHeader({surveyId}) {
  const navigate = useNavigate();
  const handleLeftClick = () => {
    navigate(`/form/pre-release/${surveyId}`);
  };

  const handleRightClick = () => {
    toastMsg("설문 생성이 완료 되었습니다.",true)
    navigate('/');
    // 오른쪽 화살표 클릭 이벤트 처리
  };

  return (
    <HeaderWrapper>
      <ArrowButton onClick={handleLeftClick}>
        <FaArrowLeft size="2rem" />
      </ArrowButton>
        <h1>설문 constraints</h1>
      <ArrowButton onClick={handleRightClick}>
        <FaCheck size="2rem" />
      </ArrowButton>
    </HeaderWrapper>
  );
}
