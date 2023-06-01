import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { slugify } from '../../utils';
import toastMsg from "../../ui/Toast";
import {deleteSurvey} from "../../api/survey";
import ReactDOM from "react-dom";
import ConfirmModal from "../../ui/ConfirmModal";

const SurveyProp = ({projectStyle, survey, label}) => {
    const imageStyle = {
        width: '610px',
        height: '230px',
        backgroundColor:'white'
    };
    // alert(JSON.stringify(survey));

    const getDDays = () => {
        const { expire_date, surveyStatus } = survey;
        const expireDate = new Date(expire_date);
        const currentDate = new Date();

        // 만료 날짜의 시간과 분을 0으로 설정하여 날짜만 비교
        expireDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);

        const oneDay = 24 * 60 * 60 * 1000; // 1일을 밀리초로 표현

        const daysDiff = Math.ceil((currentDate - expireDate) / oneDay);

        let dDay = "";
        if (surveyStatus === "making" || surveyStatus === "prerelease") {
            return <img onClick={handleDelete} src="/images/icon/icon-trash.png" alt="icon" style={{ display:"inline-flex", width: "22px", height: "22px", verticalAllign: "middle", marginRight: "3px", cursor: "pointer"}} />
        }
        if (daysDiff === 0) {
            dDay = "D-Day";
        } else if (surveyStatus === "progress") {
            dDay = `D${daysDiff}`;
        } else if (surveyStatus === "over") {
            dDay = `D+${daysDiff}`;
        }

        return dDay;
    };

    const getStatus = () => {
        const { surveyStatus } = survey;
        if (surveyStatus === "making") {
            return "제작 중";
        } else if (surveyStatus === "prerelease") {
            return "설문 배포 전";
        } else if (surveyStatus === "progress") {
            return "설문 진행 중";
        } else if (surveyStatus === "over") {
            return "설문 마감";
        }
    };

    const handleCopyUrl = () => {
        const {survey_id, surveyStatus} = survey;
        console.log(survey_id);
        let urlToCopy = process.env.REACT_APP_DEFAULT_URL;
        if (surveyStatus === "making") {
            urlToCopy +=  `/form/making/${survey_id}`;
        } else if (surveyStatus === "prerelease") {
            urlToCopy +=  `/form/pre-release/${survey_id}`;
        } else if (surveyStatus === "progress"){
            urlToCopy += `/form/in-progress/${survey_id}`;
        } else if (surveyStatus === "over" && label === "participate"){
            urlToCopy += `/form/over/${survey_id}`;
        } else if (surveyStatus === "over" && label === "generate"){
            urlToCopy += `/form/pre-release/${survey_id}`;
        }
        console.log(urlToCopy);

        navigator.clipboard
            .writeText(urlToCopy)
            .then(() => {
                toastMsg('URL이 복사되었습니다!', true);
            })
            .catch((error) => {
                console.error('URL 복사 실패:', error);
                toastMsg('URL 복사에 실패했습니다.', false);
            });
    };

    const handleDelete = () => {
        const {survey_id} = survey;
        console.log(survey_id);
        const handleConfirm = () => {
            deleteSurvey(survey_id);
            ReactDOM.unmountComponentAtNode(document.getElementById("modal-root"));
        };
        const handleCancel = () => {
            // 취소 버튼 클릭 시 처리할 코드 작성
            ReactDOM.unmountComponentAtNode(document.getElementById("modal-root"));
        };
        const confirmModal = <ConfirmModal message={"설문을 삭제하시겠습니까?"} onConfirm={handleConfirm} onCancel={handleCancel} />;
        ReactDOM.render(confirmModal, document.getElementById("modal-root"));
    };


    return (
        <>
            <div className={`project-grid ${projectStyle}`}>
                <div className="thumbnail">
                    <Link to={process.env.PUBLIC_URL + `/form-details/${slugify(survey.title)}`}>
                        {survey.s_imageurl === undefined || survey.s_imageurl === "" || survey.s_imageurl === null ?
                            (
                                <img src={process.env.REACT_APP_OPTION_DEFAULT_IMG} alt="icon" style={imageStyle}/>
                            ) : (
                                <img src={process.env.REACT_APP_S3_URL + survey.s_imageurl} alt="icon" style={imageStyle}/>
                            )}

                    </Link>
                </div>
                <div className="content">
                    <div className="tag" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                        <span className="subtitle" style={{marginRight: 'auto'}}>
                            <span style={{ fontWeight: "bold", color: "gray" }}>{getStatus()}</span>
                        </span>
                        <span style={{marginLeft: 'auto', fontWeight:"bold", color: "gray"}}>{getDDays()}</span>
                    </div>
                    <h4 className="title" style={{
                        display: 'block',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                    }}>
                        {survey.surveyStatus === "making" ? (
                            <Link to={process.env.PUBLIC_URL + `/form/making/${survey.survey_id}`}>
                                {survey.title}
                            </Link>
                        ) : survey.surveyStatus === "prerelease" ? (
                            <Link to={process.env.PUBLIC_URL + `/form/pre-release/${survey.survey_id}`}>
                                {survey.title}
                            </Link>
                        ) : survey.surveyStatus === "progress" ? (
                            <Link to={process.env.PUBLIC_URL + `/form/in-progress/${survey.survey_id}`}>
                                {survey.title}
                            </Link>
                        ) : survey.surveyStatus === "over" && label === "participate" ? (
                            <Link to={process.env.PUBLIC_URL + `/form/over/${survey.survey_id}`}>
                                {survey.title}
                            </Link>
                        ) : survey.surveyStatus === "over" && label === "generate" ? (
                            <Link to={process.env.PUBLIC_URL + `/form/pre-release/${survey.survey_id}`}>
                                {survey.title}
                            </Link>
                        ) : (
                            <Link to={window.location.pathname}>
                                {survey.title}
                            </Link>
                        )}

                    </h4>
                    <p style={{
                        display: 'block',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis'
                    }}>
                        {survey.description}
                    </p>
                    <div>
                        <Link to={process.env.PUBLIC_URL + `/statistic/${survey.survey_id}`} className="more-btn">
                            <img src="/images/icon/icon-31.png" alt="icon" style={{ display: "inline-flex", width: "30px", height: "30px", verticalAllign: "middle", marginRight: "10px" }} />
                            <span style={{verticalAlign: "middle" }}>통계 보러가기</span>
                        </Link>
                        <img
                            onClick={handleCopyUrl}
                            src="/images/icon/icon-copy.png"
                            alt="icon"
                            style={{ display: "inline-flex", width: "25px", height: "25px", verticalAlign: "middle", marginLeft: "auto", cursor: "pointer", float: "right", marginTop: "4px"}}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SurveyProp;