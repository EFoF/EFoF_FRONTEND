import styled from 'styled-components';
import { useDispatch,useSelector } from 'react-redux';
import { questionActions } from '../../slices';
import shortid from 'shortid';
import RoundButton from '../../ui/RoundButton';
import { createQuestion } from '../../api/survey';

const newQuestion = (newId) => ({
  id: newId,
  type: 0,
  questionContent: '',
  isNecessary: false,
  options: [
 
  ],
  answers: [],
  narrativeAnswer: '',
});

const SideMenu = ({ sectionId }) => {
  const dispatch = useDispatch();
  const { form, questions } = useSelector((state) => state.form);

  const addQuestionRedux = (sectionId,newQuestion) =>{
    
    dispatch(questionActions.addQuestion({ "sectionId": sectionId, "newQuestion": newQuestion}));
  }
  const handleAddQuestion = () => {
    
    const data  = { 
      "type" : 0,
      "questionContent" : "",
      "isNecessary" : false
    }
    if(form.isPre){
      createQuestion(form.id,sectionId,data,addQuestionRedux);
    }else{
      const newId = shortid();
      const question = newQuestion(newId);
      addQuestionRedux(sectionId,question)
    }
  };

  const Wrapper = styled.div`
  
  display:flex;
  align-items: center;
  justify-content: center;
  padding:0.5rem;
`;
  return (

    <Wrapper>
      <RoundButton event={handleAddQuestion} />
    </Wrapper>
  );
};

export default SideMenu;
