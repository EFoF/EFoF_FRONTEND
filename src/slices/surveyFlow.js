import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import shortid from "shortid";
const initialState = {
    currentIndex : 0,
    indexes: [{
        prevIndex: -1,
        nextIndex: -1,
    }],
};


const pushToIndexes = () => ({
    prevIndex : -1,
    nextIndex : -1,
});

const {actions: surveyFlowActions, reducer: surveyFlowReducer } = createSlice({
    name: "surveyFlow",
    initialState,
    reducers: {
        setCurrentIndex : (state, action) => {
            state.currentIndex = action.payload;
            // setHeader(state.tokenIssueDTO.accessToken, state.loginType);
        },
        setNextIndex : (state, action) => {
            const { pageIndex, value} = action.payload;
            // console.log(action.payload);
            // state.nextIndex = action.payload;
            console.log(pageIndex)
            state.indexes[pageIndex].nextIndex = value;
        },
        setPrevIndex : (state, action) => {
            const { pageIndex, value} = action.payload;
            state.indexes[pageIndex].prevIndex = value;
        },
        setBoth: (state, action) => {
            const { currentPageIndex, currentPageNextIndex } = action.payload;
            // 1. 현재 페이지의 next 인덱스를 인자값으로 변경
            // 2. 다음 페이지의 prev 인덱스를 인자값으로 변경 (안해주면 undefined 에러 발생)
            state.indexes[currentPageIndex].nextIndex = currentPageNextIndex;
            if(currentPageNextIndex !== -1) {
                state.indexes[currentPageNextIndex].prevIndex = currentPageIndex;
            }
        },
        addIndexes : (state, action) => {
            state.indexes.push(pushToIndexes());
        },
        clearDeletedSectionReference: (state, action) => {
            const { section_idx } = action.payload;
            // 현재 섹션이 가리키고 있던 다음 섹션의 index이다.
            const nextSectionIndex = state.indexes[section_idx - 1].nextIndex;
            // 다음 섹션의 prevIndex는 원래 본인(삭제될 예정인 섹션)인데, 본인은 삭제될 것이니 prevIndex를 0으로 바꿔준다.
            state.indexes[nextSectionIndex].prevIndex = 0;
        },
        clearIndexes: (state, action) => {
            const { pageIndex } = action.payload;
            // 삭제할 옵션을 제외하고 배열을 다시 만들어서 반환.
            state.indexes = state.indexes.filter((_, idx) => idx !== pageIndex);
        },
    },
});

export {surveyFlowActions}

export default surveyFlowReducer;