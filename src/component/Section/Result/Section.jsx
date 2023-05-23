import React, { useState } from "react";

import styled from "styled-components";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from 'react-redux';
import { questionActions } from "../../../slices";
import ConfirmModal from "../../../ui/ConfirmModal";
import shortid from 'shortid';
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




export default function ResultSection({ section_idx, section_len }) {
    const dispatch = useDispatch();

    const { questions } = useSelector((state) => state.form);

    console.log(section_idx);

    console.dir(questions);

    const newSection = {
        id: shortid(),
        nextSectionId:'',
        questionList: [{
            id: shortid(),
            type: 0,
            questionContent: '',
            isNecessary: false,
            options: [

            ],
            answers: [],
            narrativeAnswer: '',
        },]
    }


    return (
        <Wrapper>
            {questions.length === 1 ? null : (
                <Text>
                    {section_len}개 중 {section_idx}번째 섹션
                </Text>)}
            <WrapperSelect>
                <IconWrapper>
                    {questions.length === 1 ? null : (
                        <SectionButton></SectionButton> )}
                        <SectionButton></SectionButton>
                </IconWrapper>
            </WrapperSelect>
        </Wrapper>

    );
}
