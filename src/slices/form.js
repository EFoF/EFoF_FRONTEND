import { createSlice, combineReducers } from '@reduxjs/toolkit';
import { questionReducer } from '.';



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

const { actions: formActions, reducer: formReducer } = createSlice({
  name: 'form',
  initialState,
  reducers: {
    initForm:(state, action) => {
      const { data } = action.payload;
      state.id = data.id;
      state.title = data.title;
      state.detail = data.description;
      state.image = data.simageURL;
      state.fontColor = data.fontColor;
      state.bgColor = data.bgColor;
      state.btColor = data.btColor;
      state.isPre = true;
    },
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
  // user: userReducer,
  // authorization: authorizationReducer,
});
