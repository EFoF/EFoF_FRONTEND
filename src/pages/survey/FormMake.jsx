import { useState } from 'react';
import styled from 'styled-components';
import { TitleBox, SideMenu } from '../../component';
import QuestionContainer from '../../containers/QuestionContainer/QuestionContainer';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { questionActions, formActions } from '../../slices';
import Select from "react-select";
import Section from '../../component/Section/Section';
import Button from '../../ui/button';
import axios from 'axios';
function FormMake() {
  const { form, questions } = useSelector((state) => state.form);
  const [selectedOption, setSelectedOption] = useState([]);
  // const [selectedOption, setSelectedOption] = useState(null);
  const dispatch = useDispatch();
  
  const options = questions.map((section, index) => ({
    value: String(section.id),
    label: `${index + 1} 섹션으로 이동`,
  }));
  options.push({
    value: 'last',
    label: "설문 제출",
  });


  //option 추가 로직 추가 예정
  const customStyles = {
    container: (provided, state) => ({
      ...provided,
      width: '12rem',

      position: 'absolute',
      right: '0.5rem',
      marginTop: '0.8rem',
      fontSize: "0.8rem",
      // display: "flex",
      // justifycontent: "center",
      // alignself: "flex-end",
      // width: '12rem',
    }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "white",
      borderColor: state.isFocused ? "red" : "gray",
      ":hover": { borderColor: "red" },
    }),
    option: (provided, state) => ({
      ...provided,
      // border: "1px dotted black",
      color: state.data.color,
      opacity: 0.8,
      // fontSize: "1rem",
      // width: '12rem',
    }),
  };

  const handleChange = (option,{section_idx}) => {
    alert(JSON.stringify(option))
    dispatch(questionActions.setNextSection({section_idx,nextSectionId:option.value}))
    const newSelectedOption = [...selectedOption]; // 새로운 배열 생성
    newSelectedOption[section_idx] = option; // 해당 인덱스에 옵션 값 대입
  
    setSelectedOption(newSelectedOption);
  };

  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "#F5F5F9" : "",

  });

  const getItemStyle = (isDragging, draggableStyle) => ({

    ...draggableStyle
  });

  const handleTitle = (value) => {
    dispatch(formActions.changeTitle(
      value
    ));
  };

  const handleDetail = (value) => {
    dispatch(formActions.changeDetail(
      value,
    ));
  };


  const getQuestionList = () => {

    return questions.map((section, section_idx) => (

      <Droppable droppableId={`${section_idx}`} key={section_idx}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
            {...provided.droppableProps}>

            <SectionContainer key={section.id}>
              <Section section_idx={section_idx + 1} section_len={questions.length} />
              {section.questionList.map((question, question_idx) => (

                <Draggable key={question.id}
                  draggableId={question.id}
                  index={question_idx}>
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef}
                      {...provided.draggableProps}
                      // {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <QuestionContainer key={question.id} questionId={question.id} sectionId={section.id} provided={provided} snapshot={snapshot} questionOption={options}/>
                    </div>
                  )}
                </Draggable>
              ))
              }
              {questions.length === 1 ? null : (
                <Select
                  placeholder="다음 섹션을 선택해주세요."
                  styles={customStyles}
                  value={selectedOption[section_idx]}
                  onChange={(selectedOption) => handleChange(selectedOption, {section_idx})}
                  options={options}
                />
              )}
              <SideMenu sectionId={section_idx} />


            </SectionContainer>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    ));
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!result.destination) {
      return;
    }

    dispatch(questionActions.reorderQuestion({ source, destination }));

  };


  function createSurveyDto() {
    // survey 데이터와 option 데이터를 조합한 surveyDto 객체 생성하는 로직
    // return {
    //   ...form,
    //   sections: questions.map((section) => ({
    //     ...section,
    //     questionList: section.questionList.map((question) => ({
    //       ...question,
    //       options: question.options.map((option) => ({
    //         ...option,
    //         image: '',
    //       })),
    //     })),
    //   })),
    // };

    return {
      title: form.title,
      detail: form.detail,
      image: form.image,
      fontColor: form.fontColor,
      bgColor: form.bgColor,
      btColor: form.btColor,
      sections: questions,
    };
  }
  
  function saveSurvey(surveyDto) {
    // Survey 데이터를 Spring 서버로 전송하는 POST 요청
    axios.post('http://localhost:8080/form', surveyDto,{headers: {
      'Content-Type': 'application/json'
    }})
      .then(response => {
        alert("TEEST")
        alert(JSON.stringify(response.data));
      })
      .catch(error => {
        alert(error);
      });
  }
  
  // Survey 데이터와 option 데이터를 가져와서 surveyDto 객체를 생성하고 서버에 저장하는 함수
  function saveSurveyFromData() {
    const surveyDto = createSurveyDto();
    // alert(JSON.stringify(surveyDto))
    saveSurvey(surveyDto);
  }

  return (
    <Wrapper>
      <QuestionWrapper>
        {/* <SurveyImg></SurveyImg> */}
        <TitleBox info={form} handleTitle={handleTitle} handleDetail={handleDetail} />
        <DragDropContext onDragEnd={onDragEnd}>
          {getQuestionList()}
        </DragDropContext>

      </QuestionWrapper>
      <button onClick={saveSurveyFromData}>
        생성하기
      </button>

    </Wrapper>
  );
};

// ${({ theme }) => theme.flexCenter};
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

export default FormMake;