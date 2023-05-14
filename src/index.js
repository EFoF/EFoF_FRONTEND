import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { Provider } from 'react-redux';
import { store } from './store/configureStore';
import { injectStore } from "./api";
import StyledContainer from './ui/Toast/container'
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";

// persist redux를 여기서 정의하겠다.
const persistor = persistStore(store);
// 비컴포넌트에서 dispatch 등과 같은 함수로 리덕스의 상태를 변경하기 위해서 store를 주입해준다.
injectStore(store);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={theme}>
                <React.StrictMode>
                    <App />
                        <StyledContainer
                            position="top-center"
                            closeButton={false}
                            limit={1} />
                </React.StrictMode>
            </ThemeProvider>
        </PersistGate>
    </Provider>,
    // <Provider store={store}>
    //         <ThemeProvider theme={theme}>
    //             <React.StrictMode>
    //                 <App />
    //                 <StyledContainer
    //                     position="top-center"
    //                     closeButton={false}
    //                     limit={1} />
    //             </React.StrictMode>
    //         </ThemeProvider>
    // </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
