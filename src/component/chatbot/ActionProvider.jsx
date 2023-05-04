// in ActionProvider.jsx
import React,{useState} from 'react';
import axios from 'axios';
import { chatbotConst } from './components/chatbotConst';
import { createClientMessage } from 'react-chatbot-kit';
const ActionProvider = ({ createChatBotMessage, setState, children }) => {
    
    // const [isFirst,setIsFirst]=useState();
    const handleOptionList = (question,type) => {
        
        const message = createChatBotMessage(
          question,
          {
            loading: true,
            terminateLoading: true,
            withAvatar: true,
            widget: "optionButtons",
            payload: {type}
          }
        );
        
        const options = createChatBotMessage(
            "다음 수행할 항목을 클릭해주세요",{
              
              loading: true,
              withAvatar: true,
              payload : chatbotConst,
              widget: "chatButtons",
            }
          );
        addMessageToState(message);
        addMessageToState(options);
      };

    const handleMessage = (question) => {
        
        const message = createClientMessage(
          question
        );
        
        addMessageToState(message);
        
      };

      const handleLoading = () =>{
        const options = createChatBotMessage(
            '',{widget:"loading"}
          );
        addMessageToState(options);
      }


      const handleLoadingEnd = () =>{
        deleteMessageToState();
      }

      const addMessageToState = (message) => {
        setState((state) => ({
          ...state,
          messages: [...state.messages, message],
        }));
      };

  

      const deleteMessageToState = () => {
        setState((state) => {
            const newMessages = [...state.messages];
            newMessages.pop();
            return {
              ...state,
              messages: newMessages,
            };
          });
      };


      const deleteAllMessageToState = () => {
        setState((state) => {
            const newMessages = [createChatBotMessage(`안녕하세요 질문에 대한 응답들을 생성해주는 봇 입니다~!`),
            createChatBotMessage(`아래의 질문 중 선택해주세요.`,{
                widget: 'questionButton',
                
                
            })]
            
            return {
              ...state,
              messages: newMessages,
            };
          });
      };

      const deleteButtonMessageToState = () => {
        setState((state) => {
            const newMessages = [...state.messages];
            newMessages.splice(newMessages.length-3, 1); // 인덱스에 해당하는 값 제거
            return {
              ...state,
              messages: newMessages,
            };
          });
      };


    // Put the handleHello function in the actions object to pass to the MessageParser
    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    actions: {
                        // handleHello,addMessages
                        handleOptionList,handleLoading,handleLoadingEnd,handleMessage,deleteAllMessageToState,deleteButtonMessageToState
                    },
                });
            })}
        </div>
    );
};

export default ActionProvider;