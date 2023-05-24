import React, {useState, useEffect} from 'react';
import SectionTitle from '../../elements/section-title/SectionTitle';

import SurveyInfo from './SurveyInfo';
import ProjectData from "../../data/ProjectData.json";
import { Link } from 'react-router-dom';
import StatisticBar from './StatisticBar';
import { Accordion } from 'react-bootstrap';

import { FaCompress, FaCode, FaGlobe } from 'react-icons/fa';

const portfolioData = ProjectData;
const AllData = ProjectData;


const QuestionStatistic = ({parentClass, colSize, itemShow, columnGap, sectionList}) => {

	const [getAllItems] = useState(AllData);
	const [visiableProject] = useState(itemShow ? itemShow : 6);
	const [visibleItems, setVisibleItems] = useState([]);
	const [activeSection, setActiveSection] = useState(null);
	
	useEffect(() => {
		setVisibleItems(getAllItems.filter((item) => item.id <= visiableProject));
    }, []);

	// ======================아코디언======================
	const [isAccordionOpen, setIsAccordionOpen] = useState(false);

	const toggleAccordion = () => {
		setIsAccordionOpen(!isAccordionOpen);
	};

	const accordionHeaderStyle = isAccordionOpen
	? {} // 접힌 상태에서는 패딩이 없는 원래 크기의 스타일
	: { paddingLeft: '80px', paddingRight: '80px' }; // 펼쳐진 상태에서의 스타일
	// =================================================

    return (
		<>
			<div className={`section section-padding-2 ${parentClass ? parentClass : ""}`}>
                <div className="container">
					<SectionTitle 
							subtitle="통계로 설문을 한 눈에!"
							title="각 질문 별 설문 통계"
							textAlignment="heading-left mb--40"
							textColor=""
					/>
					{/* ============================섹션 별 통계============================ */}
					{/* <Accordion onClick={toggleAccordion} style={accordionHeaderStyle}> */}
					
					{sectionList && sectionList.map((item, idx) => (
						<Accordion style={{paddingLeft: '100px', paddingRight: '100px'}}>
								<Accordion.Item eventKey="2">
									<div onClick={() => setActiveSection(idx)}>
										<Accordion.Header><FaCode />섹션 {idx+1}</Accordion.Header>
									</div>
									{activeSection === idx && (
										<Accordion.Body>
										<div className="row-45">
											{portfolioData.slice(12, 16).map((data) => (
															// <div className="col-md-6" key={data.id}>
											<div className="col" key={data.id}>
												<SurveyInfo projectStyle="project-style-2" portfolio={data}/>
											</div>
											))}
										</div>
									</Accordion.Body>  
									)} 
								</Accordion.Item>
                    	</Accordion>
					))}

					{/* =============================================================================== */}

					<div className="more-project-btn">
						<p className="axil-btn btn-fill-white">📂 통계 다운로드 받기</p>
					</div>
                </div>

				{/* 애니메이션 */}
                <ul className="shape-group-7 list-unstyled">
                    <li className="shape shape-1"><img src={process.env.PUBLIC_URL + "/images/others/circle-2.png"} alt="circle" /></li>
                    <li className="shape shape-2"><img src={process.env.PUBLIC_URL + "/images/others/bubble-2.png"} alt="Line" /></li>
                    <li className="shape shape-3"><img src={process.env.PUBLIC_URL + "/images/others/bubble-1.png"} alt="Line" /></li>
                </ul>
            </div>
		</>
    )
}

export default QuestionStatistic;