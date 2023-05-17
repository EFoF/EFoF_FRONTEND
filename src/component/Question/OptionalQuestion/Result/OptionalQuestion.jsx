
import { Wrapper, InputButtonWrapper, OptionsWrapper, OptionButton, CloseOptionButton, Input, ImgInput } from './style';
import { questionActions, formActions } from '../../../../slices';
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



    return (
        <Wrapper isLast={isLast}>
            <InputButtonWrapper>
                <Input value={optionContent} type={type} isLast={isLast} onChange={handleContentChange} onClick={handleAddOption} ref={inputRef} />
            </InputButtonWrapper>
            <OptionsWrapper isLast={isLast} gap={"0.5rem"}>
            </OptionsWrapper>

        </Wrapper>
    );
}

