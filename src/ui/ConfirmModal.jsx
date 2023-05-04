import React from "react";
import styled from "styled-components";

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

const Message = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
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

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {
          onCancel();
        }
      };
  return (
    <Overlay onClick={handleBackdropClick}>
      <Modal>
        <Message>{message}</Message>
        <ButtonWrapper>
          <Button background="#FF0000" onClick={onConfirm}>
            확인
          </Button>
          <Button background="#AAAAAA" onClick={onCancel}>
            취소
          </Button>
        </ButtonWrapper>
      </Modal>
    </Overlay>
  );
};

export default ConfirmModal;
