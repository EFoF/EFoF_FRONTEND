import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";
const initialState = {
    currentIndex : 0,
    nextIndex : 0,
    prevIndex : 0,
};
const {actions: surveyFlowActions, reducer: surveyFlowReducer } = createSlice({
    name: "surveyFlow",
    initialState,
    reducers: {
        setCurrentIndex : (state, action) => {
            state.currentIndex = action.payload;
            // setHeader(state.tokenIssueDTO.accessToken, state.loginType);
        },
        setNextIndex : (state, action) => {
            state.nextIndex = action.payload;
        },
        setPrevIndex : (state, action) => {
            state.prevIndex = action.payload;
        },
        clearIndexes: (state, action) => {
            state.currentIndex = 0;
            state.nextIndex = 0;
            state.prevIndex = 0;
        },
    },
});

export {surveyFlowActions}

export default surveyFlowReducer;