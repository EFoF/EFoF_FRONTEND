import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styled from "styled-components";

function RoundButton({event}) {

  return (
    <StyledButton onClick={event}>
      <FontAwesomeIcon icon={faPlus} />
    </StyledButton>
  );
  
}

const StyledButton = styled.button`

border: 0.1rem solid #9090A0;
background-color: white;
color: #9090A0;
border-radius: 50%;

width: 3rem;
height: 3rem;
display: flex;
align-items: center;
justify-content: center;
font-size: 1.2rem;

 :hover{
  background-color: white;
  color: #464656;
  border: 0.1rem solid #464656;
 }
`;

export default RoundButton;
