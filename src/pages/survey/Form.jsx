import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import FormMake from './FormMake';
import { AiOutlineMessage } from "react-icons/ai";
import Chatbot from 'react-chatbot-kit';
import ActionProvider from '../../component/chatbot/ActionProvider';
import GetConfig from '../../component/chatbot/GetConfig';
import MessageParser from '../../component/chatbot/MessageParser';
import 'react-chatbot-kit/build/main.css'
import './Chatbot.css'
import Draggable from 'react-draggable';
import Preview from "./Preview";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { surveyInfo } from '../../api/survey';
import { questionActions, formActions, surveyFlowActions } from '../../slices';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toastMsg from '../../ui/Toast';

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

const ButtonWrapper = styled.div`
  position: fixed;
  right: 50.5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 300px;
  transition: transform 0.5s ease-in-out; /* 스크롤 속도를 늦추기 위한 CSS 애니메이션 설정 */
`
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
const ChatbotWrapper = styled.div`
  display:  ${props => props.isVisible ? "" : "none"};
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 1s ease-in-out;

  position: absolute;
  right:10.5%;
  top: 70%;
  transform: translate(-50%, -50%);
`;

const DragButton = styled(Button)`
  position: absolute;
  right: 50.5%;
  top: 90%;
  width: 2.5rem;
  height: 2.5rem;
  opacity: ${props => props.isDragging ? 0.5 : 1};
  cursor: ${props => props.isDragging ? 'grabbing' : 'grab'};
`;

const ExampleChatbotWrapper = styled.div`
position: absolute;
  right:31.5%;
  top: 36%;
  z-index: 9999;
  
`
export default function Form() {
  const { id } = useParams();
  const currentPath = window.location.pathname;
  const [isPre,setIsPre] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // '/form/pre-release/:id' 경로인 경우에만 특정 로직 수행
  useEffect(() => {
    if (currentPath === `/form/pre-release/${id}`) {

      
      surveyInfo(id,navigate)
        .then((data) => {
          console.log(data);
          dispatch(formActions.initForm({data}));
          dispatch(questionActions.initQuestion({data}))

          // 아래 부분은 섹션간 이동을 위해 redux를 초기화하는 부분임.
          // 이 부분이 없으면 pre-release 화면에서는 섹션간 이동이 불가능함
          data.sectionList.map((section) => {
              dispatch(surveyFlowActions.addIndexes());
          })
        }).catch(error => {
          
          // toastMsg(error.response.data.message,false);
          
      });
    }
    
  }, [id, currentPath]);
  
  
  const scrollRef = useRef(null);
  const buttonWrapperRef = useRef(null);
  const dragButtonWrapperRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const handleScroll = (event) => {
    const scrollTop = event.target.scrollTop;
    const buttonWrapper = buttonWrapperRef.current;
    if (buttonWrapper) {
      buttonWrapper.style.transform = `translateY(${scrollTop * 0.0001}px)`; // 스크롤 속도 조절
    }
  };
  const [isVisible, setIsVisible] = useState(false);

  const handleCloseChatbot = () => {
    
    setIsVisible(false);
  };
  const handleDragButtonClick = () => {
    
    setIsVisible(!isVisible);
  };

  // const handleMouseDown = () => {
  //   setIsDragging(true);
  //   window.addEventListener('mousemove', handleMouseMove);
  // };

  // const handleMouseUp = () => {
  //   setIsDragging(false);
  //   window.removeEventListener('mousemove', handleMouseMove);
  // };
  // const handleMouseMove = (event) => {
  //   if (isDragging) {
  //     requestAnimationFrame(() => {
  //       const buttonWrapper = dragButtonWrapperRef.current;
  //       buttonWrapper.style.left = `${event.pageX}px`;
  //       buttonWrapper.style.top = `${event.pageY}px`;
  //     });
  //   }
  // };





  return (
      <Wrapper >
        <Half ref={scrollRef} onScroll={handleScroll}>
          <FormMake/>
        </Half>
        <Half>
          <Preview/>
        </Half>
        {!isVisible && (
        <DragButton color="#3b5998" onClick={handleDragButtonClick}>
          <AiOutlineMessage />
        </DragButton>
        )}
        {isVisible && (
        <Draggable>
        <ExampleChatbotWrapper>
          <Chatbot
            config={GetConfig(handleCloseChatbot)}
            actionProvider={ActionProvider}
            messageParser={MessageParser}
            
          />
        </ExampleChatbotWrapper>
        </Draggable>
      )}
      </Wrapper>
  );
}