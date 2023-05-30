
import styled from 'styled-components';
import { TitleBox, SideMenu } from '../../component';
import QuestionContainer from '../../containers/QuestionContainer/QuestionContainer';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import {questionActions, formActions, surveyFlowActions} from '../../slices';
import Select from "react-select";
import Section from '../../component/Section/Section';
import { updateSurveyDescription, updateSurveyTitle, updateQuestionOrder,updateSection } from '../../api/survey';
function FormMake() {
  const { form, questions } = useSelector((state) => state.form);
  const { currentIndex } = useSelector((state) => state.surveyFlow);

  const dispatch = useDispatch();

  const options = (section_id) => {
    const optionList = [
      {
        value: '',
        label: '다음 섹션을 선택해주세요.',
      },
      ...questions
      // .filter((section) => section.id != section_id)
      .map((section, index) => ({
        value: section.id,
        label: `${index + 1} 섹션으로 이동`,
        // label: `${section.id} 섹션으로 이동`,

      }))
      .filter((section) => section.value !== section_id)
      ,
    ];
    optionList.push({
      value: section_id,
      label: "설문 제출",
    });
    return optionList;
  };

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


  const changeNextSectionRedux = (section_idx,nextSectionId)=>{

    dispatch(questionActions.setNextSection({ section_idx, nextSectionId: nextSectionId }))
  }

  const handleChange = (option, { section_idx },section_id) => {
    // alert(JSON.stringify(option))
    const nextSectionIndex = questions.findIndex((item) => item.id === option.value)
    if(form.isPre){
      const data = {
        "nextSectionId" : option.value
      };
      updateSection(form.id,option.value,data,changeNextSectionRedux,section_idx,section_id);
      dispatch(surveyFlowActions.setNextIndex({ pageIndex : currentIndex, value : nextSectionIndex}))
    }else{
      changeNextSectionRedux(section_idx,option.value);
      dispatch(surveyFlowActions.setNextIndex({ pageIndex : currentIndex, value : nextSectionIndex}))
    }

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
  const handleBlurTitle = (value) => {
    if (form.isPre) {
      const data = { "title": value }
      updateSurveyTitle(form.id, data)
    }
  }
  const handleBlurDetail = (value) => {
    if (form.isPre) {
      const data = { "description": value }
      updateSurveyDescription(form.id, data)
    }
  }
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

                <Draggable key={String(question.id)}
                  draggableId={String(question.id)}
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
                      <QuestionContainer key={question.id} questionId={question.id} sectionId={section.id} provided={provided} snapshot={snapshot} questionOption={options(section.id)} />
                    </div>
                  )}
                </Draggable>
              ))
              }
              {questions.length === 1 ? null : (
                <Select
                  placeholder="다음 섹션을 선택해주세요."
                  styles={customStyles}
                  value={section.nextSectionId
                    ? options(section.id).find(option => option.value === section.nextSectionId)
                    : options(section.id)[0]}
                  onChange={(selectedOption) => handleChange(selectedOption, { section_idx }, section.id)}
                  options={options(section.id)}
                />

              )}
              <SideMenu sectionId={section.id} />


            </SectionContainer>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    ));
  };

  const reorderRedux = ({ source, destination }) => {
    dispatch(questionActions.reorderQuestion({ source, destination }));
  }

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!result.destination) {
      return;
    }

    if (form.isPre) {
      const startSection = questions.find((item, idx) => idx == source.droppableId);
      const question = startSection.questionList[source.index];

      const endSection = questions.find((item, idx) => idx == destination.droppableId);
      const data = {
        "startSectionId": startSection.id,
        "startSectionIdx": source.index,
        "endSectionId": endSection.id,
        "endSectionIdx": destination.index
      }

      updateQuestionOrder(form.id, startSection.id, question.id, data, reorderRedux, source, destination);

    }
    else {
      reorderRedux({ source, destination })
    }


  };


  // Survey 데이터와 option 데이터를 가져와서 surveyDto 객체를 생성하고 서버에 저장하는 함수


  return (
    <Wrapper>
      <QuestionWrapper>
        {/* <SurveyImg></SurveyImg> */}

        <TitleBox info={form} handleTitle={handleTitle} handleDetail={handleDetail} handleBlurTitle={handleBlurTitle} handleBlurDetail={handleBlurDetail} readOnly={false} />

        <DragDropContext onDragEnd={onDragEnd}>
          {getQuestionList()}
        </DragDropContext>

      </QuestionWrapper>

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