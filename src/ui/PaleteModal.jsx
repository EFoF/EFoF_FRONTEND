import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { ChromePicker } from 'react-color';

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
  margin-top: 2rem;
`;

const Button = styled.button`
  background-color: ${({ background }) => background};
  color: white;
  font-size: 1rem;
  padding: 0.5rem 1rem;
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
  top: 40px;
  left: 0;
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
  border: none;
  cursor: pointer;
  &:hover {
    filter: brightness(90%);
  }
`;


const PaletteModal = ({ message, onConfirm, onCancel, form, dispatch, formActions }) => {
  const [displayFontPicker, setDisplayFontPicker] = useState(false);
  const [displayBgPicker, setDisplayBgPicker] = useState(false);
  const [displayBtPicker, setDisplayBtPicker] = useState(false);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onCancel();
    }
  };

  const handleTextColorChange = (color) => {
    // alert(color.hex)
    dispatch(
      formActions.changefontColor({
        fontColor: color.hex,
      })
    );
  };

  const handleBackgroundColorChange = (color) => {
    dispatch(
      formActions.changebgColor({
        bgColor: color.hex,
      })
    );
  };

  const handleButtonColorChange = (color) => {
    dispatch(
      formActions.changebtColor({
        btColor: color.hex,
      })
    );
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
          <Color color={form.fontColor} onClick={handleFontPickerClick} />
          {displayFontPicker && (
            // <ColorPickerWrapper>
              <ChromePicker
                color={form.fontColor}
                onChange={handleTextColorChange}
              />
            // </ColorPickerWrapper>
          )}
        </ColorInputWrapper>
       

        <ButtonWrapper>
          
          <Button background="#AAAAAA" onClick={onCancel}>
            취소
          </Button>
          <Button background="#FF0000" onClick={onConfirm}>
            적용하기
          </Button>
        </ButtonWrapper>

      </Modal>
    </Overlay>

  );
};

export default PaletteModal;
