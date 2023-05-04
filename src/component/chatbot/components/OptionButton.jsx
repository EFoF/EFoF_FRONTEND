// new file called DogPicture.jsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useChatbot,createChatBotMessage,setState } from 'react-chatbot-kit';
import { FaCheck } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { questionActions } from '../../../slices';
const OptionButton = (props) => {
  const [selected, setSelected] = useState([]);
  const [option,setOption] = useState(props.options);
  const { form, questions } = useSelector((state) => state.form);

  const dispatch = useDispatch();

  const handleClick = (index) => {
  const { sectionId, questionId } = props.state;
  
    if (selected.includes(index)) {
      // setSelected(selected.filter((i) => i !== index));
    } else {
      dispatch(questionActions.addOptionByBot(({ questionId: questionId, sectionId: sectionId, content:option[index] })));
 
      // setSelected([...selected, index]);
    }
  };


  return (
    <ButtonWrapper>
      {option.map((text, index) => (
        <Button
          key={index}
          onClick={() => {props.payload.type?(<></>):(handleClick(index))}}
          isSelected={selected.includes(index)
          }
          isWrong={props.payload.type}
          
        >
          {/* {selected.includes(index) && <FaCheck />} */}
          {text}
        </Button>
      ))}
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  
  justify-content: left;
`;

const Button = styled.button`
  background-color: ${(props) => (props.isSelected ? '#ffc107' : '#f5f5f5')};
  color: ${(props) => (props.isSelected ? '#fff' : '#333')};
  border-radius: 4px;
  padding: 8px 16px;
  border: none;
  font-size: 12px;
  cursor: ${(props) => (props.isWrong ? 'not-allowed' : 'pointer')};
  margin: 0.2rem;
  display: flex;

  &:hover {
    background-color: ${(props) => (props.isWrong ? '#f5f5f5' : '#ffc107')};
    color: ${(props) => (props.isWrong ? '#333' : '#fff')};
    cursor: ${(props) => (props.isWrong ? 'not-allowed' : 'pointer')};
  }

  svg {
    margin-right: 0.5rem;
  }
`;

export default OptionButton;