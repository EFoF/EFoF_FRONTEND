import styled from "styled-components";
import { MdCancel } from "react-icons/md";


const HeaderContainer = styled.div`
  background: rgb(255, 204, 92);
  background: linear-gradient(
    90deg,
    rgba(255, 204, 92, 1) 0%,
    rgba(255, 156, 92, 1) 100%
  );
  width: 100%;
  display: flex;
  justify-content: right;
  align-items: center;
  cursor: grab;
`;

const CloseLine = styled(MdCancel)`
  cursor: pointer;
  display: flex;
  align-self: flex-end;
  font-size: 3.0rem;
  color: white;
  padding: 0.7rem;
  transition: color 0.3s ease;

  &:hover {
    color: red;
  }
`;

function Header(props) {
  
  const handleClose = () => {
    // alert(JSON.stringify(props.onClick));
    // alert("Close button clicked");
    // Add your code to handle the event here
  };

  return (
    <HeaderContainer>
      <CloseLine onClick={props.onClick} />
    </HeaderContainer>
  );
}

export default Header;
