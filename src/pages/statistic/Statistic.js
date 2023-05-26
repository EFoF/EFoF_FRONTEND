import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { FaCompress, FaCode, FaGlobe } from 'react-icons/fa';
import ColorSwitcher from '../../elements/switcher/ColorSwitcher';
import SEO from '../../ui/common/SEO';

import Tilty from 'react-tilty';
import SectionInfo from './SectionInfo';
import MemberData from '../../data/MemberData.json';
import SurveyData from '../../data/SurveyData.json';
import StatisticGraph from './StatisticBar';
import Footer from '../../ui/common/Footer';
import Header from '../../ui/common/Header';
import ProjectData from "../../data/ProjectData.json";
import SurveyInfo from './StatisticBySection';

// import { checkStatistic } from '../../api/statistics';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { statActions } from '../../slices/stat';
import { authorizationClient, unAuthorizationClient } from '../../api';
import API from '../../api/config';
import { fetchSurvey } from '../../api/survey';

const userNames = MemberData.map(member => member.userName);
const userNum = MemberData.length;

// const surveyItems = SurveyData.map((survey) => ({
//     title: survey.title,
//     description: survey.description,
//     questions: survey.question,
//   }));

const portfolioData = ProjectData;

const Statistic = () => {
    const { id } = useParams();
    // const [survey, setSurvey] = useState([]);
    const [survey, setSurvey] = useState({ title: '', description: '', participantNum: 0,sImageURL:"" });

    const currentPath = window.location.pathname;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const selSurvey = survey.filter((survey) => survey.id === 1);
    // console.log(selSurvey);

    useEffect(() => {
        if(currentPath === `/statistic/${id}`){
            fetchSurvey(id)
              .then((data) => {               
                // dispatch(statActions.initStat({data}));

                const title = data.title;
                const description = data.description;
                const participantNum = data.participantNum;
                const sectionList = data.sectionList;
                const sImageURL = data.simageURL;

                setSurvey({title, description, participantNum, sectionList, sImageURL});
            })
        }
        
      }, [id, currentPath]);

    console.log(survey);
      
    return (
        <>
        <SEO title="Project Details"/>
        {/* <ColorSwitcher /> */}
        <main className="main-wrapper">
            <Header />
            <section className="section-padding single-portfolio-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="banner-thumbnail">
                                <Tilty perspective={2000} reset={false}>
                                    { (survey.sImageURL==="") ? <img src='https://efof.s3.ap-northeast-2.amazonaws.com/default/survey_default' alt="Illustration" /> 
                                                        : <img src={`https://efof.s3.ap-northeast-2.amazonaws.com/survey/${survey.sImageURL}`}  alt="Illustration" />}
                                </Tilty>
                            </div>
                        </div>
                        <div className="col-lg-6 offset-xl-1">
                            <div className="why-choose-us">
                                <div className="section-heading heading-left">
                                    <h3 className="title">{survey.title}</h3>
                                    <p>{survey.description}</p>
                                </div>

                                <Accordion defaultActiveKey="1">
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header><FaCompress /> 설문 참여자 수: {survey.participantNum}명</Accordion.Header>
                                    </Accordion.Item>
                                </Accordion>
                            </div>

                        </div>
                    </div>
                    <SectionInfo sectionList={survey.sectionList}/>
                    <Footer CparentClass="" />
                </div>
            </section>
        </main>
        </>
    )
}

export default Statistic;