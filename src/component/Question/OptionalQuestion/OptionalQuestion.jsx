
import { Wrapper, InputButtonWrapper, OptionsWrapper, OptionButton, CloseOptionButton, Input, ImgInput } from './style';
import { questionActions, formActions, surveyFlowActions } from '../../../slices';
import React, { useState } from 'react'
import { MdAdd, MdClose, MdPhoto } from 'react-icons/md';
import Select from "react-select";
import { FaCheck } from 'react-icons/fa';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import ReactDOM from "react-dom";
import ConfirmModal from '../../../ui/ConfirmModal';
import axios from 'axios';
import toastMsg from '../../../ui/Toast';
export default function OptionalQuestion({ type, optionId, questionId, optionContent, optionImage, isLast, sectionId, questions, questionOption,optionNextSectionId}) {


  const customStyles = {
    container: (provided, state) => ({
      ...provided,
      width: '11.5rem',
      // display: "flex",
      fontSize: "0.7rem",
      margin: 0,
      padding: 0,
    }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "white",

      margin: 0,
      padding: '0.01rem',
      borderColor: state.isFocused ? "red" : "gray",
      ":hover": { borderColor: "red" },
    }),
    option: (provided, state) => ({
      ...provided,

      color: state.data.color,
      opacity: 0.8,
      margin: '0',
      // height:'1.5rem'
    }),

  };

  const CheckIcon = styled(FaCheck)`
  font-size: 0.7rem;
  align-self: center;
`;

  const AddIcon = styled(MdAdd)`
  font-size: 0.7rem;
  align-self: center;
`;
  const { form } = useSelector((state) => state.form);
  const { currentIndex, indexes } = useSelector((state) => state.surveyFlow);

  const inputRef = useRef(null);
  let imageInputRef;
  const dispatch = useDispatch();


  const handleAddOption = () => {
    isLast && dispatch(questionActions.addOption({ sectionId: sectionId, questionId: questionId }));
    inputRef.current.select();
  };
  const handleDeleteOption = () => {
    dispatch(questionActions.deleteOption({ sectionId: sectionId, questionId: questionId, optionId }));
  };

  const handleContentChange = (e) => {
    dispatch(questionActions.setOptionContent({ sectionId: sectionId, questionId: questionId, optionId, optionContent: e.target.value }));
  };


  const handleChange = (option1) => {
    dispatch(questionActions.setOptionNextSection({ sectionId, optionId, questionId, nextSectionId: option1.value }))
    // 0. sectionId로 섹션 먼저 찾기
    // 1. questionId로 question 찾기
    // 2. question의 answers에 현재 옵션 아이디가 있는지 확인
    // 3. 있다면 변경된 nextSectionId를 currentId로 설정
    handleMarkedNextSectionId(option1.value);

  };

  const handleMarkedNextSectionId = (nextSectionId) => {
    const section = questions.find((item) => item.id === sectionId)
    const question = section.questionList.find((item) => item.id === questionId)
    const exists = (question.answers.findIndex((item) => item === optionId) !== -1)
    if(exists) {
      const nextSectionIndex = questions.findIndex((item) => item.id === nextSectionId)
      dispatch(surveyFlowActions.setNextIndex({pageIndex : currentIndex, value : nextSectionIndex}))
    }
  }

  const handleDeleteImage = () => {

    const handleConfirm = () => {
      axios.delete('http://localhost:8080/form/image', {

      }).then(response => {
        // alert(JSON.stringify(response.data));
        toastMsg("이미지 변경 성공", true);
        dispatch(questionActions.setOptionImage(
          { sectionId: sectionId, questionId: questionId, optionId, image: '' }
        ));

      }).catch(error => {
        toastMsg(error.response, false);

      });


      ReactDOM.unmountComponentAtNode(document.getElementById("modal-root"));
    };

    const handleCancel = () => {
      // 취소 버튼 클릭 시 처리할 코드 작성
      ReactDOM.unmountComponentAtNode(document.getElementById("modal-root"));
    };
    const confirmModal = <ConfirmModal message={"이미지를 삭제하시겠습니까?"} onConfirm={handleConfirm} onCancel={handleCancel} />;
    ReactDOM.render(confirmModal, document.getElementById("modal-root"));
  };

  const getImage = () => {
    const section = questions.find((item) => item.id === sectionId);

    if (section) {
      const questionIdx = section.questionList.findIndex((item) => item.id === questionId);

      if (questionIdx !== -1) {
        const question = section.questionList[questionIdx];
        
        if (question.options) {
          const optionIdx = question.options.findIndex((item) => item.id === optionId);

          if (optionIdx !== -1 && question.options[optionIdx].image) {
            return true;
          }
        }
      }
    }
    
    return false;
  };
  


  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    const formData = new FormData();
    formData.append('image', selectedFile);

    axios.post('http://localhost:8080/form/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      // alert(JSON.stringify(response.data));
      toastMsg("이미지 변경 성공", true);
      dispatch(questionActions.setOptionImage(
        { sectionId: sectionId, questionId: questionId, optionId, image: response.data }
      ));

    }).catch(error => {
      toastMsg(error.response, false);

    });




  }


  return (
    <Wrapper isLast={isLast}>
      <InputButtonWrapper>
        <Input value={optionContent} type={type} isLast={isLast} onChange={handleContentChange} onClick={handleAddOption}
          ref={inputRef} />

              {/*<Input value={optionContent} type={type} isLast={isLast} onChange={handleContentChange} onClick={handleAddOption}*/}
              {/*       ref={inputRef} />*/}
              <OptionButton size={"1rem"} isLast={isLast} onClick={() =>
              
                  getImage() ? handleDeleteImage() : imageInputRef.click()}>
                <MdPhoto />
                {
                  getImage() ? <CheckIcon /> : <AddIcon />}
              </OptionButton>
              <ImgInput
                  onClick={(e) => e.target.value = null}
                  ref={refParam => imageInputRef = refParam}
                  type="file"
                  id="chooseFile"
                  name="chooseFile"
                  accept="image/*"
                  onChange={handleFileUpload}
              />
        {/*<OptionButton size={"1rem"} isLast={isLast} onClick={() =>*/}
        {/*  getImage() ? handleDeleteImage() : imageInputRef.click()}>*/}
        {/*  <MdPhoto />*/}
        {/*  {*/}
        {/*    getImage() ? <CheckIcon /> : <AddIcon />}*/}
        {/*</OptionButton>*/}
        {/*<ImgInput*/}
        {/*  onClick={(e) => e.target.value = null}*/}
        {/*  ref={refParam => imageInputRef = refParam}*/}
        {/*  type="file"*/}
        {/*  id="chooseFile"*/}
        {/*  name="chooseFile"*/}
        {/*  accept="image/*"*/}
        {/*  onChange={handleFileUpload}*/}
        {/*/>*/}

      </InputButtonWrapper>
      <OptionsWrapper isLast={isLast} gap={"0.5rem"}>


        <Select
          styles={customStyles}
          value={questionOption.find(op => op.value === optionNextSectionId)
            ? questionOption.find(op => op.value === optionNextSectionId)
            : questionOption[0]}
          placeholder="다음 섹션을 선택해주세요."
          onChange={handleChange}
          options={questionOption}
        />
            <CloseOptionButton onClick={handleDeleteOption} type={type} size={"1.2rem"}>
              <MdClose />
            </CloseOptionButton>
      </OptionsWrapper>

    </Wrapper>
  );
}


