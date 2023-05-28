import { Wrapper, InputWrapper, TitleInput, DetailInput } from './style';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { MdAdd } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';
import { formActions } from '../../../slices';
import ReactDOM from "react-dom";
import PaleteModal from '../../../ui/PaleteModal';

const ResultTitleBox = ({ info, handleDetail, handleTitle, readOnly }) => {
    let inputRef;
    const { questions, form } = useSelector((state) => state.form);
    const dispatch = useDispatch();
    const CheckIcon = styled(FaCheck)`
  font-size: 1.3rem;
  align-self: center;
`;
    const AddIcon = styled(MdAdd)`
  font-size: 1.3rem;
  align-self: center;
`;


    return (
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
    );
};

export default ResultTitleBox;



const ImgInput = styled.input`
  /* visibility: hidden; */
  display: none;
`;