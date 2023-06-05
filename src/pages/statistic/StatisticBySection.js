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


const StatisticBySection = ({projectStyle, portfolio, sectionId,data}) => {

	const isLongAnswer = data.question_type.includes("LONG_ANSWER");

	const option_typed = (data.question_type === "LONG_ANSWER") ? "주관식" : "객관식"
	
	// console.log(data);

    return (
		<>
		<div className='row' style={{backgroundColor: 'white' , paddingBottom: '90px'}}>
			<div className={`project-grid${projectStyle}`}>	
				<span className="subtitle">질문 {data.question_id} [{option_typed}] (응답자 수: {data.participant_num_question})</span>
				<h3 className="title"> {data.question_text}</h3>
			</div>

			{ !isLongAnswer ? (
				<>
					<div className='col-md-6'>
						<StatisticBar optionData = {data.choiceAnswerDtos}/>
					</div>
					<div className='col-md-6'>
						<StatisticPie optionData = {data.choiceAnswerDtos}/>
					</div>
				</>
			) : (
				<div className='col-md-12' style={{ paddingLeft: '20px', paddingRight: '20px', paddingTop: '-100px'}}>
					<div style={{
							overflow: 'auto', // 또는 overflow: 'auto'; (원래 scroll으로 했는데 auto가 더 나은 거 같음)
							height: '120px', // 컨테이너의 높이 설정
							// border: '1px solid #000' // 테두리 스타일 지정
							}}>
						{data.longAnswerDtos && data.longAnswerDtos.map((item, index) => (
						<p key={index}>{index+1}) {item.answer_sentence}</p>
					))}
					</div>
				</div>
			)}			
		</div>
		</>
    )
}

export default StatisticBySection;
