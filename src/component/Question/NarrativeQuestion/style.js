import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 20px;

  textarea {
    border: none;    
    line-height: 24px;
    padding : 10px;
    padding-left : 20px;
    padding-bottom : 100px;
    resize: none;
    width: ${({ type }) => (100)}%;
    height: ${({ type }) => (100)}%;
    background: ${({ theme }) => theme.color.gray};
    
  }


`;
