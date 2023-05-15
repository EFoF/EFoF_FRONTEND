import checkSurveyStat from "../api/statistics";
import { useState } from "react";
import useInput from "./useInput";

export default function useStatistics() {
    // const [surveyId, setSurveyId] = useState('');
    const [surveyId, onChangeSurveyId] = useInput('');
    const [title, setTitle] = useState('');

    // const handleSurveyIdChange = (e) => {
    //     setSurveyId(e.target.value);
    // };

    const isExistedSurvey = async (surveyId) => {
        try {
        const response = await checkSurveyStat(surveyId); // 이메일 중복 확인 API 호출
        console.log(response);
        return response // 중복 여부를 반환하는 프로퍼티(exists)가 있는 응답 객체를 가정함
        } catch (error) {
        console.error(error);
        }
    };

    return {
        isExistedSurvey,
        // handleSurveyIdChange,
        onChangeSurveyId,
        surveyId,
    };
    // return isExistedSurvey;
}