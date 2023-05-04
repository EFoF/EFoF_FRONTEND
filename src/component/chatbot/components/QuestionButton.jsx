import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
const option = {"content":{"answer":["리버풀","맨체스터 유나이티드","아스날","첼시","바르셀로나","레알 마드리드","바이에른 뮌헨","파리 생제르망"],"type":"객관식"}}
function QuestionButton(props) {
    
    const { form, questions } = useSelector((state) => state.form);
    const [activeIndex, setActiveIndex] = useState(-1);
    
    const question = questions.flatMap((questionObj) =>
        questionObj.questionList.map((question) => ({
            sectionId: questionObj.id,
            questionId: question.id,
            questionContent: question.questionContent}))
    );


    const handleButtonClick = (index) => {
        
        
        props.setState((state) => {
            const newMessages = [...state.messages];
            newMessages.pop();

            return {
                ...state,
                messages: newMessages,
            };
        });
        props.actionProvider.handleMessage(question[index].questionContent);

        props.setState((state) => ({
            ...state,
            question: question[index].questionContent,
            sectionId: question[index].sectionId,
            questionId: question[index].questionId,
        }));

        
        props.actionProvider.handleLoading();
        setTimeout(() => {
            props.actionProvider.handleLoadingEnd();
            props.setState((state) => ({
                ...state,
                options: String(option.content.answer).split(','),
            }));
    
            
            props.setState((state) => ({
                ...state,
                answer: option.content
            }));
            const isWrong = option.content.type.includes("wrong");
            isWrong ? (
                props.actionProvider.handleOptionList(`"${question[index].questionContent}"은 잘못된 객관식 질문입니다. 질문을 바꿔주시고 다시 시도해주세요.`, isWrong)
            ) : (
                props.actionProvider.handleOptionList(`"${question[index].questionContent}"라는 질문에 대한 예시 항목 입니다. \n클릭 시 추가됩니다.`, isWrong)
            )
          }, 5000);
       

        // getOption(question[index].questionContent).then((option) => {
        //     alert(JSON.stringify(option))
        //     props.setState((state) => ({
        //         ...state,
        //         options: String(option.content.answer).split(','),
        //     }));

            
        //     props.setState((state) => ({
        //         ...state,
        //         answer: option.content
        //     }));
        //     const isWrong = option.content.type.includes("wrong");
        //     isWrong ? (
        //         props.actionProvider.handleOptionList(`"${question[index].questionContent}"은 잘못된 객관식 질문입니다. 질문을 바꿔주시고 다시 시도해주세요.`, isWrong)
        //     ) : (
        //         props.actionProvider.handleOptionList(`"${question[index].questionContent}"라는 질문에 대한 예시 항목 입니다. \n클릭 시 추가됩니다.`, isWrong)
        //     )


        // });
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


    return (
        <Wrapper>
            {question.map((item, index) => (
                <Question
                    key={index}
                    onClick={() => handleButtonClick(index)}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(-1)}
                >
                    {item.questionContent}
                </Question>
            ))}
        </Wrapper>
    );
}

const Wrapper = styled.div`
display: flex;
flex-direction:column;
width:80%;
justify-content: center;
margin-left: 0.4rem;
`;

const Question = styled.button`

  background-color: #ffc107;
  color: #fff;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 10px 15px;
  border: none;
  font-size: 11px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
    color: #ffc107;
  }
  &:active {
    background-color: #ffc107;
    color: #ffc107;
  }
`;


export default QuestionButton;
