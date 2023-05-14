import { configureStore,getDefaultMiddleware } from '@reduxjs/toolkit';
import { formReducer } from '../slices';
import { userReducer } from '../slices';
import { authorizationReducer} from "../slices";
import storage from "redux-persist/lib/storage"
import {persistReducer} from "redux-persist";

const persistConfig = {
  key : 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, authorizationReducer)

const store = configureStore({
  reducer: {
    // question은 form 리듀서 안에 combinedReducer로 묶여있음^^
    form: formReducer,
    user: userReducer,
    authorization: persistedReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export {store}