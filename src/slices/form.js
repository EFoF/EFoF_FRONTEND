import { createSlice, combineReducers } from '@reduxjs/toolkit';
import { questionReducer } from '.';
import authorizationReducer from './authorization';
import userReducer from './user';


const initialState = {
  title: '',
  detail: '',
  image: '',
  fontColor: '#111111',
  bgColor: '#000000',
  btColor: '#000000',
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
    changefontColor: (state, action) => {
      const {fontColor} = action.payload;
      // alert(fontColor)
      state.fontColor = fontColor;
      // alert(state.image)
    },
    changebgColor: (state, action) => {
      const {bgColor} = action.payload;
      state.bgColor = bgColor;
      // alert(state.image)
    },
    changebtColor: (state, action) => {
      const {btColor} = action.payload;
      state.btColor = btColor;

    },

  },
});

export { formActions };
export default combineReducers({
  form: formReducer,
  questions: questionReducer,
  user: userReducer,
  authorization: authorizationReducer,
});
