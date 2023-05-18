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
  const { currentIndex, nextIndex, prevIndex } = useSelector(state => state.surveyFlow);
  const { questions } = form;

    console.log("현재 인덱스 " + currentIndex);
    console.log("이전 인덱스 " + prevIndex);
  const _moveToNext = () => {
      // if(currentIndex !== nextIndex) {
      //     // 현재 인덱스를 먼저 이전 인덱스로 지정해주고, 현재 인덱스를 nextIndex로 지정해준다.
      //     dispatch(surveyFlowActions.setPrevIndex(currentIndex));
      //     dispatch(surveyFlowActions.setCurrentIndex(nextIndex));
      // }
      // dispatch(surveyFlowActions.setPrevIndex(currentIndex));
      dispatch(surveyFlowActions.setCurrentIndex(nextIndex));
  }

  const _moveToPrev = () => {
      // dispatch(surveyFlowActions.setNextIndex(currentIndex));
      dispatch(surveyFlowActions.setCurrentIndex(prevIndex));
      // Next는 자동으로 지정해줘서 여기서 따로 지정을 안해줘도 되지만, prev Index의 경우는 지정을 해줘야 한다.
      // 여기서 다시 아이디로 인덱스를 찾은 뒤에 questions에 접근해서, 그 이전 값에 접근해야 한다.
      // dispatch(surveyFlowActions.setPrevIndex(_findPrevIndexFromId(questions[prevIndex].id)));

  }

  const _determineFlow = () => {
      // 현재 인덱스의 섹션을 보고, 다음 섹션의 아이디와 이를 기반으로 이동해야 하는 다음 섹션의 인덱스를 알아내는 함수
      // 1. currentIndex에 해당하는 섹션 들고오기
      console.log(questions[currentIndex])

      // 2. 가져온 섹션에서 다음 섹션 아이디 알아내기
      const nextSectionId = questions[currentIndex].nextSectionId;

      // 3. 다음 섹션 아이디를 반복문을 통해서 몇번째 인덱스에 존재하는지 확인하기.
      const nextSectionIndex = _findNextIndexFromId(nextSectionId);

      // 4. 
      // 이제 알아낸 다음 인덱스를 리덕스에 저장한다.
      if(nextSectionIndex !== nextIndex) {
          dispatch(surveyFlowActions.setNextIndex(nextSectionIndex));
      }

      // 5. 이전 인덱스도 저장한다.
      if(prevIndex !== currentIndex - 1 && currentIndex - 1 >= -1) {
          dispatch(surveyFlowActions.setPrevIndex(currentIndex - 1));
      }

      // alpha : 첫 인덱스일때는 오른쪽 화살표만, 마지막 인덱스일때는 제출과 왼쪽 화살표만 렌더링되어야 함.
      // 제출버튼 렌더링 조건에 대한 처리도 해줘야 함
      return (
        questions.length < 2 ? (
          <Buttons>
              <Link to={'/result'} style={{ textDecoration: 'none' }}>
                  <div className="submit-button">제출</div>
              </Link>
          </Buttons>
      ) : (
          <ArrowButtonWrapper>
              {prevIndex === -1 ? (
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
              {nextIndex === questions.length ? (
                  <ArrowImageButton
                      size={2}
                      color={"white"}
                  />
              ) : (
                  <ArrowImageButton
                      size={2}
                      onClick={_moveToNext}
                      ImgSrc={rightArrow}
                      color={"white"}
                  />
              )}
          </ArrowButtonWrapper>
      ));
  }

  const _findNextIndexFromId = (targetId) => {
      // const section = questions.find((item) => item.id === sectionId);
      const nextSectionIndex = _findIndexFromId(targetId);
      // 해당되는 요소가 없으면 -1이 반환된다고 한다.
      // 즉 다음 섹션을 지정하지 않았다는 말이기 때문에 이 경우에는 그냥 다음 인덱스를 지정해준다.
      let _nextIndex;
      if(nextSectionIndex === -1) {
          console.log(questions.length);
          _nextIndex = currentIndex + 1 < questions.length ? currentIndex + 1 : questions.length;
      } else {
          _nextIndex = nextSectionIndex;
      }

      console.log("다음 인덱스 " + _nextIndex);

      return _nextIndex;
  }


  // const _findPrevIndexFromId = (targetId) => {
  //   const findIndexFromId = _findIndexFromId(targetId);
  //   let _prevIndex;
  //   if(findIndexFromId === -1) {
  //       _prevIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : 0;
  //   } else {
  //       _prevIndex = findIndexFromId;
  //   }
  //   return _prevIndex;
  // }

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
                    {questions[currentIndex].questionList.map((question, question_idx) => (
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