import axios from "axios";
import toastMsg from "../ui/Toast";
import API from "./config";
import {useDispatch, useSelector} from "react-redux";
import { authorizationClient, unAuthorizationClient } from ".";
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = API.BASE_URL;
axios.defaults.withCredentials = true;



const surveyInfo = async (survey_id,navigate) => {

    

    try {
      const response = await authorizationClient.get(`${API.SURVEY}/${survey_id}/pre_release`);
    //   toastMsg("통계 요청 성공", true);
      // console.log(response.data.exists);
      // return response.data.exists;
      
      return response.data;
    } catch (error) {
      console.log(error);
      alert(JSON.stringify(error.response.data.message));
    //   toastMsg(JSON.stringify(error))
      navigate(-1);


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
  const addSection = async (survey_id,addSectionRedux) => {
  
    try {
        const response = await authorizationClient.post(`${API.SURVEY}/${survey_id}/section`)
        addSectionRedux(response.data);
        
    } catch (error) {
      console.log(error);
      toastMsg(error.response.data.message, false);
    }
  };
  const deleteSection = async (survey_id,section_id,section_idx,deleteSectionRedux) => {
  
    try {
        const response = await authorizationClient.delete(`${API.SURVEY}/${survey_id}/section/${section_id}`);

        deleteSectionRedux(section_idx);
    } catch (error) {
      console.log(error);
      toastMsg(error.response.data.message, false);
    }
  };

  const updateSection = async (survey_id,nextSectionId,data,changeNextSectionRedux,section_idx,section_id) => {
  
    try {
        const response = await authorizationClient.patch(`${API.SURVEY}/${survey_id}/section/${section_id}`,
        data)
        changeNextSectionRedux(section_idx,nextSectionId)
    } catch (error) {
      console.log(error);
      toastMsg(error.response.data.message, false);
    }
  };
  const updateQuestionOrder = async (survey_id,section_id,question_id,data,reorderRedux,source,destination) => {
  
    
    try {
        const response = await authorizationClient.patch(`${API.SURVEY}/${survey_id}/section/${section_id}/question/${question_id}/order`,
        data)
        
        reorderRedux({source,destination})

    } catch (error) {
      console.log(error);
      toastMsg(error.response.data.message, false);
    }
  };
  
  const createQuestion = async (survey_id,section_id,data,addQuestionRedux) => {
    
    try {
        alert(section_id)
        const response = 
        await authorizationClient.post(`${API.SURVEY}/${survey_id}/section/${section_id}/question`,
        data)
        alert(JSON.stringify(response.data))
        addQuestionRedux(section_id,response.data)
    } catch (error) {
      console.log(error);
      toastMsg(error.response.data.message, false);
    }
  }; 

  const updateQuestionContent = async (survey_id,section_id,question_id,data) => {
    
    try {

        const response = 
        await authorizationClient.patch(`${API.SURVEY}/${survey_id}/section/${section_id}/question/${question_id}/content`,data)

    } catch (error) {
      console.log(error);
      toastMsg(JSON.stringify(error), false);
    }
  }; 
  
  const updateQuestionType = async (survey_id,section_id,question_id,data,changeTypeRedux) => {
    
    try {

        const response = 
        await authorizationClient.patch(`${API.SURVEY}/${survey_id}/section/${section_id}/question/${question_id}/type`,data)
        changeTypeRedux(section_id,question_id,data.type)
    } catch (error) {
      console.log(error);
      toastMsg(error.response.data.message, false);
    }
  }; 
  const updateQuestionIsNecessary = async (survey_id,section_id,question_id,updateIsNecessary) => {
    
    try {

        const response = 
        await authorizationClient.patch(`${API.SURVEY}/${survey_id}/section/${section_id}/question/${question_id}/isNecessary`)
        updateIsNecessary(question_id, section_id );
    } catch (error) {
      console.log(error);
      toastMsg(error.response.data.message, false);
    }
  }; 

  const deleteQuestion = async (survey_id,section_id,question_id,deleteQuestionRedux) => {
    
    try {

        const response = 
        await authorizationClient.delete(`${API.SURVEY}/${survey_id}/section/${section_id}/question/${question_id}`)
        deleteQuestionRedux(question_id, section_id );
    } catch (error) {
      console.log(error);
      toastMsg(error.response.data.message, false);
    }
  }; 


  const createQuestionOption = async (survey_id,section_id,question_id,addOptionReduxWithId, data) => {
    
    try {
        const response = 
        await authorizationClient.post(`${API.SURVEY}/${survey_id}/section/${section_id}/question/${question_id}`, data)
        addOptionReduxWithId(section_id,question_id, response.data);
    } catch (error) {
      console.log(error);
      // toastMsg(error.response.data.message, false);
    }
  }; 

  const updateQuestionOptionText = async (survey_id,section_id,question_id,question_Option_id,data) => {
    
    try {

        const response = 
        await authorizationClient.patch(`${API.SURVEY}/${survey_id}/section/${section_id}/question/${question_id}/question_option/${question_Option_id}`
        ,data)
    } catch (error) {
      console.log(error);
      toastMsg(error.response.data.message, false);
    }
  }; 

  const updateQuestionOptionImg = async (survey_id,section_id,question_id,question_Option_id,data,fileUploadRedux) => {
    
    try {

        const response = 
        await authorizationClient.patch(`${API.SURVEY}/${survey_id}/section/${section_id}/question/${question_id}/question_option/${question_Option_id}/image`
        ,data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          toastMsg("이미지 변경 성공", true);
          fileUploadRedux(section_id,question_id,question_Option_id,response.data)      
    } catch (error) {
      console.log(error);
      toastMsg(error.response.data.message, false);
    }
  };

  const deleteQuestionOptionImg = async (survey_id,section_id,question_id,question_Option_id,deleteImageRedux) => {
    
    try {

        const response = 
        await authorizationClient.patch(`${API.SURVEY}/${survey_id}/section/${section_id}/question/${question_id}/question_option/${question_Option_id}/image/delete`)
          toastMsg("이미지 삭제 성공", true);
          deleteImageRedux();
    } catch (error) {
      console.log(error);
      toastMsg(error.response.data.message, false);
    }
  };

  const updateQuestionOptionNextSection = async (survey_id,section_id,question_id,question_Option_id,data,changeNextSection) => {
    
    try {

        const response = 
        await authorizationClient.patch(`${API.SURVEY}/${survey_id}/section/${section_id}/question/${question_id}/question_option/${question_Option_id}/section`,data)
          
        changeNextSection(section_id,question_Option_id,question_id,data.nextSection_id);
    } catch (error) {
      console.log(error);
      toastMsg(error.response.data.message, false);
    }
  };

  const deleteQuestionOption = async (survey_id,section_id,question_id,question_Option_id,deleteOptionRedux) => {
    
    try {

        const response = 
        await authorizationClient.delete(`${API.SURVEY}/${survey_id}/section/${section_id}/question/${question_id}/question_option/${question_Option_id}`)
          
        deleteOptionRedux(section_id,question_id,question_Option_id);
    } catch (error) {
      console.log(error);
      toastMsg(error.response.data.message, false);
    }
  };

  export {
    surveyInfo,
    uploadImgInit,
    deleteImgInit,
    updateSurveyTitle,
    updateSurveyDescription,
    deleteSurvey,
    deleteSection,
    updateSection,
    addSection,
    deleteSurveyImg,
    updateSurveyImg,
    updateSurveyColor,
    updateQuestionOrder,
    createQuestion,
    updateQuestionContent,
    updateQuestionType,
    updateQuestionIsNecessary,
    deleteQuestion,
    createQuestionOption,
    updateQuestionOptionText,
    updateQuestionOptionImg,
    deleteQuestionOptionImg,
    updateQuestionOptionNextSection,
    deleteQuestionOption

};
