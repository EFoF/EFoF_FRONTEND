import React, { useState } from "react";
import Select from "react-select";
import { questionActions } from '../../slices';
import styled from 'styled-components';
import { useDispatch,useSelector } from 'react-redux';
import { QUESTION_TYPES } from "../../component/constants/const";

const menus = [
  { value: QUESTION_TYPES.LONG_ANSWER, label: '주관식' },
  { value: QUESTION_TYPES.ONE_CHOICE, label: '객관식' },
  { value: QUESTION_TYPES.MULTIPLE_CHOICE, label: '객관식 복수선택' },
  { value: QUESTION_TYPES.TRUE_FALSE, label: '찬부식' },

];

export default function Dropdown({ sectionId,questionId }) {
  
  const [selectedOption, setSelectedOption] = useState(null);
  const dispatch = useDispatch();

  const { questions } = useSelector((state) => state.form);
  const section = questions.find((item) => item.id === sectionId);
  const question = section.questionList.find((item) => item.id === questionId);
  const type = question.type;

  const handleTypeChange = (selectedOption) => {
    dispatch(questionActions.changeType({ sectionId:sectionId, questionId: questionId, type: selectedOption.value }));
    setSelectedOption(selectedOption);
   
  };

  return (
    <Wrapper>
    
      <Select
        styles={customStyles}
        
        // value={selectedOption}
        placeholder="유형을 선택해주세요."
        onChange={handleTypeChange}
        options={menus}
        defaultValue={menus[1]}
      />
      
    </Wrapper>
  );
};

const customStyles = {
  control: (provided, state) => ({
      ...provided,
      backgroundColor: "white",
      marginTop:'1rem',
      width:'13rem',
      fontsize: '1px',
      borderColor: state.isFocused ? "red" : "gray",
      ":hover": { borderColor: "red" },
  }),
  option: (provided, state) => ({
    ...provided,
    // border: "1px dotted black",
    color: state.data.color,
    opacity: 0.8,
    fontSize: "1rem",
    
  }),
};

// Style
const Wrapper = styled.div`
  display: flex;
   
`;
