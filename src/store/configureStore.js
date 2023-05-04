import { configureStore,getDefaultMiddleware } from '@reduxjs/toolkit';
import { formReducer } from '../slices';
import { userReducer } from '../slices';


export const store = configureStore({
  reducer: {
    // question은 form 리듀서 안에 combinedReducer로 묶여있음^^
    form: formReducer,
    user: userReducer
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
