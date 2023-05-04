import { createSlice } from '@reduxjs/toolkit';
import { QUESTION_TYPES } from '../component/constants/const';
import shortid from 'shortid';

const initialState =
  [
    {
      id: shortid(),
      nextSectionId:'',
      questionList: [{
        id: shortid(),
        type: 0,
        questionContent: '',
        isNecessary: false,
        options: [
        
        ],
        answers: [],
        narrativeAnswer: '',
      },]
    }
    ,];


const getNewOption = (option) => ({
  id: shortid(),
  option: option,
  image:'',
  nextSectionId:'',
});

const { actions: questionActions, reducer: questionReducer } = createSlice({
  name: 'question',
  initialState,
  reducers: {
    changeType: (state, action) => {
      const { questionId, sectionId, type } = action.payload;
      const section = state.find((item) => item.id === sectionId);
      const question = section.questionList.find((item) => item.id === questionId);
      question && (question.type = type);
      
      type === QUESTION_TYPES.TRUE_FALSE ? (question.options = [{ id: 1, option: 'O' }, { id: 2, option: 'X' }]) :
        
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

      const newSection = {
          id: shortid(),
          nextSectionId:'',
          questionList: [{
            id: shortid(),
            type: 0,
            questionContent: '',
            isNecessary: false,
            options: [
             
            ],
            answers: [],
            narrativeAnswer: '',
          },]
        }
      state.push(newSection);
    },


    deleteSection: (state, action) => {
      const { section_idx } = action.payload;
      return state.filter((item, idx) => idx !== (section_idx-1));

    },

    addQuestion: (state, action) => {
      const { sectionId, newQuestion } = action.payload;

      const section = state.find((item,idx) => idx === sectionId);
      section.questionList.push(newQuestion);
    },


    deleteQuestion: (state, action) => {
      const { sectionId, questionId } = action.payload;
      const section = state.find((item) => item.id === sectionId);
      section.questionList = section.questionList.filter((item) => item.id !== questionId);
      return state;
    },

    addOption: (state, action) => {
      const { sectionId, questionId } = action.payload;

      const section = state.find((item) => item.id === sectionId);
      const questionIdx = section.questionList.findIndex((item) => item.id === questionId);
      section.questionList[questionIdx].options.push(getNewOption(`옵션`));
    },

    deleteOption: (state, action) => {
      const { sectionId, questionId, optionId } = action.payload;
      const section = state.find((item) => item.id === sectionId);
      const questionIdx = section.questionList.findIndex((item) => item.id === questionId);
      section.questionList[questionIdx].options = section.questionList[questionIdx].options.filter((item) => item.id !== optionId);
      return state;
    },

    addOptionByBot: (state, action) => {
      const { sectionId, questionId,content } = action.payload;

      const section = state.find((item) => item.id === sectionId);
      const questionIdx = section.questionList.findIndex((item) => item.id === questionId);
      section.questionList[questionIdx].options.push(getNewOption(content));
            
    },
    addAllOptionByBot: (state, action) => {
      const { sectionId, questionId,content } = action.payload;

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

      const questionIdx = section.questionList.findIndex((item) => item.id === String(questionId));
      const optionIdx = section.questionList[questionIdx].options.findIndex((item) => item.id === optionId);
      section.questionList[questionIdx].options[optionIdx].option = optionContent;
    },

    setNextSection: (state, action) => {
      const { section_idx,nextSectionId} = action.payload;
      const section = state.find((item,idx) => idx === section_idx);
      section.nextSectionId = nextSectionId;
    },
    setOptionNextSection: (state, action) => {
      const { sectionId,optionId, questionId,nextSectionId} = action.payload;
      const section = state.find((item) => item.id === sectionId);
      const questionIdx = section.questionList.findIndex((item) => item.id === String(questionId));
      const optionIdx = section.questionList[questionIdx].options.findIndex((item) => item.id === optionId);
      section.questionList[questionIdx].options[optionIdx].nextSectionId = nextSectionId;
    },

    setOptionImage: (state, action) => {
      const { sectionId,optionId, questionId,image} = action.payload;
      const section = state.find((item) => item.id === sectionId);
      const questionIdx = section.questionList.findIndex((item) => item.id === String(questionId));
      const optionIdx = section.questionList[questionIdx].options.findIndex((item) => item.id === optionId);
      section.questionList[questionIdx].options[optionIdx].image = image;
    },
    getOptionImage: (state, action) => {
      const { sectionId,optionId, questionId} = action.payload;
      alert(JSON.stringify(action.payload))
      const section = state.find((item) => item.id === sectionId);
      const questionIdx = section.questionList.findIndex((item) => item.id === String(questionId));
      const optionIdx = section.questionList[questionIdx].options.findIndex((item) => item.id === optionId);
      // section.questionList[questionIdx].options[optionIdx].image;
      
    },

    // setNarrativeAnswer: (state, action) => {
    //   const { id, narrativeContent } = action.payload;
    //   const questionId = state.findIndex((item) => item.id === String(id));
    //   state[questionId].narrativeAnswer = narrativeContent;
    // },

    // markOneAnswer: (state, action) => {
    //   const { id, optionId, isAnswer } = action.payload;
    //   const question = state.find((item) => item.id === id);
    //   if (!question) return;
    //   question.answers.length > 0 && question.answers.splice(-1, 1); // 한개만 저장하기 위함
    //   if (!isAnswer) {
    //     console.log(action.payload);
    //     question.answers.push(optionId);
    //   }
    // },

    // markMultipleAnswer: (state, action) => {
    //   const { id, optionId, isAnswer } = action.payload;
    //   const question = state.find((item) => item.id === id);
    //   if (!question) return;
    //   const answerIdx = question.answers.findIndex((item) => item === optionId);

    //   if (!isAnswer) {
    //     question.answers.push(optionId);
    //   } else {
    //     if (answerIdx === 0) question.answers.shift();
    //     else question.answers.splice(answerIdx, 1);
    //   }
    // },

    // resetAnswer: (state) => {
    //   state.map((item) => {
    //     item.answers = [];
    //     item.narrativeAnswer = '';
    //   });
    // },

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
   
  },
});

export { questionActions };
export default questionReducer;
