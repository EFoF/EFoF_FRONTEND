import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toastMsg from "../ui/Toast";
import { authorizationClient, unAuthorizationClient } from ".";
import API from "./config";
// import { deflate } from "zlib";

axios.defaults.baseURL = API.BASE_URL;
axios.defaults.withCredentials = true;

// 사용자가 입력한 email 이 DB에 있는 이메일인지 검증
const checkSurveyStat = async (id) => {
    try {
      const response = await unAuthorizationClient.get(API.SURVEY_STAT, { id });
      return response.data;
    } catch (error) {
      console.log(error);
    }
};

export default checkSurveyStat;