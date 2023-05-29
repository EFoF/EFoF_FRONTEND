import { useDispatch } from 'react-redux';
import {Link, useLocation, useParams} from 'react-router-dom';
import styled from 'styled-components';
import { ResultTitleBox } from '../../component';
import { PreviewContainer } from '../../containers';
import { useSelector } from 'react-redux';
import {formActions, questionActions, surveyFlowActions} from '../../slices';
import ResultSection from "../../component/Section/Result/Section";
import {Draggable} from "react-beautiful-dnd";
import {ResultQuestionContainer} from "../../containers";
import leftArrow from '../../assets/icon/leftArrow.png'
import rightArrow from '../../assets/icon/rightArrow.png'
import ImgButton from "../../ui/ImgButton";
import {postSurveyResponse} from "../../api/survey";
import toastMsg from "../../ui/Toast";

const Preview = () => {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.form);
  const { currentIndex, indexes } = useSelector(state => state.surveyFlow);
  const { questions } = form;
  const { id } = useParams();
  const currentPath = useLocation();
  // 설문 참여 url이 아니면 제출버튼을 눌러도 아무 효과가 없어야 한다.
  const _moveToNext = () => {
      if (currentIndex !== indexes[currentIndex].nextIndex) {
          // 이동할 다음 페이지의 prev를 현재 페이지의 current로 설정
          console.log(indexes[currentIndex].nextIndex);
          console.log(currentIndex);
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
      // 1. 현재 섹션의 모든 질문을 돌면서 선택한 옵션이 있나 확인
      //    1-1. 여기서 가장 마지막에 선택한 옵션을 기준으로 생각한다.
      // 2. 섹션 자체가 가리키는 다음 섹션 값도 확인한다.

      let lastId;
      console.log(questions[currentIndex]);
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
      // option의 다음 section을 지정하지 않으면 -1 반환,
      // 설문 제출로 선택하면 자기 자신 반환
      return typeof(lastId) === 'undefined' ? -1 : questions.findIndex((item) => item.id === lastId);
  }

  const _determineFlow = () => {
      // 3. 다음 섹션 아이디를 반복문을 통해서 몇번째 인덱스에 존재하는지 확인하기.
      // 여기서 조건문을 한번 더 줘야겠네.
      const nextSectionIndex = indexes[currentIndex].nextIndex;
      const lastidx = _getIndexAgainForComparison();
      // lastidx가 자기 자신이어도 제출로 이동
      console.log(lastidx);
      console.log(indexes[currentIndex].nextIndex);
      if(lastidx !== nextSectionIndex) {
          dispatch(surveyFlowActions.setNextIndex({ pageIndex : currentIndex, value : lastidx}));
      }

      console.log(form.form.bgColor)
      return (
          (indexes[currentIndex].nextIndex === -1 || indexes[currentIndex].nextIndex === currentIndex) ? (
              <>
                  <Buttons>
                      {/*<Link to={'/result'} style={{ textDecoration: 'none' }}>*/}
                          <div className="submit-button" onClick={submitHandler}>제출</div>
                      {/*</Link>*/}
                  </Buttons>

                  <ArrowButtonWrapper>
                      {indexes[currentIndex].prevIndex === -1 ? (
                          // 더 이상 뒤로 갈 섹션이 없는 경우 버튼을 비활성화 시킨다.
                          <ArrowImageButton
                              size={2}
                              color={"white"}
                              backgroundColor={form.form.bgColor}
                          />
                      ) : (
                          <ArrowImageButton
                              size={2}
                              onClick={_moveToPrev}
                              ImgSrc={leftArrow}
                              color={"white"}
                              backgroundColor={form.form.bgColor}
                          />
                      )}
                  </ArrowButtonWrapper>
              </>
      ) : (
          <ArrowButtonWrapper>
              {indexes[currentIndex].prevIndex === -1 ? (
                  // 더 이상 뒤로 갈 섹션이 없는 경우 버튼을 비활성화 시킨다.
                  <ArrowImageButton
                      size={2}
                      color={"white"}
                      backgroundColor={form.form.bgColor}
                  />
              ) : (
                  <ArrowImageButton
                      size={2}
                      onClick={_moveToPrev}
                      ImgSrc={leftArrow}
                      color={"white"}
                      backgroundColor={form.form.bgColor}
                  />
              )}
              <ArrowImageButton
                  size={2}
                  onClick={_moveToNext}
                  ImgSrc={rightArrow}
                  color={"white"}
                  backgroundColor={form.form.bgColor}
              />
          </ArrowButtonWrapper>
      ));
  }

  const _findNextIndexFromId = (targetId) => {
      const nextSectionIndex = _findIndexFromId(targetId);
      return nextSectionIndex;
  }


  const _findIndexFromId = (targetId) => {
      return questions.findIndex((element) => element.id === targetId);
  }

  const getResultSection = () => {
      return (
          <>
              <ResultSection section_idx={currentIndex + 1} section_len={questions.length}/>
              {questions[currentIndex] && questions[currentIndex].questionList.map((question, question_idx) => (
                  <ResultQuestionContainer key={question.id} questionId={question.id} sectionId={questions[currentIndex].id}/>
              ))}
          </>
    )
  }

  // 이 컴포넌트가 미리보기 화면이 아닌 실제 설문에서 사용됐다면, 상태값을 기반으로 정답 데이터를 백엔드로 보내줌
  const submitHandler = () => {
      if (currentPath.pathname === `/form/in-progress/${id}`) {
          const responseData = ResponseDataBuilder();
          console.log(responseData);
          if(responseData === null || responseData.participateAnswerDTOList.length === 0) {
              if(responseData === null) {
                  toastMsg("필수 질문에 응답하지 않았습니다.", false);
              } else {
                  toastMsg("응답을 기록해주세요", false);
              }
          } else {
              postSurveyResponse(responseData)
                  .then().catch(error => {console.log(error)});
          }
      }
  }

    const ResponseDataBuilder = () => {
        const responseData = {
            surveyId: id,
            participateAnswerDTOList: [],
        };

        // questions.forEach((section) => {
        //     section.questionList.forEach((question) => {
        //         const participateAnswerDTO = {
        //             questionId: question.id,
        //             questionType: question.type,
        //         };
        //         // TODO 플로우 고려해서 데이터 빌드해야함
        //         if(question.answers.length !== 0 || question.narrativeAnswer !== undefined) {
        //             // 둘 중 하나라도 데이터가 있을때
        //             if (question.type === 0 || question.type === 2 || question.type === 3) {
        //                 participateAnswerDTO.questionChoiceId = question.answers;
        //             } else if (question.type === 1) {
        //                 participateAnswerDTO.answerSentence = question.narrativeAnswer;
        //             }
        //             // participateAnswerDTO.questionChoiceId = question.answers;
        //             // participateAnswerDTO.answerSentence = question.narrativeAnswer;
        //             participateAnswerDTO.isNecessary = question.isNecessary;
        //             responseData.participateAnswerDTOList.push(participateAnswerDTO);
        //         }
        //     });
        // });
        /////////////////////////////
        let next = -2;
        let current = 0;

        while (next !== -1) {
            const questionList = questions[current].questionList;

            for (let i = 0; i < questionList.length; i++) {
                const questionEach = questionList[i];

                // 정답이 있는지 없는지 확인
                console.log(questionEach.answers);
                console.log(questionEach.narrativeAnswer);

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
      <>
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
        </Wrapper>
        {_determineFlow()}
      </>
  )
};

const ArrowButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin-top: 20px;
`;

const ArrowImageButton = styled(ImgButton)`
  cursor: pointer;
  font-size: 16px;
  padding: 10px 0;
  width: 80px;
  border-radius: 5px;
  ${({ theme }) => theme.flexCenter}
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  margin-top: 20px;
  .submit-button {
    cursor: pointer;
    font-size: 16px;
    padding: 10px 0;
    width: 80px;
    border-radius: 5px;
    ${({ theme }) => theme.flexCenter}
    color: ${({ theme }) => theme.color.white};
    background: ${({ theme }) => theme.color.purple};
  }
`;

const Wrapper = styled.div`
${({ theme }) => theme.flexCenter};
  background-color: ${({ backgroundColor }) => backgroundColor};
  width: 100%;
  overflow:visible;
 
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