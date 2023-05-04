import Dropdown from '../../component/Dropdown/Dropdown';
import { NarrativeQuestion, OptionalQuestion } from '../../component/Question';
import { QUESTION_TYPES } from '../../component/constants/const';
import { useSelector } from 'react-redux';
import { Wrapper } from './style';


const PreviewContainer = ({ questionId }) => {
  const { questions } = useSelector((state) => state.form);
  const selectedQuestion = questions.find((item) => item.id === questionId);
  if (!selectedQuestion) return null;
  const { type: questionType, options, questionContent, isNecessary } = selectedQuestion;
  const isAnswer = (value) => selectedQuestion.answers.findIndex((item) => item === value) >= 0;

  const getOptionList = (type) => {
    const optionList = options?.map((option) => (
      <OptionalQuestion
        isAnswer={isAnswer(option.id)}
        key={option.id}
        questionId={questionId}
        optionId={option.id}
        type={type}
        optionContent={option.option}
        isLast={false}
      />
    ));
    return optionList;
  };

  const getInput = () => {
    switch (questionType) {
      case QUESTION_TYPES.ONE_CHOICE:
      case QUESTION_TYPES.MULTIPLE_CHOICE:
        return getOptionList(questionType);
      case QUESTION_TYPES.TRUE_FALSE:
        return <Dropdown questionId={questionId} menus={options} />;     
      case QUESTION_TYPES.LONG_ANSWER:
        return <NarrativeQuestion type="long" questionId={questionId} />;
      default:
        return;
    }
  };

  return (
    <Wrapper isNecessary={true}>
      <span className="title">{questionContent}</span>
      {isNecessary && <span className="title_necessary">*</span>}
      {getInput()}
    </Wrapper>
  );
};

export default PreviewContainer;