import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toastMsg from "../ui/Toast";
import { authorizationClient, unAuthorizationClient } from ".";
import API from "./config";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = API.BASE_URL;
axios.defaults.withCredentials = true;


// 통계 조회
const checkStatistic = createAsyncThunk(
  "statistics/checkSTatistic", 
  async (survey_id, navigate) => {
    try {
      const response = await unAuthorizationClient.get(
        `${API.SURVEY}/${survey_id}/${API.STATISTIC}`); // 데이터를 받아올 백엔드 서버
        const data = response.data;
      toastMsg("통계 요청 성공", true);
      // console.log("응답데이터: ", response.data);
      // return response.data;
      return data;
    } catch (error) {
      navigate(-1);
      // console.log(error);
      // toastMsg(error.response.data.message, false);
      // return false;
      const errorMessage = error.response?.data?.message || "통계 조회 실패";
      toastMsg(errorMessage, false);
      throw error;
    }
  }
);

export {
  checkStatistic
};