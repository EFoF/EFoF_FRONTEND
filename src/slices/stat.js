import { createSlice, combineReducers } from '@reduxjs/toolkit';
import { checkStatistic } from '../api/statistics';

// const initialState = {
//     id:'',
//     title: '',
//     detail: '',
//     image: '',
//     fontColor: '#992999',
//     bgColor: '#FFFFFF',
//     btColor: '#000000',
//     isPre : false
// };

// const { actions: statActions, reducer: statReducer } = createSlice({
//     name: 'stat', 
//     initialState, 
//     reducers: {
//         initStat: (state, action) => {
//             const { data } = action.payload;
//             state.id = data.id;
//             state.title = data.title;
//             state.detail = data.description;
//             state.image = data.simageURL;
//             state.fontColor = data.fontColor;
//             state.bgColor = data.bgColor;
//             state.btColor = data.btColor;
//             state.isPre = true;
//         }
//     }
// });

// export { statActions };
// export default combineReducers({
//     form: statReducer, 
// });

const initialState = {
    id:'',
    title: '',
    detail: '',
    image: '',
    fontColor: '#992999',
    bgColor: '#FFFFFF',
    btColor: '#000000',
    isPre : false
  };

const { actions: statActions, reducer: statReducer } = createSlice({
    name: 'stat',
    initialState,
    reducers: {
      initStat:(state, action) => {
        const { data } = action.payload;

        alert(JSON.stringify(data));
        // 백엔드의 dto와 일치해야한다! (아래는 반환하는 내용)
        // private String title; //설문 제목
        // private String description; //설문 설명
        // private String sImageURL; //설문 이미지
        // private int participantNum; //참여자 수
        // private List<Long> SectionList; //설문의 리스트
        // private List<ConstraintDTO.SurveyForStatisticConstraintResponseDto> constraintList; //제약 조건 리스트
        state.id = data.id;
        state.title = data.title;
        state.detail = data.description;

      },
    }
});

export { statActions };
export default combineReducers({
  stat: statReducer,
});