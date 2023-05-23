import { createSlice } from '@reduxjs/toolkit';
import { QUESTION_TYPES } from '../component/constants/const';
import shortid from 'shortid';
const initQuestionId = shortid()
const initialState =
  [
    {
      id: shortid(),
      nextSectionId: '',
      questionOrder: initQuestionId,
      questionList: [{
        id: initQuestionId,
        type: 0,
        questionContent: '',
        isNecessary: false,
        options: [],
        answers: [],
        narrativeAnswer: '',
      },]
    }
    ,];


const getNewOption = (option) => ({
  id: shortid(),
  option: option,
  image: '',
  nextSectionId: '',
});

const getNewOptionWithId = (option, optionId) => ({
  id: optionId,
  option: option,
  image: '',
  nextSectionId: '',
});

const { actions: questionActions, reducer: questionReducer } = createSlice({
  name: 'question',
  initialState,
  reducers: {
    initQuestion: (state, action) => {
      const { data } = action.payload;
      console.log(data.sectionList);
      return data.sectionList;

    },
    changeType: (state, action) => {
      const { questionId, sectionId, type } = action.payload;
      const section = state.find((item) => item.id === sectionId);
      const question = section.questionList.find((item) => item.id === questionId);
      question && (question.type = type);

      type === QUESTION_TYPES.TRUE_FALSE ? (question.options = [{ id: 1, option: 'O' }, { id: 2, option: 'X' }]) :
        type === QUESTION_TYPES.LONG_ANSWER ? (question.options = []) :
          question && (question.answers = []);

    },

    setNecessary: (state, action) => {
      const { sectionId, questionId } = action.payload;
      const section = state.find((item) => item.id === sectionId);

      const question = section.questionList.find((item) => item.id === questionId);
      question && (question.isNecessary = !question.isNecessary);
    },

    setQuestionContent: (state, action) => {
      const { sectionId, questionId, questionContent } = action.payload;
      const section = state.find((item) => item.id === sectionId);
      const question = section.questionList.find((item) => item.id === questionId);
      question && (question.questionContent = questionContent);
    },

    addSection: (state, action) => {


      const { newSection } = action.payload;
      
      state.push(newSection);
    },


    deleteSection: (state, action) => {
      // 여기서 자신을 참조하는 섹션들을 찾은 뒤, 삭제에 대한 처리를 추가적으로 해줘야 함
      const { section_idx } = action.payload;
      const newState = state;
      // Find the section to be deleted
      const sectionToDelete = newState[section_idx - 1];

      // Loop through all sections to update any references to the section being deleted
      // 삭제될 섹션을 참조하는 모든 옵션에 대해서 참조를 해제해준다.
      // 옵션 뿐만 아니라 섹션도 이와 같은 처리가 필요함
      newState.forEach((section, idx) => {
        section.questionList.forEach(question => {
          if (question.options) { // question.options가 null인지 확인
            question.options.forEach(option => {
              if (option.nextSectionId === sectionToDelete.id) {
                option.nextSectionId = '';
              }
            });
          }
        });
      
        if (section.nextSectionId === sectionToDelete.id) {
          section.nextSectionId = '';
        }
      });
      

      // Remove the section from the state
      newState.splice(section_idx - 1, 1);
      
      return newState;
    },


    addQuestion: (state, action) => {
      const { sectionId, newQuestion } = action.payload;

      const section = state.find((item, idx) => item.id === sectionId);
      section.questionList.push(newQuestion);
      section.questionOrder = section.questionOrder + "," + newQuestion.id
      
    },


    deleteQuestion: (state, action) => {
      const { sectionId, questionId } = action.payload;
      const section = state.find((item) => item.id === sectionId);
      section.questionList = section.questionList.filter((item) => item.id !== questionId);
      const updatedQuestionOrder = section.questionOrder
        .split(',')
        .filter((order) => order !== questionId)
        .join(',');
      section.questionOrder = updatedQuestionOrder
      return state;
    },

    addOption: (state, action) => {
      const { sectionId, questionId } = action.payload;

      const section = state.find((item) => item.id === sectionId);
      const questionIdx = section.questionList.findIndex((item) => item.id === questionId);
      section.questionList[questionIdx].options.push(getNewOption(`옵션`));
    },

    addOptionWithId: (state, action) => {
      const { sectionId, questionId, optionId } = action.payload;
      const section = state.find((item) => item.id === sectionId);
      const questionIdx = section.questionList.findIndex((item) => item.id === questionId);
      console.log("질문 번호 : " + questionIdx);
      // 여기 수정해야함
      section.questionList[questionIdx].options.push(getNewOptionWithId(`옵션`, optionId));
    },

    deleteOption: (state, action) => {
      const { sectionId, questionId, optionId } = action.payload;
      const section = state.find((item) => item.id === sectionId);
      const questionIdx = section.questionList.findIndex((item) => item.id === questionId);
      section.questionList[questionIdx].answers = section.questionList[questionIdx].answers.filter((item) => item !== optionId);
      // 삭제할 옵션을 제외하고 배열을 다시 만들어서 반환.
      section.questionList[questionIdx].options = section.questionList[questionIdx].options.filter((item) => item.id !== optionId);
      return state;
    },

    addOptionByBot: (state, action) => {
      const { sectionId, questionId, content } = action.payload;

      const section = state.find((item) => item.id === sectionId);
      const questionIdx = section.questionList.findIndex((item) => item.id === questionId);
      section.questionList[questionIdx].options.push(getNewOption(content));

    },
    addAllOptionByBot: (state, action) => {
      const { sectionId, questionId, content } = action.payload;

      const section = state.find((item) => item.id === sectionId);
      const questionIdx = section.questionList.findIndex((item) => item.id === questionId);
      content.forEach((item) => {
        section.questionList[questionIdx].options.push(getNewOption(item));
      });

    },

    deleteOptionByBot: (state, action) => {
      const { sectionId, questionId, optionId } = action.payload;
      const section = state.find((item) => item.id === sectionId);
      const questionIdx = section.questionList.findIndex((item) => item.id === questionId);
      section.questionList[questionIdx].options = section.questionList[questionIdx].options.filter((item) => item.id !== optionId);
      return state;
    },

    setOptionContent: (state, action) => {
      const { sectionId, questionId, optionId, optionContent } = action.payload;
      const section = state.find((item) => item.id === sectionId);

      const questionIdx = section.questionList.findIndex((item) => item.id === questionId);
      const optionIdx = section.questionList[questionIdx].options.findIndex((item) => item.id === optionId);
      section.questionList[questionIdx].options[optionIdx].option = optionContent;
    },

    setNextSection: (state, action) => {
      const { section_idx, nextSectionId } = action.payload;
      const section = state.find((item, idx) => idx === section_idx);
      section.id === nextSectionId ? section.nextSectionId = -1 : section.nextSectionId = nextSectionId;
    },
    setOptionNextSection: (state, action) => {
      const { sectionId, optionId, questionId, nextSectionId } = action.payload;
      const section = state.find((item) => item.id === sectionId);
      const questionIdx = section.questionList.findIndex((item) => item.id === questionId);
      const optionIdx = section.questionList[questionIdx].options.findIndex((item) => item.id === optionId);
      section.questionList[questionIdx].options[optionIdx].nextSectionId = nextSectionId;
    },

    setOptionImage: (state, action) => {
      const { sectionId, optionId, questionId, image } = action.payload;
      const section = state.find((item) => item.id === sectionId);
      const questionIdx = section.questionList.findIndex((item) => item.id === questionId);
      const optionIdx = section.questionList[questionIdx].options.findIndex((item) => item.id === optionId);
      section.questionList[questionIdx].options[optionIdx].image = image;
    },
    getOptionImage: (state, action) => {
      const { sectionId, optionId, questionId } = action.payload;
      // alert(JSON.stringify(action.payload))
      const section = state.find((item) => item.id === sectionId);
      const questionIdx = section.questionList.findIndex((item) => item.id === questionId);
      const optionIdx = section.questionList[questionIdx].options.findIndex((item) => item.id === optionId);
      // section.questionList[questionIdx].options[optionIdx].image;

    },

    setNarrativeAnswer: (state, action) => {
      const { sectionId, questionId, narrativeContent } = action.payload;
      const section = state.find((item) => item.id === sectionId);
      const question = section.questionList.find((item) => item.id === questionId);
      question.narrativeAnswer = narrativeContent;
      // const questionIndex = state.findIndex((item) => item.id === String(questionId));
      // state[questionId].narrativeAnswer = narrativeContent;
    },

    markOneAnswer: (state, action) => {
      const { questionId, optionId, isAnswer } = action.payload;
      // const question = state.find((item) => item.id === questionId);
      const question = state.flatMap((item) => item.questionList).find((question) => question.id === questionId);
      if (!question) return;
      question.answers.length > 0 && question.answers.splice(-1, 1); // 한개만 저장하기 위함
      if (!isAnswer) {
        question.answers.push(optionId);
      }
    },

    deleteOneOptionalAnswer: (state, action) => {
      const { sectionId, questionId, optionId } = action.payload;
      // const question = state.flatMap((item) => item.questionList).find((question) => question.id === questionId);
      const section = state.find((item) => item.id === sectionId);
      const questionIdx = section.questionList.findIndex((item) => item.id === questionId);
      section.questionList[questionIdx].answers = section.questionList[questionIdx].answers.filter((item) => item !== optionId);
    },

    markMultipleAnswer: (state, action) => {
      // const { sectionId, optionId, isAnswer } = action.payload;
      // const question = state.find((item) => item.id === sectionId);
      // if (!question) return;
      // const answerIdx = question.answers.findIndex((item) => item === optionId);
      //
      // if (!isAnswer) {
      //   question.answers.push(optionId);
      // } else {
      //   if (answerIdx === 0) question.answers.shift();
      //   else question.answers.splice(answerIdx, 1);
      // }
      // 여기 로직은 내가 다시 짜야할듯
      const { questionId, optionId, isAnswer } = action.payload;
      // const question = state.find((item) => item.id === questionId);
      const question = state.flatMap((item) => item.questionList).find((question) => question.id === questionId);
      if (!question) return;
      // 단일 선택과는 다르게 조건문을 체크하지 않고 그냥 answer 배열에 바로 추가한다.
      if (!isAnswer) {
        question.answers.push(optionId);
      }
    },

    resetAnswer: (state) => {
      state.map((item) => {
        item.answers = [];
        item.narrativeAnswer = '';
      });
    },

    reorderQuestion: (state, action) => {
      const { source, destination } = action.payload;
      
      // alert(JSON.stringify(action.payload));
      // alert(JSON.stringify(secondIdx));
      const source_section_idx = source.droppableId;
      const destination_section_idx = destination.droppableId;
      const source_question_idx = source.index;
      const destination_question_idx = destination.index;
      
      const [removed] = state[source_section_idx].questionList.splice(source_question_idx, 1);
      state[destination_section_idx].questionList.splice(destination_question_idx, 0, removed);
    },
    orderChange: (state, action) => {
      const { source, destination,response } = action.payload;
      
      // alert(JSON.stringify(action.payload));
      // alert(JSON.stringify(secondIdx));
      const source_section_idx = source.droppableId;
      const destination_section_idx = destination.droppableId;

      state[source_section_idx].questionOrder=response.startSectionOrder;
      state[destination_section_idx].questionOrder=response.endSectionOrder;
    },
  },
});

export { questionActions };
export default questionReducer;
