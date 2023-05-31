import { Wrapper, InputWrapper, TitleInput, DetailInput } from './style';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import {SurveyImg} from "../../index";

const ResultTitleBox = ({ info, readOnly }) => {
    const { form } = useSelector((state) => state.form);

    return (
        <>
            {(form.image === undefined) || (form.image === "") || (form.image === null) ? (<></>) : (<SurveyImg formImg={process.env.REACT_APP_S3_URL + form.image}/>)}
        <Wrapper>
            <InputWrapper color="white">
                <TitleInput
                    placeholder="제목 없는 설문지"
                    value={info.title}
                    readOnly={readOnly}
                    fontColor={form.fontColor}
                    bgColor={form.bgColor}
                />

                <DetailInput
                    placeholder="설문지 설명"
                    name="detail"
                    value={info.detail}
                    fontColor={form.fontColor}
                    bgColor={form.bgColor}
                    readOnly={readOnly}
                />
            </InputWrapper>
        </Wrapper>
        </>
    );
};

export default ResultTitleBox;
