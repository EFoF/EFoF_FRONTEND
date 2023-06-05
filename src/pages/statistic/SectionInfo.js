import React, { useState, useEffect } from 'react';
import SectionTitle from '../../elements/section-title/SectionTitle';

import StatisticBySection from './StatisticBySection';
import ProjectData from "../../data/ProjectData.json";
import { Link, useParams } from 'react-router-dom';
import StatisticBar from './StatisticBar';
import { Accordion } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaCompress, FaCode, FaGlobe } from 'react-icons/fa';
import { Route } from 'react-router-dom';
import { getQuestionBySectionForStatistic } from '../../api/survey';
const portfolioData = ProjectData;


const SectionInfo = ({ sectionList, surveyId }) => {
	const [activeSection, setActiveSection] = useState(null);	// 질문 정보를 한 번만 로딩하는 용도
	// const [question, setQeustion] = useState({ question_id: '', question_text: '', question_type: ''});
	const [question, setQuestion] = useState([]);

	const currentPath = window.location.pathname;
	// console.log(currentPath);
	// const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleClickSection = (sectionId) => {
		// alert((surveyId));
		// alert(sectionId);	

		getQuestionBySectionForStatistic(surveyId, sectionId)
			.then((data) => {
				const updatedQuestion = [...question];
				updatedQuestion[sectionId] = data;
				setQuestion(updatedQuestion);
			});

		// navigate(`/statistic/${id}/${sectionId}`);
	};

	//   alert(JSON.stringify(question))

	return (
		<>
			<div className={`section section-padding-2`}>
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
						<Accordion style={{ paddingLeft: '100px', paddingRight: '100px' }}>
							<Accordion.Item eventKey={idx.toString()}>
								<div onClick={() => handleClickSection(item)}>
									<Accordion.Header><FaCode />섹션 {idx + 1}</Accordion.Header>
								</div>

								{/* {activeSection === idx && ( */}
								<Accordion.Body>
									<div className="row-45">
										{question[item] && question[item].map((questionData, idx2) => (
											<div className="col-md-12" key={questionData.id}>
												<div className="col" key={questionData.id}>
													<StatisticBySection projectStyle="project-style-2" portfolio={questionData} data={questionData} />
												</div>
											</div>
										))}
									</div>
								</Accordion.Body>
								{/* )}  */}
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

export default SectionInfo;