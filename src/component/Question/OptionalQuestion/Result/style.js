
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
  
  // editable 관련 설정이다. 미리보기 화면에서는 이 컴포넌트가 수정이 되면 안되기 때문에 추가하였다.
  // 이거 될까? 
  pointer-events: none;
  user-select: none;
`;


export const ResultOptionButton = styled.div`
  width: 37vw;
  font-size: ${({ size }) => size};
  color: ${({ theme }) => theme.color.black};
  background-color: ${({ isActive, activeColor, theme }) =>
          isActive ? activeColor : theme.color.gray};
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

export const customOptionButton = styled.div`
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  background-color: #f5f5f5;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
  }

  &:active {
    background-color: ${({ activeColor }) => activeColor};
  }
`

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

// export const Logo = styled.img`
//   ${({ size }) => `
//     width: ${size}rem;
//     height: ${size}rem;
//
//   `}
//   margin-right: 1rem;
//   object-fit: cover;
//   border-radius: 10rem;
//   &:hover {
//     filter: brightness(90%);
//   }
// `;


export const Logo = styled.img`
  ${({ size }) => `
    width: ${size}rem;
    height: ${size}rem;
  `}
  margin-right: 1rem;
  object-fit: cover;
  border-radius: 10rem;
  cursor: pointer;
  transition: background-color 0.2s, opacity 0.2s;
  
  &:hover {
      filter: brightness(80%);
    }

  ${({ isMarked, filterResult}) =>
      isMarked ? `
    filter: brightness(90%);
    opacity: 0.8;
  ` : ''}
`;

// export const CheckImage = styled.img`
//   position: absolute;
//   ${({ size }) => `
//     width: ${size}rem;
//     height: ${size}rem;
//   `}
//   top: 0;
//   left: 0;
//   opacity: ${({ isMarked }) => (isMarked ? '0.5' : '0')};
//   z-index: 2;
// `;