import axios from "axios";
import toastMsg from "../ui/Toast";
import API from "./config";
import {useDispatch, useSelector} from "react-redux";
import { authorizationClient, unAuthorizationClient } from ".";

axios.defaults.baseURL = API.BASE_URL;
axios.defaults.withCredentials = true;



const surveyInfo = async (survey_id) => {

    try {
      const response = await authorizationClient.get(`${API.SURVEY}/${survey_id}/pre_release`);
    //   toastMsg("통계 요청 성공", true);
      // console.log(response.data.exists);
      // return response.data.exists;
      
      return response.data;
    } catch (error) {
      console.log(error);
      alert(JSON.stringify(error.response.data.message));
      // toastMsg(error.response.data.message, false);
      // return false;
    }
  };
  
  const uploadImgInit = async (formData,uploadImage) => {
  
    try {
        const response = await authorizationClient.post(`${API.SURVEY}/image`,formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          
          uploadImage(response);
          
        toastMsg("이미지 업로드 성공", true);
    } catch (error) {
      console.log(error);

      toastMsg(error.response.data.message, false);
    }
  };
  const deleteImgInit = async (imageUrl,deleteImage) => {

    try {
        const response = await authorizationClient.delete(`${API.SURVEY}/image?imageUrl=${imageUrl}`);

        toastMsg("이미지 삭제 성공", true);
        deleteImage();
    
    } catch (error) {
      console.log(error);

      toastMsg(error.response.data.message, false);
    }
  };
  
  const deleteSurvey = async (survey_id) => {
    try {
        const response = await authorizationClient.delete(`${API.SURVEY}/${survey_id}`);
        toastMsg("설문 삭제 성공", true);
    
    } catch (error) {
      console.log(error);
      toastMsg(error.response.data.message, false);
    }
  };

  const updateSurveyTitle = async (survey_id,data) => {
    try {
        const response = await authorizationClient.patch(`${API.SURVEY}/${survey_id}/title`,data);
        
    } catch (error) {
      console.log(error);
      toastMsg(error.response.data.message, false);
    }
  };
  const updateSurveyDescription = async (survey_id,data) => {
    try {
        const response = await authorizationClient.patch(`${API.SURVEY}/${survey_id}/description`,data);
  
    } catch (error) {
      console.log(error);
      toastMsg(error.response.data.message, false);
    }
  };
  const updateSurveyColor = async (survey_id,data) => {
    try {
        const response = await authorizationClient.patch(`${API.SURVEY}/${survey_id}/color`,data);
  
    } catch (error) {
      console.log(error);
      toastMsg(error.response.data.message, false);
    }
  };
  const updateSurveyImg = async (formData,uploadImage,survey_id) => {
  
    try {
        const response = await authorizationClient.patch(`${API.SURVEY}/${survey_id}/image`,formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          
          uploadImage(response);
          
        toastMsg("이미지 업로드 성공", true);
    } catch (error) {
      console.log(error);

      toastMsg(error.response.data.message, false);
    }
  };
  const deleteSurveyImg = async (deleteImage,survey_id) => {
  
    try {
        const response = await authorizationClient.delete(`${API.SURVEY}/${survey_id}/image`)
          
        deleteImage();
          
        toastMsg("이미지 삭제 성공", true);
    } catch (error) {
      console.log(error);

      toastMsg(error.response.data.message, false);
    }
  };
  const addSection = async (survey_id) => {
  
    try {
        const response = await authorizationClient.post(`${API.SURVEY}/${survey_id}/section`)

    } catch (error) {
      console.log(error);
      toastMsg(error.response.data.message, false);
    }
  };
  const deleteSection = async (survey_id,section_id) => {
  
    try {
        const response = await authorizationClient.post(`${API.SURVEY}/${survey_id}/section/${section_id}`)

    } catch (error) {
      console.log(error);
      toastMsg(error.response.data.message, false);
    }
  };
  const updateSection = async (survey_id,section_id,nextSectionId,data) => {
  
    try {
        const response = await authorizationClient.post(`${API.SURVEY}/${survey_id}/section/${section_id}`,
        data)
    } catch (error) {
      console.log(error);
      toastMsg(error.response.data.message, false);
    }
  };
  export {
    surveyInfo,uploadImgInit,deleteImgInit,updateSurveyTitle,updateSurveyDescription,deleteSurvey,deleteSection,updateSection,addSection,deleteSurveyImg,updateSurveyImg,updateSurveyColor
  };
