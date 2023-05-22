import { useDispatch,useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { questionActions } from '../../../../slices';
import { Wrapper } from './style';
import {useEffect, useRef, useState} from "react";


export default function ResultNarrativeQuestion({ type, questionId, sectionId, selectedQuestion }) {

    const location = useLocation();
    const dispatch = useDispatch();
    const { questions } = useSelector((state) => state.form);
    const [inputValue, setInputValue] = useState("");
    const handleBlur = () => {
        dispatch(questionActions.setNarrativeAnswer({ sectionId: sectionId, questionId: questionId, narrativeContent: inputValue }));
    };
    useEffect(() => {
        if(inputValue !== selectedQuestion.narrativeAnswer) {
            setInputValue(selectedQuestion.narrativeAnswer);
        }
    }, [])

    return (
        <Wrapper type={type}>
                <textarea
                    type="text"
                    placeholder={'내 답변'}
                    value={inputValue}
                    onChange={(e) => {setInputValue(e.target.value)}}
                    onBlur={handleBlur}
                    disabled={false}
                />
        </Wrapper>
    );
};
