
import { DragIcon } from '../../../assets';
import { Wrapper } from './style';
import styled,{css} from 'styled-components';
import { QUESTION_TYPES } from '../../../component/constants/const/';
import { useDispatch, useSelector } from 'react-redux';
import { questionActions } from '../../../slices';
import { useState } from "react";
import shortid from 'shortid';
import ResultOptionalQuestion from '../../../component/Question/OptionalQuestion/Result/OptionalQuestion';
import { FiChevronUp } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai'; // AiOutlineDelete 추가
import Toggle from 'react-styled-toggle';
import React from 'react'

// 수정 예정
const typeNames = ['객관식', '주관식', '객관식 복수선택', '찬부식'];

export default function ResultQuestionContainer({ questionId, sectionId ,questionOption }) {

    const [isCollapsed, setIsCollapsed] = useState(false);

    const dispatch = useDispatch();
    const { questions } = useSelector((state) => state.form);

    const section = questions.find((item) => item.id === sectionId);
    const selectedQuestion = section.questionList.find((item) => item.id === questionId);


    if (!selectedQuestion) return null;

    const { type: questionType, options, questionContent, isNecessary, id } = selectedQuestion;

    console.dir(selectedQuestion);

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

    const findOptionIsMarked = (optionId) => {

        // const result = selectedQuestion.answers.find((element) => element === optionId);
        // console.log(result);
        // return typeof (result) !== 'undefined';
        return false
    }

    const getOptionList = (type) => {
        const optionList = options
            ?.map((option) => (
                <ResultOptionalQuestion
                    key={option.id}
                    sectionId={sectionId}
                    questionId={questionId}
                    optionId={option.id}
                    optionContent={option.option}
                    optionImage={option.image}
                    selectedQuestion={selectedQuestion}
                    optionNextSectionId={option.nextSectionId}
                    questionOption={questionOption}
                    questions={questions}
                    type={type}
                    isMarked={findOptionIsMarked(option.id)}
                    isLast={false}
                />
            ));
        return optionList;
    };

    const getOptionListWithoutConcat = (type) => {
        const optionList = options
            ?.map((option) => (
                <ResultOptionalQuestion
                    key={option.id}
                    questionId={questionId}
                    sectionId={sectionId}
                    optionId={option.id}
                    optionContent={option.option}
                    optionImage={option.image}
                    selectedQuestion={selectedQuestion}
                    questions={questions}
                    questionOption={questionOption}
                    optionNextSectionId={option.nextSectionId}
                    type={type}
                    isMarked={findOptionIsMarked(option.id)}
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
                // TODO 다중 선택에 대한 처리도 추가되어야 함.
            case QUESTION_TYPES.ONE_CHOICE:
                return getOptionList(questionType);
            case QUESTION_TYPES.LONG_ANSWER:
            default:
                return;
        }
    };

    return (
        <Wrapper isCollapsed={isCollapsed}>
            <div className="question">
                <span className="question-input">
                    {questionContent.length === 0 ? '제목 없는 질문' : questionContent}
                    {isNecessary && <span style={{ color: 'red'}}>*</span>}
                </span>
            </div>
            <div className="collapse">
                {typeNames[questionType]}
                {getInput()}
            </div>
            <hr />
            <div className="settings">
                <></>
            </div>
        </Wrapper>
    );
}
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

