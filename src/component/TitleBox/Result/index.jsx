import { Wrapper, InputWrapper, TitleInput, DetailInput, SettingButton } from './style';
import { OptionButton } from '../../Question/OptionalQuestion/style';
import styled from 'styled-components';
import { OptionsWrapper } from '../../Question/OptionalQuestion/style';
import { useDispatch, useSelector } from 'react-redux';
import { MdAdd, MdClose, MdPhoto, MdSettings } from 'react-icons/md';
import { FaCheck, FaPalette } from 'react-icons/fa';
import { formActions } from '../../../slices';
import ReactDOM from "react-dom";
import ConfirmModal from '../../../ui/ConfirmModal';
import axios from 'axios';
import toastMsg from '../../../ui/Toast/index';
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
    const handleClose = () => {
        const handleConfirm = () => {
            alert(JSON.stringify(form));
            // ReactDOM.unmountComponentAtNode(document.getElementById("modal-root"));
        };

        const handleCancel = () => {
            // 취소 버튼 클릭 시 처리할 코드 작성
            ReactDOM.unmountComponentAtNode(document.getElementById("modal-root"));
        };
        const confirmModal = <PaleteModal message={"이미지를 삭제하시겠습니까?"} onConfirm={handleConfirm} onCancel={handleCancel} form={form} dispatch={dispatch} formActions={formActions}/>;
        ReactDOM.render(confirmModal, document.getElementById("modal-root"));
    };


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