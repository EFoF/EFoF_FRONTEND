import { useDispatch,useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { questionActions } from '../../../slices';
import { Wrapper } from './style';


export default function NarrativeQuestion({ type, questionId }) {

  const location = useLocation();
  const dispatch = useDispatch();
  const isPreview = location.pathname === '/preview';
  const isResult = location.pathname === '/result';
  const { questions } = useSelector((state) => state.form);
  const question = questions?.find((item) => item.id === questionId);

  const handleChange = (e) => {
    dispatch(questionActions.setNarrativeAnswer({ id: questionId, narrativeContent: e.target.value }));
  };

  return (
    <Wrapper type={type}>
      {!isPreview && !isResult ? (
        <textarea type="text" disabled placeholder={'주관식 텍스트'} />
      ) : (
        <textarea
          type="text"
          placeholder={isPreview ? '내 답변' : ''}
          value={question?.narrativeAnswer}
          onChange={handleChange}
          disabled={isResult ? true : false}
        />
      )}
    </Wrapper>
  );
};
