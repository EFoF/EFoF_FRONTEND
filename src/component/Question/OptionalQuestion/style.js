
import styled from 'styled-components';





export const Wrapper = styled.div`
  display: flex;
  /* height: 2rem; */
  margin-top: 0.5rem;
  justify-content: space-between;
  margin-left: 0.3rem;
  /* .dropdown-option {
    ${({ theme }) => theme.flexCenter}
    font-size: 14px;
    width: 42px;
    height: 42px;
  } */
`;

export const Input = styled.input`
  color: ${({ isLast, theme }) => (isLast ? theme.color.border_gray2 : theme.color.black)};
  font-size: 0.9rem;
  width: 10rem;
  border: none;
  ${({ type }) => type === 4 && "pointer-events: none;"}


  &:hover {
    border: 0;
    outline: 0;
    background: transparent;
    border-bottom: 1px solid ${({ theme }) => theme.color.border_gray};
  }

  &:focus {
      border: 0;
      outline: 0;
    background: transparent;
    transition: 0.1s ease;
    border-bottom: 2px solid ${({ theme }) => theme.color.purple};
  }
`;

export const OptionButton = styled.div`

  font-size: ${({ size }) => size};
  color: ${({ theme }) => theme.color.black};
  background-color:${({ theme }) => theme.color.border_gray};
  display: ${({ isLast }) => (isLast ? 'none' : 'flex')};
  align-self: center;
  /* height:${({ size }) => size * 2}; */
  flex-direction: row;
  padding: 0.3rem;
  border: none;
  cursor: pointer;
  border-radius: 5px; /* 끝부분 둥글게 만들기 */
  transition: background-color 0.2s color 0.2s; /* 배경색이 바뀔 때 부드럽게 변경되도록 transition 설정 */

  &:hover{ 
    filter: brightness(90%);

  }
`;

export const InputButtonWrapper = styled.button`

  display: flex;
  flex-direction: row;
  background: transparent;
  border: none;
  gap: 0.5rem;
`;

export const OptionsWrapper = styled.div`
  /* position: relative; */
  display: ${({ isLast }) => (isLast ? 'none' : 'flex')};
  
  align-items: center;
  align-self: center;
  gap: ${({ gap }) => gap};
  /* width: 15%; */
  /* margin-left:12px; */
`;

export const CloseOptionButton = styled.button`
  display: ${({ type }) => (type === 4 ? 'none' : '')};
  font-size: ${({ size }) => size};
  color: ${({ theme }) => theme.color.black};
  background: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.color.red};
  }
`;


export const ImgInput = styled.input`
  /* visibility: hidden; */
  display: none;
`;
