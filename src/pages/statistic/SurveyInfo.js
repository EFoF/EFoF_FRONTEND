import React from 'react';
import { Link } from 'react-router-dom';
import { slugify } from '../../utils';
import StatisticPie from './StatisticPie'; 
import StatisticOX from './StatisticOX';
import StatisticBar from './StatisticBar';
import StatisticPie2 from './StatisticPie2';
import StatisticPie3 from './StatisticPie3';


  


// 주관식 답변 dummydata
const dummy = [
	{
		id: 1, 
		answer: "답변1 ~~~~~~~~~"
	}, 
	{
		id: 1, 
		answer: "답변2 ~~~~~~~~~"
	}, 
	{
		id: 1, 
		answer: "답변3 ~~~~~~~~~"
	}, 
	{
		id: 1, 
		answer: "답변4 ~~~~~~~~~"
	}, 
]


const SurveyInfo = ({projectStyle, portfolio}) => {

	const isMultipleChoice = portfolio.category.includes('객관식');
	const isBlankAnswer = portfolio.category.includes('찬부식');

	console.log(portfolio.category, isMultipleChoice, isBlankAnswer);

    return (
		<>
		<div className='row' style={{backgroundColor: 'white' , paddingBottom: '90px'}}>
			<div className={`project-grid ${projectStyle}`}>	
				<span className="subtitle">{portfolio.category}</span>
				<h3 className="title"> {portfolio.title}</h3>
			</div>

			{isMultipleChoice || isBlankAnswer ? (
				<>
					<div className='col-md-6'>
						{/* {isMultipleChoice ? <StatisticBar /> : <StatisticOX />} */}
						<StatisticBar />
					</div>
					<div className='col-md-6'>
						{/* <StatisticPie /> */}
						<StatisticPie2 />
					</div>
				</>
			) : (
				// <div className='col-md-12'>
				// 	{dummy.map((item, index) => (
				// 		<p key={index}>{item.answer}</p>
				// 	))}
				// </div>
				<div className='col-md-12' style={{ paddingLeft: '20px', paddingRight: '20px', paddingTop: '-100px'}}>
					<div style={{
							overflow: 'auto', // 또는 overflow: 'auto'; (원래 scroll으로 했는데 auto가 더 나은 거 같음)
							height: '120px', // 컨테이너의 높이 설정
							// border: '1px solid #000' // 테두리 스타일 지정
							}}
					>{dummy.map((item, index) => (
						<p key={index}>{item.answer}</p>
					))}
					</div>
				</div>
			)}

			
		</div>
		</>
    )
}

export default SurveyInfo;
