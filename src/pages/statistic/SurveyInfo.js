import React from 'react';
import { Link } from 'react-router-dom';
import { slugify } from '../../utils';
import StatisticPie from './StatisticPie'; 
import StatisticOX from './StatisticOX';
import StatisticBar from './StatisticBar';


// 주관식 답변 dummydata
const dummy = [
	{
		id: 1, 
		answer: "ㅇㅇㅇㅇ"
	}, 
	{
		id: 1, 
		answer: "ㅁㄴㅇㄹㄴㅇ"
	}, 
	{
		id: 1, 
		answer: "ㄷㄷㄷㄱㅈ"
	}, 
	{
		id: 1, 
		answer: "ㅁ오ㅗㄹㅇ"
	}, 
]

const answers = dummy.map((item) => (
	<div key={item.id} className='col-md-12'>
	  {item.answer}
	</div>
  ))


const SurveyInfo = ({projectStyle, portfolio}) => {

	const isMultipleChoice = portfolio.category.includes('객관식');
	const isBlankAnswer = portfolio.category.includes('찬부식');

	console.log(portfolio.category, isMultipleChoice, isBlankAnswer);

    return (
		<>
		<div className='row' style={{backgroundColor: 'white' , paddingBottom: '30px'}}>
			<div className={`project-grid ${projectStyle}`}>	
				<span className="subtitle">{portfolio.category}</span>
				<h3 className="title"> {portfolio.title}</h3>
				{/* 제목이랑 그래프 간 간격 좁히기 */}
			</div>

			{isMultipleChoice || isBlankAnswer ? (
				<>
					<div className='col-md-6'>
						{isMultipleChoice ? <StatisticBar /> : <StatisticOX />}
					</div>

					<div className='col-md-6'>
						<StatisticPie />
					</div>
				</>
			) : (
				<div className='col-md-12'>
					<p>hi</p>
				</div>
			)}
		</div>
		</>
    )
}

export default SurveyInfo;
