import styled, {css} from 'styled-components';


// TitleInput, DetailInput 등에서 readOnly props에 따라 편집 여부를 결정하기 위해 선언한 함수이다.
// const readOnlyStyles = css`
//   &:focus {
//     border: 0;
//     outline: 0;
//     background: transparent;
//     transition: 0.1s ease;
//     border-bottom: 2px solid ${({ theme }) => theme.color.purple};
//   }
// `;

// ${props => !props.readOnly && readOnlyStyles}
export const TitleInput = styled.div`
  border: none;
  width: 75%;
  height: auto;
  font-size: 2rem;
  color: ${props => props.fontColor || 'black'};
  background-color: white;
  
  /* width: 60%; */
  &::placeholder {
  color: ${({ theme }) => theme.color.black};
  }
  margin-bottom:1rem;
`;

export const DetailInput = styled.div`
  border: none;
  width: 80%;
  color: ${props => props.fontColor || 'black'};
  background-color: white;
  /* width: 60%; */
  font-size: 1rem;
`;

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
 
`;
export const Wrapper = styled.div`
  border: 3px solid ${({ theme }) => theme.color.gray};
  background: white;
  /* position: relative; */
  padding:1rem;
  padding-left:3rem;
  border-radius: 10px;
  /* margin : '0 auto'; */
  display: flex;
  flex-direction: row; /* 가로 정렬을 위한 flex-direction 속성 추가 */
  justify-content: space-between; /* 가로 정렬을 위한 justify-content 속성 추가 */
 
`;

export const SettingButton = styled.button`
  background-color: transparent;
  display: flex;
  align-items: center;
  align-content: center;
  border: none;
  font-size: ${({ size }) => size || '1rem'};
  cursor: pointer;
  border-radius: 5px; /* 끝부분 둥글게 만들기 */
  transition: background-color 0.2s color 0.2s; /* 배경색이 바뀔 때 부드럽게 변경되도록 transition 설정 */

  &:hover{ 
    color: ${({ theme }) => theme.color.purple};

  }
`;
