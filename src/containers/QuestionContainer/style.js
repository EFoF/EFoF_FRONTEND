import styled from 'styled-components';
import { theme } from '../../styles/theme';



export const Wrapper = styled.div`
  background: ${theme.color.white};
  border-radius: 10px;
  margin-top: 0.5rem;
  padding: 0.25rem 0.5rem;
  // height: auto !important;
  border: 3px solid ${theme.color.gray};
  
  overflow:visible;
  .handler {
    ${({ theme }) => theme.flexCenter}    
    /* padding-up : 15px; */
    
    
    /* padding-bottom : 15px; */
    .drag-icon {
      width: 3rem;    
    }
  }

  input {
    border: none;
    
    border: 0;
    outline: 0;    
  }

  .question {    
    display: flex;
    flex-direction : column;
    align-items: left;
    justify-content: space-between;
    position: relative;
  }

  .collapse {
    display: block;
    position: relative;
    max-height: ${({ isCollapsed }) => isCollapsed ? "0" : "1000px"};
    overflow: ${({ isCollapsed }) => isCollapsed ? "hidden" : "visible"};
    transition: all 0.3s ease-in-out; // 변경된 부분
  }

  .collapse-button {
    position: absolute;
    top: 50%;
    right: 0.3rem;
    transform: translateY(-50%);
    border: none;
    background: none;
    cursor: pointer;
  }
  
  .collapse-icon {
    width: 20px;
    transition: transform 0.3s ease-in-out;
  }
  
  .collapse-icon.collapsed {
    transform: rotate(-180deg);
  }

  .question-input {
    background: ${theme.color.gray};
    width:90%;
    padding: 10px;
    font-size: 16px;
    border-bottom: 1px solid ${theme.color.border_gray2};

    &:focus {
      transition: 0.1s ease;
      border-bottom: 2px solid ${({ theme }) => theme.color.purple};
    }

    &::placeholder {
      color: ${theme.color.border_gray2};
    }
  }

  hr {
    margin-top: 20px;
    border: 1px solid ${theme.color.border_gray};
  }

  .settings {    
    display: flex;
    align-items: center;
    justify-content: flex-end;

    
   
    
  }
`;
