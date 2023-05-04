import { createSlice, combineReducers } from '@reduxjs/toolkit';
import { questionReducer } from '.';
import userReducer from './user';


const initialState = {
  title: '',
  detail: '',
  image: 'ㄴㅁㅇㅁ',
  fontColor: 'ㅅㄷㄴㅅ',
  bgColor: 'ㅅㄴㄷ',
  btColor: 'ㅅㄷㄴ',
};

const { actions: formActions, reducer: formReducer } = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addForm: (state, action) => {
      const { title, detail } = action.payload;
      state.title = title;
      state.detail = detail;
    },
    changeTitle: (state, action) => {
      const title = action.payload;
      state.title = title;

    },
    changeDetail: (state, action) => {
      const detail = action.payload;
      state.detail = detail;
    },
    changeImage: (state, action) => {
      const {image} = action.payload;
      
      state.image = image;
      // alert(state.image)
    },

  },
});

export { formActions };
export default combineReducers({
  form: formReducer,
  questions: questionReducer,
  user: userReducer
});
