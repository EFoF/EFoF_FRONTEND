
import { DragIcon } from '../../assets';
import { Wrapper } from './style';
import styled,{css} from 'styled-components';
import { QUESTION_TYPES } from '../../component/constants/const/';
import { useDispatch, useSelector } from 'react-redux';
import { questionActions } from '../../slices';
import { useState } from "react";
import shortid from 'shortid';
import Dropdown from '../../component/Dropdown/Dropdown';
import OptionalQuestion from '../../component/Question/OptionalQuestion/OptionalQuestion';
import { FiChevronUp } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai'; // AiOutlineDelete 추가
import Toggle from 'react-styled-toggle';
import React from 'react'


export default function QuestionContainer({ questionId, provided, sectionId ,questionOption, }) {

  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.form);

  const section = questions.find((item) => item.id === sectionId);
  const selectedQuestion = section.questionList.find((item) => item.id === questionId);


  if (!selectedQuestion) return null;

  const { type: questionType, options, questionContent, isNecessary, id } = selectedQuestion;

  console.log(questionContent);

  // options는 질문의 하위 옵션

  const newQuestion = (newId) => {
    return {
      ...selectedQuestion,
      id: newId,
    };
  };

  const handleSwitch = () => {
    
    dispatch(questionActions.setNecessary({questionId:id, sectionId:section.id}));
  };

  const handleQuestionChange = (e) => {
    dispatch(questionActions.setQuestionContent({ questionId: questionId, sectionId: sectionId, questionContent: e.target.value }));
  };

  const handleDeleteQuestion = () => {
    dispatch(questionActions.deleteQuestion({ questionId: questionId, sectionId: sectionId }));
  };

  const handleCopyQuestion = () => {
    const newId = shortid();
    dispatch(questionActions.addQuestion({ sectionId: sectionId, newQuestion: newQuestion(newId) }));
  };

  const getOptionList = (type) => {
    const optionList = options
      ?.map((option) => (
        <OptionalQuestion
          key={option.id}
          sectionId={sectionId}
          questionId={questionId}
          optionId={option.id}
          optionContent={option.option}
          optionImage={option.image}
          optionNextSectionId={option.nextSectionId}
          questionOption={questionOption}
          questions={questions}
          type={type}
          isLast={false}
        />
      ));
    // readOnly 일때는 옵션 추가 버튼을 포함하지 않는다.
      optionList.push(
          <OptionalQuestion
              key={options.length + 1}
              sectionId={sectionId}
              questionId={questionId}
              optionId={options.length + 1}
              optionContent="옵션 추가"
              questions={questions}
              questionOption={questionOption}
              type={type}
              isLast={true}
          />
      );
    return optionList;
  };

  const getOptionListWithoutConcat = (type) => {
    const optionList = options
      ?.map((option) => (
        <OptionalQuestion
          key={option.id}
          questionId={questionId}
          sectionId={sectionId}
          optionId={option.id}
          optionContent={option.option}
          optionImage={option.image}
          questions={questions}
          questionOption={questionOption}
          optionNextSectionId={option.nextSectionId}
          type={type}
          isLast={false}
        />
      ))
    return optionList;
  };

  const getInput = () => {
    switch (questionType) {
      
      case QUESTION_TYPES.TRUE_FALSE:
        return getOptionListWithoutConcat(questionType);
      case QUESTION_TYPES.MULTIPLE_CHOICE:
      case QUESTION_TYPES.ONE_CHOICE:
        return getOptionList(questionType);
      case QUESTION_TYPES.LONG_ANSWER:
      // return <NarrativeQuestion type="long" questionId={questionId} />;
      default:
        return;
    }
  };

  return (
    <Wrapper isCollapsed={isCollapsed}>

          <div className="handler" {...provided.dragHandleProps}>
            <img className="drag-icon" src={DragIcon} alt="" />
          </div>
      
      <div className="question">
              <input
                  className="question-input"
                  type="text"
                  placeholder="질문"
                  value={questionContent}
                  onChange={handleQuestionChange}
              />
              <button className="collapse-button" onClick={toggleCollapse}>
                <FiChevronUp className={`collapse-icon ${isCollapsed ? "collapsed" : ""}`} />
              </button>
      </div>
          <div className="collapse">
            <Dropdown questionId={questionId} sectionId={sectionId}/>
            {getInput()}
          </div>
      <hr />
          <div className="settings">
            <Toggle checked={isNecessary} onChange={handleSwitch} labelLeft='필수 응답' width={52} height={25}sliderWidth={19} sliderHeight={19}/>
            <StyledDeleteIcon onClick={handleDeleteQuestion} />
          </div>
    </Wrapper>
  );
};
const StyledDeleteIcon = styled(AiOutlineDelete)`
  width: 1.7rem;
  height: 1.7rem;
  cursor: pointer;
  &:hover {
      color: ${({ theme }) => theme.color.blue};
    }
`;
const ToggleBtn = styled.button`
  width: 3rem;
  height: 1.5rem;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => (!props.toggle ? "none" : "rgb(51,30,190)")};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
`;
const Circle = styled.div`
  background-color: white;
  width: 1rem;
  height: 1rem;
  border-radius: 50px;
  position: absolute;
  left: 5%;
  transition: all 0.5s ease-in-out;
  ${(props) =>
    props.toggle &&
    css`
      transform: translate(1.6  rem, 0);
      transition: all 0.5s ease-in-out;
    `}
`;