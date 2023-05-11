import React from 'react';
import { Link } from 'react-router-dom';
import { slugify } from '../../utils';


const SurveyProp = ({projectStyle, survey}) => {

    return (
        <>
            <div className={`project-grid ${projectStyle}`}>
                <div className="thumbnail">
                    <Link to={process.env.PUBLIC_URL + `/project-details/${slugify(survey.title)}`}>
                        <img src={process.env.PUBLIC_URL + survey.image} alt="icon" />
                    </Link>
                </div>
                <div className="content">
                    <h4 className="title">
                        <Link to={process.env.PUBLIC_URL + `/project-details/${slugify(survey.title)}`}>
                            {survey.title}
                        </Link>
                    </h4>
                    <span className="subtitle">
					{survey.category.map((cat, i) => (
                        <span key={i}>{cat}</span>
                    ))}
				</span>
                </div>
            </div>
        </>
    )
}

export default SurveyProp;