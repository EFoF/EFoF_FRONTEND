import React from 'react';
import { Link } from 'react-router-dom';
import { slugify } from '../../utils';
import StatisticPie from './StatisticPie';
import StatisticBar from './StatisticBar';


  


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


const StatisticBySection = ({projectStyle, portfolio, sectionId}) => {

	const isShortAnswer = portfolio.category.includes('주관식');

    return (
		<>
		<div className='row' style={{backgroundColor: 'white' , paddingBottom: '90px'}}>
			<div className={`project-grid ${projectStyle}`}>	
				<span className="subtitle">{portfolio.category}</span>
				<h3 className="title"> {portfolio.title}</h3>
			</div>

			{ !isShortAnswer ? (
				<>
					<div className='col-md-6'>
						<StatisticBar />
					</div>
					<div className='col-md-6'>
						<StatisticPie />
					</div>
				</>
			) : (
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

export default StatisticBySection;
