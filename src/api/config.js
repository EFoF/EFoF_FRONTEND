const BASE_URL = process.env.REACT_APP_PUBLIC_API_BASE;
// const API_VER = ""; => API 미정이라 주석
const MEMBER = "/member/";
const AUTH = "/auth/";
// const BOARD = "/board/";
const MYINFO = "myInfo";
const REISSUE = "reissue";
const LOGIN = "login";
const LOGOUT = "logout";
const SIGNUP = "signup";
const EMAIL_CERTIFICATION_SEND = "mailConfirm";
const EMAIL_CERTIFICATION_CONFIRM = "codeConfirm";
const SURVEY = "/survey";
const PRE = "//{survey_id}/pre_release";
const EMAIL_EXIST_CHECK = "check-email";
const UPDATE = "update";
const PASSWORD = "/password";
const VISITOR = "/visitor";

const STATISTIC = "/statistic";
// const SURVEY_ID = "{survey_id}";  // 이거 맞나.. 머임?ㅜㅜ



const API = {
  BASE_URL: `${BASE_URL}`,
  AUTH: `${AUTH}`,
  LOGIN: `${LOGIN}`,
  LOGOUT: `user/${LOGOUT}`,
  MYINFO: `${MEMBER}${MYINFO}`,
  EMAIL_SEND: `${AUTH}${EMAIL_CERTIFICATION_SEND}`,
  EMAIL_CONFIRM: `${AUTH}${EMAIL_CERTIFICATION_CONFIRM}`,
  SIGNUP: `${AUTH}${SIGNUP}`,
  MEMBER: `${MEMBER}`,  
  REISSUE: `${AUTH}${REISSUE}`,
  SURVEY: `${SURVEY}`,

  EMAIL_EXIST: `${AUTH}${EMAIL_EXIST_CHECK}`,
  PASSWORD_UPDATE_VISITOR: `${AUTH}${UPDATE}${PASSWORD}${VISITOR}`,
  PASSWORD_UPDATE: `${AUTH}${UPDATE}${PASSWORD}`,
  // BOARD: `${BOARD}`,
  // STATISTIC: `${SURVEY_ID}${STATISTIC}`
  STATISTIC: `${STATISTIC}`
};

export default API;
