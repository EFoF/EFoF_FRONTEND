import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toastMsg from "../ui/Toast";
import { authorizationClient, unAuthorizationClient } from ".";
import API from "./config";

axios.defaults.baseURL = API.BASE_URL;
axios.defaults.withCredentials = true;


// 통계 조회
const checkStatistic = async (survey_id) => {
  try {
    const response = await unAuthorizationClient.get(
      `${API.SURVEY}/${survey_id}/${API.STATISTIC}`); // 데이터를 받아올 백엔드 서버
      alert("success");
    toastMsg("통계 요청 성공", true);
    console.log("응답데이터: ", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    // toastMsg(error.response.data.message, false);
    // return false;
  }
};

export {
  checkStatistic
};