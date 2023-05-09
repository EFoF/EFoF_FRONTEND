import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { FaCompress, FaCode, FaGlobe } from 'react-icons/fa';
import ColorSwitcher from '../../elements/switcher/ColorSwitcher';
import SEO from '../../common/SEO';

import Tilty from 'react-tilty';
import ProjectOne from './ProjectOne';
// import ProjectFour from '../component/project/ProjectFour';
// import BlogGridOne from '../component/blog/BlogGridOne';



const Statistic = () => {

    return (
        <>
        <SEO title="Project Details"/>
        <ColorSwitcher />
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
                                        <Accordion.Header><FaCompress /> 설문 참여자 수: N명</Accordion.Header>
                                        <Accordion.Body>
                                        여기에 설문 참여자 리스트 받아오기
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header><FaCode /> 기타 정보</Accordion.Header>
                                        <Accordion.Body>
                                        설문 시작일, 설문 종료일 등등..?
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>

                        </div>
                    </div>
                    
                    <ProjectOne />
                </div>
            </section>
        </>
    )
}

export default Statistic;