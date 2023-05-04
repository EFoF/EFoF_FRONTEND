import { Wrapper, InputWrapper, TitleInput, DetailInput, SettingButton } from './style';
import { useLocation } from 'react-router-dom';
import { OptionButton } from '../Question/OptionalQuestion/style';
import styled from 'styled-components';
import { OptionsWrapper } from '../Question/OptionalQuestion/style';
import { useDispatch, useSelector } from 'react-redux';
import { MdAdd, MdClose, MdPhoto, MdSettings } from 'react-icons/md';
import { FaCheck, FaPalette } from 'react-icons/fa';
import { formActions } from '../../slices';
import { useState } from 'react';
import ReactDOM from "react-dom";
import ConfirmModal from '../../ui/ConfirmModal';
import axios from 'axios';
import toastMsg from '../../ui/Toast/index';
const TitleBox = ({ info, handleDetail, handleTitle }) => {
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
  alert(JSON.stringify(form))
  alert(JSON.stringify(questions))
  // setImgModalOpen(!imgModalOpen);
};

  const handleDeleteImage = () => {
    
    const handleConfirm = () => {
      dispatch(formActions.changeImage(
        {image:''}
      ));
      ReactDOM.unmountComponentAtNode(document.getElementById("modal-root"));
    };

    const handleCancel = () => {
      // 취소 버튼 클릭 시 처리할 코드 작성
      ReactDOM.unmountComponentAtNode(document.getElementById("modal-root"));
    };
    const confirmModal = <ConfirmModal message={"이미지를 삭제하시겠습니까?"} onConfirm={handleConfirm} onCancel={handleCancel} />;
    ReactDOM.render(confirmModal, document.getElementById("modal-root"));
  };

  

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    const formData = new FormData();
    formData.append('image', selectedFile);

    axios.post('http://localhost:8080/form/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      alert(JSON.stringify(response.data));
      toastMsg("이미지 변경 성공", true);
      dispatch(formActions.changeImage(
        {image:response.data}
      ));
      
    }).catch(error => {
      toastMsg(error.response, false);
    
    });

    
   
  }

  return (
    <Wrapper>
      <InputWrapper color="white">

        <TitleInput
          placeholder="제목 없는 설문지"
          value={info.title}
          onChange={({ target: { value } }) => handleTitle(value)}
        />

        <DetailInput
          placeholder="설문지 설명"
          name="detail"
          value={info.detail}
          onChange={({ target: { value } }) => handleDetail(value)}
        />
      </InputWrapper>

      <OptionsWrapper gap="1rem">
        <OptionButton size={"1.5rem"} onClick={() => form.image !== '' ? handleDeleteImage() : inputRef.click()}>
          <MdPhoto />
          {form.image !== '' ? <CheckIcon /> : <AddIcon />}
        </OptionButton>
        
          <ImgInput
            onClick={(e) => e.target.value = null}
            ref={refParam => inputRef = refParam}
            type="file"
            id="chooseFile"
            name="chooseFile"
            accept="image/*"
            onChange={handleFileUpload}
          />
        

        <SettingButton size="1.5rem" onClick={handleClose}>
          <FaPalette />
        </SettingButton >
      </OptionsWrapper>
    </Wrapper>
  );
};

export default TitleBox;



const ImgInput = styled.input`
  /* visibility: hidden; */
  display: none;
`;
