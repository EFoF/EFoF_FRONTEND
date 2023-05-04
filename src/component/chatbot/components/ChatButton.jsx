// new file called DogPicture.jsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useChatbot, createChatBotMessage, setState } from 'react-chatbot-kit';
import { useDispatch, useSelector } from 'react-redux';
import { questionActions } from '../../../slices';
const ChatButton = (props) => {
  const dispatch = useDispatch();
  // const { addMessage } = useChatBotContext();
  const question = props.state.question;
  const option = props.state.options;
  const { sectionId, questionId } = props.state;
  // const question = "asdsads";
  const handleClick = (index) => {

    props.actionProvider.handleMessage(props.payload[index]);
    props.actionProvider.deleteButtonMessageToState();
    props.setState((state) => ({
      ...state,
      question: question,
    }));

    if (props.payload[index] === "항목 생성하기") {

      getOption(question).then((option) => {

        props.setState((state) => ({
          ...state,
          options: String(option.content.answer).split(','),
        }));
        
        props.setState((state) => ({
          ...state,
          answer: option.content
        }));
      const isWrong = option.content.type.includes("wrong");
      isWrong ?(
        props.actionProvider.handleOptionList(`"${question}"은 잘못된 객관식 질문입니다. 질문을 바꿔주시고 다시 시도해주세요.`,isWrong)
      ):(
        props.actionProvider.handleOptionList(`"${question}"라는 질문에 대한 예시 항목 입니다. \n클릭 시 추가됩니다.`,isWrong)
      )  
      

      });
    } else if (props.payload[index] === "다른 항목 생성하기") {
      getAnotherOption().then((option) => {

        props.setState((state) => ({
          ...state,
          options: String(option.content.answer).split(','),
        }));

        props.setState((state) => ({
          ...state,
          answer: option.content
        }));
        const isWrong = option.content.type.includes("wrong");
        isWrong ?(
          props.actionProvider.handleOptionList(`"${question}"은 잘못된 객관식 질문입니다. 질문을 바꿔주시고 다시 시도해주세요.`,isWrong)
        ):(
          props.actionProvider.handleOptionList(`"${question}"라는 질문에 대한 다른 예시 항목 입니다. \n클릭 시 추가됩니다.`,isWrong)
        )  


      });

    } else if (props.payload[index] === "모두 적용") {
      
      dispatch(questionActions.addAllOptionByBot(({ questionId: questionId, sectionId: sectionId, content:option })));
    }
    else if (props.payload[index] === "처음으로") {
      props.actionProvider.deleteAllMessageToState()
    }
  }

  const getOption = (message) => {
    props.actionProvider.handleLoading();
    return axios.post('http://localhost:8080/chatbot/option',
      {
        question: message,
      })
      .then(response => {
        
        props.actionProvider.handleLoadingEnd();
        return response.data;

      })
      .catch(error => {
        console.log(error);
      });

  }

  const getAnotherOption = () => {
    props.actionProvider.handleLoading();
    return axios.post('http://localhost:8080/chatbot/anotherOption',
      {
        question: props.question,
        content:props.answer
      })
      .then(response => {
        props.actionProvider.handleLoadingEnd();
        return response.data;

      })
      .catch(error => {
        console.log(error);
      });

  }
  return (
    
    props.payload.map((text, index) => (
      <StyledButton key={index} onClick={() => handleClick(index)} >{text}</StyledButton>
    ))
  );
};


const StyledButton = styled.button`
  background-color: #ffc107;
  color: #fff;
  border-radius: 4px;
  padding: 8px 16px;
  border: none;
  font-size: 12px;
  cursor: pointer;
  margin-left : 0.5rem;
  margin-top : 0.2rem;
  &:hover {
    background-color: #f5f5f5;
    color: #ffc107;
  }
`;


export default ChatButton;