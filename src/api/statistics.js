import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toastMsg from "../ui/Toast";
import { authorizationClient, unAuthorizationClient } from ".";
import API from "./config";
// import { deflate } from "zlib";

axios.defaults.baseURL = API.BASE_URL;
axios.defaults.withCredentials = true;


// 통계 조회
const checkStatistic = async (survey_id, member_id) => {
  try {
    const response = await unAuthorizationClient.patch(API.STATISTIC, { survey_id, member_id });
    toastMsg("통계 요청 성공", true);
    // console.log(response.data.exists);
    // return response.data.exists;
    console.log(response.data);
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