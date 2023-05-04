import React, { useState } from "react";

import styled from "styled-components";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from 'react-redux';
import { questionActions } from "../../slices";
import ConfirmModal from "../../ui/ConfirmModal";

const Wrapper = styled.div`
  background: white;
  padding: 1.2rem;
  margin-top: 2rem;
  width:100%;
  border-radius: 10px;
  display: flex;
position: relative;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow:visible;
  /* border:3px solid; */
border: 3p  x solid ${({ theme }) => theme.color.gray};
`;

const Text = styled.span`
  font-size: 1rem;
position: absolute;
top: 1.5rem;
left: 1.5rem;
  margin-right: 1rem;
  white-space: nowrap;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: end;
  height: 2rem;
  /* background-color: red; */
  justify-content: start;
  margin-bottom: -1rem;
`;


const WrapperSelect = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  flex-direction: column;
  
`;
const SectionButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0.5rem;
  border-radius: 5px;
  &:hover {
    color: ${({ theme }) => theme.color.blue};
    font-weight: bold;
    background-color: ${({ theme }) => theme.color.gray};
  }
`;




export default function Section({ section_idx, section_len }) {
  const dispatch = useDispatch();



  const handleAddSection = () => {
    dispatch(questionActions.addSection());
  };
  const { questions } = useSelector((state) => state.form);

  const handleDeleteSection = () => {
    const handleConfirm = () => {
      dispatch(questionActions.deleteSection({ section_idx }));
      ReactDOM.unmountComponentAtNode(document.getElementById("modal-root"));
    };

    const handleCancel = () => {
      // 취소 버튼 클릭 시 처리할 코드 작성
      ReactDOM.unmountComponentAtNode(document.getElementById("modal-root"));
    };
    const confirmModal = <ConfirmModal message={section_idx + "번째 섹션을 삭제하시겠습니까?"} onConfirm={handleConfirm} onCancel={handleCancel} />;
    ReactDOM.render(confirmModal, document.getElementById("modal-root"));
  };


  return (
    <Wrapper>
      {questions.length === 1 ? null : (
      <Text>
        
        {section_len}개 중 {section_idx}번째 섹션
      </Text>)}
     
        <WrapperSelect>
          <IconWrapper>
           
            {questions.length === 1 ? null : (
            <SectionButton onClick={handleDeleteSection}>섹션 삭제</SectionButton> )}
             <SectionButton onClick={handleAddSection}>섹션 추가</SectionButton>
          </IconWrapper>
        </WrapperSelect>
     
    </Wrapper>

  );
}
