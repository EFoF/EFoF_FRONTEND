import { createChatBotMessage } from 'react-chatbot-kit';
import ChatButton from './components/ChatButton';
import Header from './components/Header';
import ChatMessage from './components/ChatMessage';
import { chatbotConst } from './components/chatbotConst';
import OptionButton from './components/OptionButton';
import Loading from './components/Loading';
import QuestionButton from './components/QuestionButton';
const botName = '질문 생성봇';


const GetConfig = (onClick) => ({
    


        initialMessages: [createChatBotMessage(`안녕하세요 질문에 대한 응답들을 생성해주는 봇 입니다~!`),
        createChatBotMessage(`아래의 질문 중 선택해주세요.`, {
            widget: 'questionButton',
        })],
        state: {
            options: [],
            question: "",
            answer: {},
            isVisible: false,
            sectionId: "",
            questionId: "",
        },
        widgets: [
            {
                widgetName: 'chatButtons',
                widgetFunc: (props) => <ChatButton {...props} />,
                mapStateToProps: ["question", "answer"],

            },
            {
                widgetName: 'optionButtons',
                widgetFunc: (props) => <OptionButton {...props} />,
                mapStateToProps: ["options", "question"],
            },
            {
                widgetName: 'loading',
                widgetFunc: (props) => <Loading {...props} />,

            }, {
                widgetName: 'questionButton',
                widgetFunc: (props) => <QuestionButton {...props} />,

            },
        ],

        botName: botName,
        customStyles: {
            botMessageBox: {
                backgroundColor: '#376B7E',
            },


        },
        customComponents: {
            // Replaces the default header
            header: (props) => <Header {...props} onClick={onClick} />,
            // Replaces the default bot avatar
            botAvatar: (props) => <div {...props} />,
            // Replaces the default bot chat message container
            botChatMessage: (props) => <ChatMessage {...props} bot />,
            // Replaces the default user icon
            userAvatar: (props) => <div {...props} />,
            // Replaces the default user chat message
            userChatMessage: (props) => <ChatMessage {...props} />,
        },

    
});

export default GetConfig;