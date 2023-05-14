import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";
const initialState = {
    loginLastDTO : {},
    // loadAuthorizationLoading: false,
    // loadAuthorizationDone: false,
    // loadAuthorizationError: false,

};

// 여기서는 state를 action에 기반해서 변경해주는 로직만 생각한다.
// 즉 토큰을 persist redux에 저장만 해주면 되고, 토큰을 받아오는 부분은 여기서 생각할 필요 없다.
const {actions: authorizationActions, reducer: authorizationReducer } = createSlice({
    name: "authorization",
    initialState,
    reducers: {
        setLoginDTO : (state, action) => {
            state.loginLastDTO = Object.assign(state.loginLastDTO, action.payload);
            // setHeader(state.tokenIssueDTO.accessToken, state.loginType);
        },
        clearLoginDTO: (state, action) => {
            state.loginLastDTO = {};
        },
    },
});

export {authorizationActions}

export default authorizationReducer;