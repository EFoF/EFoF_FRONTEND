import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import {setHeader} from "../api";
const initialState = {
    tokenIssueDTO : {},
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
        setToken : (state, action) => {
            state.tokenIssueDTO = Object.assign(state.tokenIssueDTO, action.payload);
            axios.defaults.headers.common['Authorization'] = state.tokenIssueDTO.accessToken;
            setHeader(state.tokenIssueDTO.accessToken);
        },
    },
});

export {authorizationActions}

export default authorizationReducer;