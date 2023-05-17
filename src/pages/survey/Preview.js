import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ResultTitleBox } from '../../component';
import { PreviewContainer } from '../../containers';
import { useSelector } from 'react-redux';
import { questionActions } from '../../slices';
import ResultSection from "../../component/Section/Result/Section";
import {Draggable} from "react-beautiful-dnd";
import QuestionContainer from "../../containers/QuestionContainer/QuestionContainer";
import leftArrow from '../../assets/icon/leftArrow.png'
import rightArrow from '../../assets/icon/rightArrow.png'
import ImgButton from "../../ui/ImgButton";

const Preview = () => {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.form);
  const currentIndex = useSelector(state => state.multi);
  const { questions } = form;

  console.dir(questions);
  console.dir(questions[0]);

  const checkSectionFlow = () => {

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
                <ResultSection></ResultSection>
            </ResultSectionContainer>
        </QuestionWrapper>
        {questions.length < 2 ? (
            <Buttons>
                <Link to={'/result'} style={{ textDecoration: 'none' }}>
                    <div className="submit-button">제출</div>
                </Link>
            </Buttons>
        ) : (
            <ArrowButtonWrapper>
                <ArrowImageButton
                    size={2}
                    onClick={() => console.log("왼쪽 화살표 버튼 눌림")}
                    ImgSrc={leftArrow}
                    color={"white"}
                />
                <ArrowImageButton
                    size={2}
                    onClick={() => console.log("오른쪽 화살표 버튼 눌림")}
                    ImgSrc={rightArrow}
                    color={"white"}
                />
            </ArrowButtonWrapper>
        )}
        {/*<Buttons>*/}
        {/*    <Link to={'/result'} style={{ textDecoration: 'none' }}>*/}
        {/*        <div className="submit-button">제출</div>*/}
        {/*    </Link>*/}
        {/*    <div className="reset-button" onClick={() => {console.log("하이 데얼")}}>*/}
        {/*        양식 지우기*/}
        {/*    </div>*/}
        {/*</Buttons>*/}
    </Wrapper>
  );
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