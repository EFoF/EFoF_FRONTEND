import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toastMsg from "../ui/Toast";
import { authorizationClient, unAuthorizationClient } from ".";
import API from "./config";
import {useDispatch, useSelector} from "react-redux";
import {authorizationActions} from "../slices/authorization"

axios.defaults.baseURL = API.BASE_URL;
axios.defaults.withCredentials = true;

// 리프레쉬 토큰으로 액세스토큰 재요청
// TODO 아직 테스트를 실시하지 못했다.
const refreshAuth = (accessToken) => {
  // 여기서 header에 토큰을 담는다.
  // useSelector는 컴포넌트에서 호출하는게 아니면 오류가 나나보다.
  // 후에 prop 등으로 받아오겠다.
  axios.defaults.headers.common['Authorization'] = "Bearer " + accessToken;
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
      // console.log("마이페이지 정보 : " + response.data);
      // console.dir(response.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || null);
    }
  },
);

const authLogin = createAsyncThunk(
  // "user/authLogin",
  "login",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await unAuthorizationClient.post(API.LOGIN, data);
      toastMsg("로그인 성공", true);
      dispatch(authorizationActions.setLoginDTO(response.data.loginLastDTO));
      return response.data;
    } catch (error) {
      toastMsg(error.response.data.message, false);
      return rejectWithValue(error.response.data);
    }
  },
);

// const authToken = createAsyncThunk(
//   "token",
//     async (data, {rejectWithValue}) => {
//       return data;
//     })

const authLogout = createAsyncThunk("user/authLogout", async () => {
  try {
    const response = await authorizationClient.post(API.LOGOUT);
    toastMsg("로그아웃 성공", true);
    // console.log("로그아웃 성공");
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
    code: authNumber,
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
      // alert(JSON.stringify(error))
      return rejectWithValue(error.response.data);
    }
  },
);

// 사용자가 입력한 email 이 DB에 있는 이메일인지 검증
const checkEmailExists = async (email) => {
  try {
    const response = await unAuthorizationClient.post(API.EMAIL_EXIST, { email });
    // console.log("데이타 테스트",response.data.exists)
    // toastMsg("인증 성공", true);
    return response.data.exists;
  } catch (error) {
    // console.log(error);
    // toastMsg("인증 실패", false);
    return false;
  }
};

//사용자가 비밀번호 변경 시 기존 비밀번호와 일치하는 지 검증 뒤 비밀번호 변경 - 비로그인 시
const updatePasswordVisitor = async (email, password) => {
  try {
    const response = await unAuthorizationClient.patch(API.PASSWORD_UPDATE_VISITOR, { email, newPassword: password });
    toastMsg("비밀번호 변경 성공", true);
    // console.log(response.data.exists);
    // return response.data.exists;
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // console.log(error);
    toastMsg(error.response.data.message, false);
    return false;
  }
};

//사용자가 비밀번호 변경 시 기존 비밀번호와 일치하는 지 검증 뒤 비밀번호 변경 - 로그인 되어 있을 시
const updatePasswordMember = async (oldPassword, password) => {
  try {
    const response = await unAuthorizationClient.patch(API.PASSWORD_UPDATE, { oldPassword, newPassword: password });
    toastMsg("비밀번호 변경 성공", true);
    // console.log(response.data.exists);
    // return response.data.exists;
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // console.log(error);
    toastMsg(error.response.data.message, false);
    return false;
  }
};

export {
  loadMe,
  authLogin,
  authLogout,
  authEmailSend,
  authEmailConfirms,
  authSignUp,
  refreshAuth,
  checkEmailExists,
  updatePasswordVisitor,
  updatePasswordMember,
};