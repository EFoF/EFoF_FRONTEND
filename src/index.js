import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { Provider } from 'react-redux';
import { store } from './store/configureStore';
import StyledContainer from './ui/Toast/container'

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <React.StrictMode>
                <App />
                <StyledContainer
        position="top-center"
        closeButton={false}
        limit={1} />
            </React.StrictMode>
        </ThemeProvider>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
