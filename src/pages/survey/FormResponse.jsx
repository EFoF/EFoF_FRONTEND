import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import 'react-chatbot-kit/build/main.css'
import './Chatbot.css'
import Preview from "./Preview";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { surveyInfoForResponse } from '../../api/survey';
import { questionActions, formActions, surveyFlowActions } from '../../slices';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  position: relative;
  /* width: 100rem; */
`;

const Half = styled.div`
  width: 50%;
  height: 100vh;
  overflow: scroll;
  background-color: ${({ backgroundColor }) => backgroundColor};
  
  ::-webkit-scrollbar-thumb {
    background-color: orange;
    border-radius: 0.2rem;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar {
    width: 0.3rem;
  }
`;

const Button = styled.button`
  margin-bottom: 1rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.color || 'transparent'};
  color: #fff;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

export default function FormResponse() {
    const { id } = useParams();
    const currentPath = window.location.pathname;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const form = useSelector((state) => state.form);

    useEffect(() => {
        surveyInfoForResponse(id,navigate)
                .then((data) => {
                    dispatch(formActions.initForm({data}));
                    dispatch(questionActions.initQuestion({data}))
                    data.sectionList.map((section) => {
                        dispatch(surveyFlowActions.addIndexes());
                    })
                }).catch(error => {
                    // console.log("설문 조회 api 요청 실패");
            });

    }, [id, currentPath]);


    const scrollRef = useRef(null);
    const buttonWrapperRef = useRef(null);
    const handleScroll = (event) => {
        const scrollTop = event.target.scrollTop;
        const buttonWrapper = buttonWrapperRef.current;
        if (buttonWrapper) {
            buttonWrapper.style.transform = `translateY(${scrollTop * 0.0001}px)`; // 스크롤 속도 조절
        }
    };


    return (
        <Wrapper >
            <Half ref={scrollRef} onScroll={handleScroll} backgroundColor={form.form.bgColor}>
                <Preview/>
            </Half>
        </Wrapper>
    );
}