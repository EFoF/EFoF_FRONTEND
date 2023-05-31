import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { ChromePicker } from 'react-color';
import ReactDOM from "react-dom";
import { updateSurveyColor } from "../api/survey";
const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const Modal = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  /* margin-top: 2rem; */
  margin: 1rem;
  margin-bottom: 0;
`;

const Button = styled.button`
  background-color: ${({ background }) => background};
  color: white;
  font-size: 1rem;
  padding: 0.5rem 0.5rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  &:hover {
    filter: brightness(90%);
  }
`;

const ColorWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 2rem;
`;



const ColorInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  position: relative;
`;

const ColorPickerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 7rem;
  z-index: 1;
`;


const ColorLabel = styled.label`
  font-size: 1rem;
  margin-right: 1rem;
`;

const ColorInput = styled.input`
  width: 50px;
  height: 30px;
  margin-right: 1rem;
  background-color: ${({ color }) => color};
  cursor: pointer;
`;

// const ColorPicker = styled(ChromePicker)`
//   position: absolute;
//   z-index: 999;
// `;

const Color = styled.div`
  background-color: ${({ color }) => color};
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: 1px border black;
  cursor: pointer;
  &:hover {
    filter: brightness(90%);
  }
`;


const PaletteModal = ({ message, onCancel, form, dispatch, formActions }) => {
  const [displayFontPicker, setDisplayFontPicker] = useState(false);
  const [displayBgPicker, setDisplayBgPicker] = useState(false);
  const [displayBtPicker, setDisplayBtPicker] = useState(false);

  const [fontColor,setFontColor] = useState(form.fontColor);
  const [bgColor,setBgColor] = useState(form.bgColor);
  const [btColor,setBtColor] = useState(form.btColor);

  const onConfirm = () => {
    const data = {
      "fontColor" : fontColor,
      "bgColor" : bgColor,
      "btColor" : btColor
    }
    if(form.isPre){
      updateSurveyColor(form.id,data)
    }
    dispatch(
      formActions.changefontColor({
        fontColor: fontColor,
      })
    );

    dispatch(
      formActions.changebgColor({
        bgColor: bgColor,
      })
    );
    dispatch(
      formActions.changebtColor({
        btColor: btColor,
      })
    );
    ReactDOM.unmountComponentAtNode(document.getElementById("modal-root"));
  };


  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onCancel();
    }
  };

  const handleTextColorChange = (color) => {
    // alert(color.hex)
    setFontColor(color);
    
  };

  const handleBackgroundColorChange = (color) => {
    setBgColor(color);
  
  };

  const handleButtonColorChange = (color) => {
    setBtColor(color);
   
  };

  const handleFontPickerClick = () => {
    setDisplayFontPicker(!displayFontPicker);
  };

  const handleBgPickerClick = () => {
    setDisplayBgPicker(!displayBgPicker);
  };

  const handleBtPickerClick = () => {
    setDisplayBtPicker(!displayBtPicker);
  };

  return (
    <Overlay>
      <Modal>
        <ColorInputWrapper>
          <ColorLabel>글자 색상</ColorLabel>
          <Color color={fontColor} onClick={handleFontPickerClick} />
          {displayFontPicker && (
            <ColorPickerWrapper>
              <ChromePicker
                color={fontColor}
                onChange={color => handleTextColorChange(color.hex)}

              />
             </ColorPickerWrapper>
          )}
        </ColorInputWrapper>
        
        <ColorInputWrapper>
          <ColorLabel>배경 색상</ColorLabel>
          <Color color={bgColor} onClick={handleBgPickerClick} />
          {displayBgPicker && (
            <ColorPickerWrapper>
              <ChromePicker
                color={bgColor}
                onChange={color => handleBackgroundColorChange(color.hex)}

              />
             </ColorPickerWrapper>
          )}
        </ColorInputWrapper>
        <ColorInputWrapper>
          <ColorLabel>버튼 색상</ColorLabel>
          <Color color={btColor} onClick={handleBtPickerClick} />
          {displayBtPicker && (
            <ColorPickerWrapper>
              <ChromePicker
                color={btColor}
                onChange={color => handleButtonColorChange(color.hex)}

              />
             </ColorPickerWrapper>
          )}
        </ColorInputWrapper>

        <ButtonWrapper>
          
          <Button background="#AAAAAA" onClick={onCancel}>
            취소
          </Button>
          <Button background="#5858FA" onClick={onConfirm}>
            적용하기
          </Button>
        </ButtonWrapper>

      </Modal>
    </Overlay>

  );
};

export default PaletteModal;
