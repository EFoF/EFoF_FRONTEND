import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { TitleBox } from '../../component';
import { PreviewContainer } from '../../containers';
import { useSelector } from 'react-redux';
import { questionActions } from '../../slices';
import Section from "../../component/Section/Section";
import {Draggable} from "react-beautiful-dnd";
import QuestionContainer from "../../containers/QuestionContainer/QuestionContainer";

const Preview = () => {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.form);
  const { questions } = form;
  // const handleReset = () => {
  //   dispatch(questionActions.resetAnswer());
  // };

  return (
    <Wrapper style={{ flexDirection: 'column', alignItems: 'center' }}>
        <QuestionWrapper>
      {/*<div className="question">*/}
        <TitleBox info={form.form} readOnly={true}/>
        {questions.map((section, section_idx) => (
            // 첫번째 루프 안은 섹션이 나열된다.
            // needs another map function for section here.
            // console.log(section)
            <SectionContainer key={section.id}>
                <Section section_idx={section_idx + 1} section_len={questions.length} readOnly={true}/>
                {section.questionList.map((question, question_idx) => (
                            <div>
                                <QuestionContainer key={question.id} questionId={question.id} sectionId={section.id} readOnly={true} />
                            </div>
                        ))}
            </SectionContainer>
            // section.questionList.map((question) => (
            //     <PreviewContainer key={question.id} questionId={question.id} />
            // ))
          // <PreviewContainer key={question.id} questionId={question.id} />
        ))}
      {/*</div>*/}
        </QuestionWrapper>
      {/*<Buttons>*/}
      {/*  <Link to={'/result'} style={{ textDecoration: 'none' }}>*/}
      {/*    <div className="submit-button">제출</div>*/}
      {/*  </Link>*/}
      {/*  <div className="reset-button" onClick={() => {console.log("하이 데얼")}}>*/}
      {/*    양식 지우기*/}
      {/*  </div>*/}
      {/*</Buttons>*/}
    </Wrapper>
  );
};

const Buttons = styled.div`
  display: flex;
  align-items: center;
  width: 768px;
  justify-content: space-between;
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
  .reset-button {
    cursor: pointer;
    font-size: 14px;
    color: ${({ theme }) => theme.color.purple};
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

const SectionContainer = styled.div`
margin-bottom:0.5rem;
border-radius: 10px;
position: relative;
box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
overflow:visible;
`;

export default Preview;