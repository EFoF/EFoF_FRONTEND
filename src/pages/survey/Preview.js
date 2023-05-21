import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ResultTitleBox } from '../../component';
import { PreviewContainer } from '../../containers';
import { useSelector } from 'react-redux';
import { questionActions, surveyFlowActions } from '../../slices';
import ResultSection from "../../component/Section/Result/Section";
import {Draggable} from "react-beautiful-dnd";
import {ResultQuestionContainer} from "../../containers";
import leftArrow from '../../assets/icon/leftArrow.png'
import rightArrow from '../../assets/icon/rightArrow.png'
import ImgButton from "../../ui/ImgButton";

const Preview = () => {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.form);
  const { currentIndex, indexes } = useSelector(state => state.surveyFlow);
  const { questions } = form;

  const _moveToNext = () => {
      if (currentIndex !== indexes[currentIndex].nextIndex) {
          // 이동할 다음 페이지의 prev를 현재 페이지의 current로 설정
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
      if(typeof(questions[currentIndex]) !== 'undefined') {
          questions[currentIndex].questionList.map((question) => {
              question.answers.map((answer) => {
                  lastId = answer;
              })
              const option = question.options.find((item) => item.id === lastId);
              if(typeof(option) !== 'undefined') {
                  lastId = option.nextSectionId;
              }
          })
          if(typeof(lastId) === 'undefined') {
              if(questions[currentIndex].nextSectionId !== '') {
                  lastId = questions[currentIndex].nextSectionId;
              }
          }
      }
      return typeof(lastId) === 'undefined' ? -1 : questions.findIndex((item) => item.id === lastId);
  }

  const _determineFlow = () => {
      // 3. 다음 섹션 아이디를 반복문을 통해서 몇번째 인덱스에 존재하는지 확인하기.
      // 여기서 조건문을 한번 더 줘야겠네.
      const nextSectionIndex = indexes[currentIndex].nextIndex;
      const lastidx = _getIndexAgainForComparison();
      console.log(lastidx);
      console.log(indexes[currentIndex].nextIndex);
      if(lastidx !== nextSectionIndex) {
          dispatch(surveyFlowActions.setNextIndex({ pageIndex : currentIndex, value : lastidx}));
      }
      // 첫번째. 현재 있는 섹션에서 어떤 옵션을 선택하지는 않았는가?
      // => 옵션을 선택하지 않았다면 지정되어있는 섹션이 있는가?
      // 현재 인덱스에서 next를 다시 구한다. (섹션 지정값, 옵션 등을 확인해서)
      // 여기서 다시 구한 next가 indexes 값이랑 다르다면, indexes 값을 업데이트 해준다.



      // 4.
      // 이제 알아낸 다음 인덱스를 리덕스에 저장한다.
      // if(nextSectionIndex !== indexes[currentIndex].nextIndex) {
      //     dispatch(surveyFlowActions.setNextIndex({pageIndex : currentIndex, value : nextSectionIndex}));
      // }
      return (
          indexes[currentIndex].nextIndex === -1 ? (
              <>
                  <Buttons>
                      <Link to={'/result'} style={{ textDecoration: 'none' }}>
                          <div className="submit-button">제출</div>
                      </Link>
                  </Buttons>
                  <ArrowButtonWrapper>
                      {indexes[currentIndex].prevIndex === -1 ? (
                          // 더 이상 뒤로 갈 섹션이 없는 경우 버튼을 비활성화 시킨다.
                          <ArrowImageButton
                              size={2}
                              color={"white"}
                          />
                      ) : (
                          <ArrowImageButton
                              size={2}
                              onClick={_moveToPrev}
                              ImgSrc={leftArrow}
                              color={"white"}
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
                  />
              ) : (
                  <ArrowImageButton
                      size={2}
                      onClick={_moveToPrev}
                      ImgSrc={leftArrow}
                      color={"white"}
                  />
              )}
              <ArrowImageButton
                  size={2}
                  onClick={_moveToNext}
                  ImgSrc={rightArrow}
                  color={"white"}
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

  return (
    // <Wrapper style={{ flexDirection: 'column', alignItems: 'center' }}>
    //     <QuestionWrapper>
    //   {/*<div className="question">*/}
    //     <TitleBox info={form.form}/>
    //     {questions.map((section, section_idx) => (
    //         // console.dir(section)
    //         <SectionContainer key={section.id}>
    //             <Section section_idx={section_idx + 1} section_len={questions.length} readOnly={true}/>
    //             {section.questionList.map((question, question_idx) => (
    //                         <div>
    //                             <QuestionContainer key={question.id} questionId={question.id} sectionId={section.id} readOnly={true} />
    //                         </div>
    //                     ))}
    //         </SectionContainer>
    //     ))}
    //   {/*</div>*/}
    //     </QuestionWrapper>
    //         <Buttons>
    //             <Link to={'/result'} style={{ textDecoration: 'none' }}>
    //                 <div className="submit-button">제출</div>
    //             </Link>
    //             <div className="arrow-button" onClick={() => {console.log("하이 데얼")}}>
    //                 양식 지우기
    //             </div>
    //         </Buttons>
    // </Wrapper>

    <Wrapper style={{ flexDirection: 'column', alignItems: 'center' }}>
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