import { useDispatch } from 'react-redux';
import {useNavigate, useLocation, useParams} from 'react-router-dom';
import styled from 'styled-components';
import { ResultTitleBox } from '../../component';
import { useSelector } from 'react-redux';
import {surveyFlowActions} from '../../slices';
import ResultSection from "../../component/Section/Result/Section";
import {ResultQuestionContainer} from "../../containers";
import leftArrow from '../../assets/icon/leftArrow.png'
import rightArrow from '../../assets/icon/rightArrow.png'
import {postSurveyResponse} from "../../api/survey";
import toastMsg from "../../ui/Toast";
import {FaArrowLeft, FaArrowRight } from "react-icons/fa";
import React from "react";
import {RxDoubleArrowLeft} from 'react-icons/fa';

const Preview = () => {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.form);
  const { currentIndex, indexes } = useSelector(state => state.surveyFlow);
  const { questions } = form;
  const { id } = useParams();
  const currentPath = useLocation();
  const navigate = useNavigate();
  const _moveToNext = () => {
      if (currentIndex !== indexes[currentIndex].nextIndex) {
          // 이동할 다음 페이지의 prev를 현재 페이지의 current로 설정
          // console.log(indexes[currentIndex].nextIndex);
          // console.log(currentIndex);
          dispatch(surveyFlowActions.setPrevIndex({pageIndex : indexes[currentIndex].nextIndex, value : currentIndex}));
          dispatch(surveyFlowActions.setCurrentIndex(indexes[currentIndex].nextIndex));
      }
  }
  const _moveToPrev = () => {
      // dispatch(surveyFlowActions.setNextIndex(currentIndex));
      dispatch(surveyFlowActions.setNextIndex({pageIndex : indexes[currentIndex].prevIndex, value : currentIndex}));
      dispatch(surveyFlowActions.setCurrentIndex(indexes[currentIndex].prevIndex));
  }

  const _getIndexAgainForComparison = () => {

      let lastId;
      if(typeof(questions[currentIndex]) !== 'undefined' ) {
          if(questions[currentIndex].questionList !== null) {
              questions[currentIndex].questionList.map((question) => {
                  if(question.answers !== null) {
                      question.answers.map((answer) => {
                          lastId = answer;
                      })
                  }
                  if(question.options !== null && question.options !== undefined) {
                      const option = question.options.find((item) => item.id === lastId);
                      if(typeof(option) !== 'undefined') {
                          lastId = option.nextSectionId;
                      }
                  }
              })
          }

          if(typeof(lastId) === 'undefined' || lastId === null || lastId === '') {
              if(questions[currentIndex].nextSectionId !== '') {
                  lastId = questions[currentIndex].nextSectionId;
              }
          }
      }
      return typeof(lastId) === 'undefined' ? -1 : questions.findIndex((item) => item.id === lastId);
  }

  const _determineFlow = () => {
      const nextSectionIndex = indexes[currentIndex].nextIndex;
      const lastidx = _getIndexAgainForComparison();
      if(lastidx !== nextSectionIndex) {
          dispatch(surveyFlowActions.setNextIndex({ pageIndex : currentIndex, value : lastidx}));
      }

      const flag = indexes[currentIndex].nextIndex === -1 || indexes[currentIndex].nextIndex === currentIndex
      return (
              <ArrowButtonWrapper>
                  {/*<ArrowImageButton isActive={indexes[currentIndex].prevIndex !== -1}*/}
                  {/*                  size={1}*/}
                  {/*                  onClick={_moveToPrev}*/}
                  {/*                  src={leftArrow}*/}
                  {/*                  color={"white"}/>*/}
                  <ArrowWrapperForDisable isActive={indexes[currentIndex].prevIndex !== -1}
                                          size={1}
                                          onClick={_moveToPrev}
                                          color={"white"}>
                      <FaArrowLeft size="1.5rem" />
                  </ArrowWrapperForDisable>
                  <Buttons isActive={flag}
                            btColor={form.form.btColor}>
                      <div className="submit-button" onClick={submitHandler}>
                          {currentPath.pathname === `/form/over/${id}` ? '뒤로가기' : '제출'}
                      </div>
                  </Buttons>
                  {/*<ArrowImageButton isActive={!flag}*/}
                  {/*                  size={1}*/}
                  {/*                  onClick={_moveToNext}*/}
                  {/*                  backgroundColor={form.form.bgColor}*/}
                  {/*                  src={rightArrow}*/}
                  {/*                  color={"white"}/>*/}
                  <ArrowWrapperForDisable isActive={!flag}
                                          size={1}
                                          onClick={_moveToNext}
                                          color={"white"}>
                      <FaArrowRight size="1.5rem"/>
                  </ArrowWrapperForDisable>
              </ArrowButtonWrapper>
      );
  }

  // 이 컴포넌트가 미리보기 화면이 아닌 실제 설문에서 사용됐다면, 상태값을 기반으로 정답 데이터를 백엔드로 보내줌
  const submitHandler = () => {
      if (currentPath.pathname === `/form/in-progress/${id}`) {
          const responseData = ResponseDataBuilder();
          // console.log(responseData);
          if(responseData === null || responseData.participateAnswerDTOList.length === 0) {
              if(responseData === null) {
                  toastMsg("필수 질문에 응답하지 않았습니다.", false);
              } else {
                  toastMsg("응답을 기록해주세요", false);
              }
          } else {
              postSurveyResponse(responseData)
                  .then((response) => {
                          navigate("/");
                  }).catch(error => {console.log(error)});
          }
      } else if(currentPath.pathname !== `/form`) {
          navigate(-1);
      }
  }

    const ResponseDataBuilder = () => {
        const responseData = {
            surveyId: id,
            participateAnswerDTOList: [],
        };

        let next = -2;
        let current = 0;

        while (next !== -1) {
            const questionList = questions[current].questionList;

            for (let i = 0; i < questionList.length; i++) {
                const questionEach = questionList[i];

                // 정답이 있는지 없는지 확인
                // console.log(questionEach.answers);
                // console.log(questionEach.narrativeAnswer);

                if (questionEach.answers.length !== 0 || questionEach.narrativeAnswer !== undefined) {
                    // 정답이 있으면 기존 방식처럼 배열에 추가해줌
                    const participateAnswerDTO = {
                        questionId: questionEach.id,
                        questionType: questionEach.type,
                    };

                    if (questionEach.type === 0 || questionEach.type === 2 || questionEach.type === 3) {
                        participateAnswerDTO.questionChoiceId = questionEach.answers;
                    } else if (questionEach.type === 1) {
                        participateAnswerDTO.answerSentence = questionEach.narrativeAnswer;
                    }

                    participateAnswerDTO.isNecessary = questionEach.isNecessary;
                    responseData.participateAnswerDTOList.push(participateAnswerDTO);
                } else {
                    // 필수 질문에 정답이 없으면 토스트 메시지 실행 후 제출 취소
                    if (questionEach.isNecessary) {
                        // 필수 질문인데 정답이 없는 경우이므로 토스트 메시지 실행 후 제출 취소
                        return null;
                    }
                }
            }
            next = indexes[current].nextIndex;
            current = next;
        }
        return responseData;
    }

  return (
      <div style={{margin: '40px'}}>
        <Wrapper style={{ flexDirection: 'column', alignItems: 'center' }} backgroundColor={form.form.bgColor}>
            <QuestionWrapper>
                <ResultTitleBox info={form.form}/>
                <ResultSectionContainer>
                    <ResultSection section_idx={currentIndex + 1} section_len={questions.length}/>
                        {questions[currentIndex] && questions[currentIndex].questionList.map((question, question_idx) => (
                            <ResultQuestionContainer key={question.id} questionId={question.id} sectionId={questions[currentIndex].id}/>
                        ))}
                </ResultSectionContainer>
            </QuestionWrapper>
            {_determineFlow()}
        </Wrapper>
      </div>
  )
};

const ArrowButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  justify-content: space-between;
  margin-top: 20px;
`;

const ArrowImageButton = styled.img`
  cursor: pointer;
  font-size: 16px;
  padding: 10px 0;
  width: 5vh;
  border-radius: 5px;
  ${({ theme }) => theme.flexCenter}
  opacity: ${({isActive}) => isActive ? 1.0 : 0.0};
  pointer-events: ${({isActive}) => isActive ? 'auto' : 'none'};
  //background-color: #f5f5f5;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const ArrowWrapperForDisable = styled.div`
  cursor: pointer;
  font-size: 16px;
  padding: 10px 0;
  width: 5vh;
  border-radius: 5px;
  ${({ theme }) => theme.flexCenter}
  opacity: ${({isActive}) => isActive ? 1.0 : 0.0};
  pointer-events: ${({isActive}) => isActive ? 'auto' : 'none'};
  //background-color: #f5f5f5;
  background-color: ${({ backgroundColor }) => backgroundColor};
`

const Buttons = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  .submit-button {
    cursor: pointer;
    font-size: 16px;
    padding: 10px 0;
    width: 80px;
    border-radius: 5px;
    ${({ theme }) => theme.flexCenter}
    color: ${({ theme }) => theme.color.black};
    background: ${({ theme }) => theme.color.white};
    opacity: ${({isActive}) => isActive ? 1.0 : 0.0};
    pointer-events: ${({isActive}) => isActive ? 'auto' : 'none'};
    
    &:hover {
        background: ${({btColor}) => btColor};
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* 호버 상태에서의 그림자 스타일과 색상 설정 */
      }

      /* 그림자 추가 */
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 스타일과 색상 설정 */
  
  }
`;

const Wrapper = styled.div`
${({ theme }) => theme.flexCenter};
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding-top: 30px;
  padding-bottom: 30px;
  width: 100%;
  overflow:visible;
  border-radius: 2rem;
//   border: 1px solid ${({ theme }) => theme.color.grey};
`;

const QuestionWrapper = styled.div`
  padding:10px;
  width: 90%;
`;

const ResultSectionContainer = styled.div`
margin-bottom:0.5rem;
border-radius: 10px;
position: relative;
box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
overflow:visible;
`;


export default Preview;