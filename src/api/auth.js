import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toastMsg from "../ui/Toast";
import { authorizationClient, unAuthorizationClient } from ".";
import API from "./config";

axios.defaults.baseURL = API.BASE_URL;
axios.defaults.withCredentials = true;

// 리프레쉬 토큰으로 액세스토큰 재요청
const refreshAuth = () => {
  return axios.post(API.REISSUE);
};

// createAsyncThunk : axios 날리고, 결과를 redux에 반영까지

// 액세스 토큰 있음 && 유효함
const loadMe = createAsyncThunk(
  "user/loadMe",
  async (_, { rejectWithValue }) => {
    try {
      // const auth = getState();
      // axios.defaults.headers.Cookie = auth.
      const response = await authorizationClient.get(API.MYINFO);
      console.log("마이페이지 정보 : " + response.data);
      console.dir(response.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || null);
    }
  },
);

const authLogin = createAsyncThunk(
  // "user/authLogin",
  "login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await unAuthorizationClient.post(API.LOGIN, data);
      toastMsg("로그인 성공", true);
      console.log("로그인 성공 " + response.data.memberDetail);
      // memberDetail 객체 반환
      return response.data.memberDetail;
    } catch (error) {
      toastMsg(error.response.data.message, false);
      return rejectWithValue(error.response.data);
    }
  },
);

const authLogout = createAsyncThunk("user/authLogout", async () => {
  try {
    const response = await authorizationClient.post(API.LOGOUT);
    toastMsg("로그아웃 성공", true);
    console.log("로그아웃 성공");
    return response.data.data;
  } catch (error) {
    toastMsg(error.response.data.message, false);
    return error.response.data;
  }
});

const authEmailSend = (email) => {
  return unAuthorizationClient.post(`${API.EMAIL_SEND}`, {
    email,
  });
};

const authEmailConfirms = (email, authNumber) => {
  return unAuthorizationClient.post(`${API.EMAIL_CONFIRM}`, {
    email,
    certificationNumber: authNumber,
  });
};

const authSignUp = createAsyncThunk(
  "user/authSignUp",
  async (data, { rejectWithValue }) => {
    try {
      const response = await unAuthorizationClient.post(API.SIGNUP, data);
      toastMsg("회원가입 성공", true);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export {
  loadMe,
  authLogin,
  authLogout,
  authEmailSend,
  authEmailConfirms,
  authSignUp,
  refreshAuth,
};