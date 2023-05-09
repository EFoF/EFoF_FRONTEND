import React from 'react';
import { Link } from 'react-router-dom';
import { slugify } from '../../utils';
import StatisticGraph from './StatisticGraph';


const SurveyInfo = ({projectStyle, portfolio}) => {
	
    return (
		<>
		{/* <div className='row'>
			<div className={`project-grid ${projectStyle}`}>
				<div className="thumbnail">
					<img src={process.env.PUBLIC_URL + portfolio.image} alt="icon" />
				</div>

				<div className="content">
					<span className="subtitle">
						{portfolio.category.map((cat, i) => (
							<span key={i}>{cat}</span>
						))}
					</span>
					<h3 className="title"> {portfolio.title}</h3>
				</div>
			</div>
			<StatisticGraph />
		</div> */}
		<div className='row'>
			<div className='col-md-6'>
				<div className={`project-grid ${projectStyle}`}>
					{/* <div className="thumbnail">
						<img src={process.env.PUBLIC_URL + portfolio.image} alt="icon" />
					</div> */}

					{/* <div className="content"> */}
						<span className="subtitle">
						{portfolio.category.map((cat, i) => (
							<span key={i}>{cat}</span>
						))}
						</span>
						<h3 className="title"> {portfolio.title}</h3>
					{/* </div> */}
				</div>
			</div>
			<div className='col-md-6'>
				<StatisticGraph />
			</div>
		</div>

			
		</>
    )
}

export default SurveyInfo;