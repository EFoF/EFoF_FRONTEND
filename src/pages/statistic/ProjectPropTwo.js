import React from 'react';
import { Link } from 'react-router-dom';
import { slugify } from '../../utils';


const ProjectPropTwo = ({projectStyle, portfolio}) => {
	
    return (
		<>
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
		</>
    )
}

export default ProjectPropTwo;