import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { FaCompress, FaCode, FaGlobe } from 'react-icons/fa';
import ColorSwitcher from '../../elements/switcher/ColorSwitcher';
import SEO from '../../ui/common/SEO';

import Tilty from 'react-tilty';
import QuestionStatistic from './QuestionStatistic';
import MemberData from '../../data/MemberData.json';
import SurveyData from '../../data/SurveyData.json';
import StatisticGraph from './StatisticBar';
import Footer from '../../ui/common/Footer';

import ProjectData from "../../data/ProjectData.json";
import SurveyInfo from './SurveyInfo';



const userNames = MemberData.map(member => member.userName);
const userNum = MemberData.length;

// const surveyItems = SurveyData.map((survey) => ({
//     title: survey.title,
//     description: survey.description,
//     questions: survey.question,
//   }));

const portfolioData = ProjectData;

const Statistic = () => {

    return (
        <>
        <SEO title="Project Details"/>
        {/* <ColorSwitcher /> */}
            <section className="section-padding single-portfolio-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="banner-thumbnail">
                                <Tilty perspective={2000} reset={false}>
                                    <img src='/images/statistics/project-1.png' alt="Illustration" />
                                </Tilty>
                            </div>
                        </div>
                        <div className="col-lg-6 offset-xl-1">
                            <div className="why-choose-us">
                                <div className="section-heading heading-left">
                                    <h3 className="title">설문 제목 1</h3>
                                    <p>설문 description</p>
                                </div>

                                <Accordion defaultActiveKey="1">
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header><FaCompress /> 설문 참여자 수: {userNum}명</Accordion.Header>
                                        {/* <Accordion.Body>
                                            {userNames.reduce((rows, name, index) => {
                                                if (index % 5 === 0) rows.push([]); // op2. 5 -> 3
                                                rows[rows.length - 1].push(name);
                                                return rows;
                                            }, []).map((row, rowIndex) => (
                                                <div className="row" key={rowIndex}>
                                                    {row.map((name, colIndex) => (
                                                        <div className="col-md-2" key={colIndex}>
                                                            
                                                            {name}
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </Accordion.Body> */}
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header><FaCode /> 설문 제약 조건</Accordion.Header>
                                        <Accordion.Body>
                                            {/* 설문 제약 조건 */}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>

                        </div>
                    </div>

                    <QuestionStatistic />
                    <Footer CparentClass="" />
                </div>
            </section>
        </>
    )
}

export default Statistic;