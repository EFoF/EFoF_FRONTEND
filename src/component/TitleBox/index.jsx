import { Wrapper, InputWrapper, TitleInput, DetailInput, SettingButton } from './style';
import { OptionButton } from '../Question/OptionalQuestion/style';
import styled from 'styled-components';
import { OptionsWrapper } from '../Question/OptionalQuestion/style';
import { useDispatch, useSelector } from 'react-redux';
import { MdAdd, MdClose, MdPhoto, MdSettings } from 'react-icons/md';
import { FaCheck, FaPalette } from 'react-icons/fa';
import { formActions } from '../../slices';
import ReactDOM from "react-dom";
import ConfirmModal from '../../ui/ConfirmModal';
import PaleteModal from '../../ui/PaleteModal';
import { uploadImgInit,deleteImgInit,deleteSurveyImg ,updateSurveyImg} from '../../api/survey';
const TitleBox = ({ info, handleDetail, handleTitle,handleBlurTitle, handleBlurDetail}) => {
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

      // ReactDOM.unmountComponentAtNode(document.getElementById("modal-root"));
    };

  const handleCancel = () => {
    // 취소 버튼 클릭 시 처리할 코드 작성
    ReactDOM.unmountComponentAtNode(document.getElementById("modal-root"));
  };
  const confirmModal = <PaleteModal message={"이미지를 삭제하시겠습니까?"} onConfirm={handleConfirm} onCancel={handleCancel} form={form} dispatch={dispatch} formActions={formActions}/>;
  ReactDOM.render(confirmModal, document.getElementById("modal-root"));
};

const deleteImage = () => {

  dispatch(formActions.changeImage(
    { image: '' }
  ));
}
const handleDeleteImage = () => {

  const handleConfirm = () => {
    if(form.isPre){
      deleteSurveyImg(deleteImage,form.id)
    }else{
      deleteImgInit(form.image,deleteImage)
    }
    
    ReactDOM.unmountComponentAtNode(document.getElementById("modal-root"));
  };

  const handleCancel = () => {
    // 취소 버튼 클릭 시 처리할 코드 작성
    ReactDOM.unmountComponentAtNode(document.getElementById("modal-root"));
  };
  const confirmModal = <ConfirmModal message={"이미지를 삭제하시겠습니까?"} onConfirm={handleConfirm} onCancel={handleCancel} />;
  ReactDOM.render(confirmModal, document.getElementById("modal-root"));
};

const uploadImage = (response) =>{
  dispatch(formActions.changeImage(
    { image: response.data }
  ));
}

const handleFileUpload = (event) => {
  const selectedFile = event.target.files[0];
  const formData = new FormData();
  formData.append('image', selectedFile);

  if(form.isPre){
    updateSurveyImg(formData,uploadImage,form.id)
  }else{
    uploadImgInit(formData,uploadImage)
  }
  

}

return (
  <Wrapper>
    <InputWrapper color="white">

        <TitleInput
          placeholder="제목 없는 설문지"
          value={info.title}
          fontColor={form.fontColor}
          bgColor={form.bgColor}
          onChange={({ target: { value } }) => handleTitle(value)}
          onBlur={({ target: { value } }) => handleBlurTitle(value)}
        />

        <DetailInput
          placeholder="설문지 설명"
          name="detail"
          value={info.detail}
          fontColor={form.fontColor}
          bgColor={form.bgColor}
          onChange={({ target: { value } }) => handleDetail(value)}
          onBlur={({ target: { value } }) => handleBlurDetail(value)}
        />
      </InputWrapper>

      <OptionsWrapper gap="1rem">
        <OptionButton size={"1.5rem"} onClick={() => form.image ? handleDeleteImage() : inputRef.click()}>
          <MdPhoto />
          {form.image ? <CheckIcon /> : <AddIcon />}
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
