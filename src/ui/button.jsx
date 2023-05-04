import styled, { css } from "styled-components";


function 
Button({ disabled,  children, event}) {

  return (
    <StyledButton
      disabled={disabled}

      onClick={event}
    >
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`

  margin-left: 10px;
  border: none;
  cursor: pointer;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 1rem;
  padding: 12px 16px;
  border-radius: 8px;
  color: #ffffff;
  background: #FFD662;

  &:active,
  &:hover,
  &:focus {
    background: #FAAC58;
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;

  }
`;

export default Button;
