import styled from 'styled-components';


export const TitleInput = styled.input`
  
  border: none;
  font-size: 2rem;
  /* width: 60%; */
  &::placeholder {
  color: ${({ theme }) => theme.color.black};
  }
  margin-bottom:1rem;
  
  &:hover {
    border:0;
    outline: 0;
    background: transparent;
    border-bottom: 1px solid ${({ theme }) => theme.color.border_gray};
  }

  &:focus {
    border:0;
    outline: 0;
    background: transparent;
    transition: 0.1s ease;
    border-bottom: 2px solid ${({ theme }) => theme.color.purple};
  }
`;

export const DetailInput = styled.input`

    
    border: none;
    
  /* width: 60%; */
  font-size: 1rem;
    &:hover {
      border: 0;
      outline: 0;
      background: transparent;
      border-bottom: 1px solid ${({ theme }) => theme.color.border_gray};
    }
  
    &:focus {
    border:0;
    outline: 0;
      background: transparent;
      transition: 0.1s ease;
      border-bottom: 2px solid ${({ theme }) => theme.color.purple};
    }
`;

export const InputWrapper = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
 
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
