
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
  // float: left;
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
    ${({ isImmutable }) => ({ isImmutable } ? '' : 'filter: brightness(90%);')}
  }
`;

export const ResultOptionButtonImg = styled.div`
  width: ${({ size }) => size}rem;
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
    ${({ isImmutable }) => ({ isImmutable } ? '' : 'filter: brightness(90%);')}
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



// export const Logo = styled.img`
//   ${({ size }) => `
//     width: ${size}rem;
//     height: ${size}rem;
//   `}
//   margin-right: 1rem;
//   object-fit: cover;
//   border-radius: 10rem;
//   cursor: pointer;
//   transition: background-color 0.2s, opacity 0.2s;
//
//   &:hover {
//       filter: brightness(80%);
//     }
//
//   ${({ isMarked, filterResult}) =>
//       isMarked ? `
//     filter: brightness(90%);
//     opacity: 0.8;
//   ` : ''}
// `;


export const Logo = styled.img`
  ${({ size }) => `
    width: ${size}rem;
    height: ${size}rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 그림자 효과 추가 */
  `}
  // margin-right: 1rem;
  object-fit: cover;
  cursor: pointer;
  transition: background-color 0.2s, opacity 0.2s;
  
  &:hover {
    filter: brightness(80%);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3); /* 호버 시 그림자 효과 변경 */
  }

  ${({ isMarked }) =>
    isMarked ? `
    filter: brightness(90%);
    opacity: 0.8;
  ` : ''}
`;
