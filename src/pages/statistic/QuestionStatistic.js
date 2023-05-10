import React, {useState, useEffect} from 'react';
import SectionTitle from '../../elements/section-title/SectionTitle';

import SurveyInfo from './SurveyInfo';
import ProjectData from "../../data/ProjectData.json";
import { Link } from 'react-router-dom';
import StatisticBar from './StatisticBar';

const portfolioData = ProjectData;
const AllData = ProjectData;


const QuestionStatistic = ({parentClass, colSize, itemShow, columnGap}) => {

	const [getAllItems] = useState(AllData);
	const [visiableProject] = useState(itemShow ? itemShow : 6);
	const [visibleItems, setVisibleItems] = useState([]);
	
	useEffect(() => {
		setVisibleItems(getAllItems.filter((item) => item.id <= visiableProject));
    }, []);

    return (
		<>
			<div className={`section section-padding-2 ${parentClass ? parentClass : ""}`}>
                <div className="container">
					<SectionTitle 
							subtitle="각 질문 별 설문 통계"
							title="Some of our <br>finest work."
							textAlignment="heading-left mb--40"
							textColor=""
					/>
					{/* =============================================================================== */}
					{/* <div className="row row-45"> */}
					<div className="row-45">
						{portfolioData.slice(12, 16).map((data) => (
							// <div className="col-md-6" key={data.id}>
							<div className="col" key={data.id}>
								<SurveyInfo projectStyle="project-style-2" portfolio={data}/>
							</div>
						))}
					</div>
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