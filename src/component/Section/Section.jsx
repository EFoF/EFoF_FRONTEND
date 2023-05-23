import React, { useState } from "react";

import styled from "styled-components";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from 'react-redux';
import {questionActions, surveyFlowActions} from "../../slices";
import ConfirmModal from "../../ui/ConfirmModal";
import shortid from 'shortid';
import { addSection,deleteSection} from "../../api/survey";
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

  const { form,questions } = useSelector((state) => state.form);
  const { indexes, currentIndex } = useSelector((state) => state.surveyFlow);

  const newQuestionId = shortid();
  const newSection = {
    id: shortid(),
    nextSectionId:'',
    questionOrder:newQuestionId,
    questionList: [{
      id: newQuestionId,
      type: 0,
      questionContent: '',
      isNecessary: false,
      options: [
       
      ],
      answers: [],
      narrativeAnswer: '',
    },]
  }
  const addSectionRedux = (newSection) => {
    console.log(newSection);
    dispatch(questionActions.addSection({newSection}));
  }
  const handleAddSection = () => {
    if(form.isPre){
      addSection(form.id,addSectionRedux);
      dispatch(surveyFlowActions.addIndexes());
    }else{
      addSectionRedux(newSection)
      dispatch(surveyFlowActions.addIndexes());
    }
  }
  

  const deleteSectionRedux = (section_idx)  => {
    // 여기서 삭제될 섹션의 nextSection에 대한 처리를 해준다.
    dispatch(surveyFlowActions.clearDeletedSectionReference({ section_idx, currentSectionIndex : currentIndex }))
    // 여기서는 해당 섹션을 선택했던 옵션들을 다시 초기화해준다.
    dispatch(questionActions.deleteSection({ section_idx }));
  }

  const handleDeleteSection = () => {
    const handleConfirm = () => {
      if(form.isPre){
        deleteSection(form.id,questions[section_idx-1].id,section_idx,deleteSectionRedux);
      }else{
        deleteSectionRedux(section_idx)
      }
      
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
