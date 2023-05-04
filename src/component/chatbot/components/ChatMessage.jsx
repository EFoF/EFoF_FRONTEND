import styled from "styled-components";


const ChatMessageContainer = styled.div`
  max-width: 75%;
  width: fit-content;
  display: flex;
  justify-content: center;
  background-color: ${(props) => (props.isBot ? "#f2f2f2" : "#5c82ff")};
  border-radius: ${(props) =>
    props.isBot ? "27px 27px 27px 3px" : "27px 27px 3px 27px"};
  margin-left: 0.4rem;
  color: ${(props) => (props.isBot ? "#3d4f6e" : "#ffffff")};
  padding: ${(props) => (props.isBot ? "0.8rem 1.2rem" : "0.7rem 1.1rem")};
  font-weight: ${(props) => (props.isBot ? "600" : "400")};
  font-size: 0.97rem;
  line-height: 1.3rem;
  word-break: keep-all;
`;

function ChatMessage(props) {
    
  return <ChatMessageContainer isBot={props.bot}>{props.message}</ChatMessageContainer>;}


export default ChatMessage;