
import { Wrapper, InputButtonWrapper, OptionsWrapper, customOptionButton, ResultOptionButton, CloseOptionButton, Input, ImgInput } from './style';
import {questionActions, formActions, surveyFlowActions} from '../../../../slices';
import React, { useState } from 'react'
import { MdAdd, MdClose, MdPhoto } from 'react-icons/md';
import Select from "react-select";
import { FaCheck } from 'react-icons/fa';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import ReactDOM from "react-dom";
import ConfirmModal from '../../../../ui/ConfirmModal';
import axios from 'axios';
import toastMsg from '../../../../ui/Toast';
export default function ResultOptionalQuestion({ type, optionId, questionId, optionContent, selectedQuestion, optionImage, isLast, sectionId, questions, isMarked, multipleChoice}) {

    const CheckIcon = styled(FaCheck)`
  font-size: 0.7rem;
  align-self: center;
`;

    const AddIcon = styled(MdAdd)`
  font-size: 0.7rem;
  align-self: center;
`;
    const { form } = useSelector((state) => state.form);
    const { currentIndex } = useSelector((state) => state.surveyFlow)
    const inputRef = useRef(null);
    let imageInputRef;
    const dispatch = useDispatch();


    const handleAddOption = () => {
        isLast && dispatch(questionActions.addOption({ sectionId: sectionId, questionId: questionId }));
        inputRef.current.select();
    };

    const handleContentChange = (e) => {
        dispatch(questionActions.setOptionContent({ sectionId: sectionId, questionId: questionId, optionId, optionContent: e.target.value }));
    };


    const handleChange = (option1) => {
        dispatch(questionActions.setOptionNextSection({ sectionId, optionId, questionId, nextSectionId: option1.value }))

    };

    const getImage = () => {
        const section = questions.find((item) => item.id === sectionId);
        const questionIdx = section.questionList.findIndex((item) => item.id === String(questionId));
        const optionIdx = section.questionList[questionIdx].options.findIndex((item) => item.id === optionId);
        if (section.questionList[questionIdx].options[optionIdx] && section.questionList[questionIdx].options[optionIdx].image) {
            return true;
        }
        return false;
    }


    const answerHandler = () => {
        const isAnswer = false;
        if(isMarked) {
            dispatch(questionActions.deleteOneOptionalAnswer({sectionId : sectionId, questionId : questionId, optionId : optionId}))
            getSectionIndexBySectionId();
        } else {
            if(multipleChoice) {
                dispatch(questionActions.markMultipleAnswer({questionId, optionId, isAnswer }))
            } else {
                dispatch(questionActions.markOneAnswer({questionId, optionId, isAnswer}))
                // 선택한 옵션이 가지고 있는 nextSectionId를 가지고 와서 next로 지정해줘야 함.
                getSectionIndexByOptionId();
            }
        }
    };

    const getSectionIndexByOptionId = () => {
        // 현재 옵션 오브젝트를 가져온 뒤 nextSectionId를 알아내고, 이를 다시 인덱스로 변환해서 state에 지정할 수 있도록 반환한다.
        const selectedOption = selectedQuestion.options.find((element) => element.id === optionId)
        const sectionIndex = questions.findIndex((item) => item.id === selectedOption.nextSectionId);
        // sectionIndex가 -1이면 섹션 자체가 가리키는 다음 섹션으로 이동한다.
        console.log(sectionIndex);
        if(sectionIndex !== -1) {
            dispatch(surveyFlowActions.setNextIndex({pageIndex : currentIndex, value : sectionIndex}))
        }
    }

    const getSectionIndexBySectionId = () => {
        const section = questions.find((item) => item.id === sectionId)
        const sectionIndex = questions.findIndex((item) => item.id === section.nextSectionId);
        if(sectionIndex !== -1) {
            dispatch(surveyFlowActions.setNextIndex({pageIndex : currentIndex, value : sectionIndex}))
        }
    }

    return (
        <Wrapper isLast={isLast}>
            <InputButtonWrapper>
                <ResultOptionButton onClick={answerHandler} isActive={isMarked} activeColor={form.btColor}>{optionContent}</ResultOptionButton>
            </InputButtonWrapper>
            <OptionsWrapper isLast={isLast} gap={"0.5rem"}>
            </OptionsWrapper>

        </Wrapper>
    );
}

