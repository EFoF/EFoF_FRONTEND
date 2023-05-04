// in MessageParser.js
import React from 'react';
import axios from 'axios';
import { chatbotConst } from './components/chatbotConst';
const MessageParser = ({ children, actions ,setState}) => {
  const parse = (message) => {
    
    
    if(message.includes(chatbotConst[0])){
        
    }
    else if(message.includes(chatbotConst[1])){

    }
    else if(message.includes(chatbotConst[0])){

    }
    // getOption(message);
    
  };
  const getOption = (message) => {
    actions.handleLoading();

    return axios.post('http://localhost:8080/chatbot/option',
      {
        question: message,
      })
      .then(response => {
        
        actions.handleLoadingEnd();
        alert(response.data.content.answer);
        alert(response.data.content.type);
        return response.data;

      })
      .catch(error => {
        console.log(error);
      });

  }

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;