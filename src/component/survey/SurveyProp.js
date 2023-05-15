import React from 'react';
import { Link } from 'react-router-dom';
import { slugify } from '../../utils';


const SurveyProp = ({projectStyle, survey}) => {
    return (
        <>
            <div className={`project-grid ${projectStyle}`}>
                <div className="thumbnail">
                    <Link to={process.env.PUBLIC_URL + `/form-details/${slugify(survey.title)}`}>
                        <img src={process.env.PUBLIC_URL + survey.image} alt="icon" />
                    </Link>
                </div>
                <div className="content">
                    <div className="tag" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                        <span className="subtitle" style={{marginRight: 'auto'}}>
                            {survey.category.map((cat, i) => (
                                <span key={i}>{cat}</span>
                            ))}
                        </span>
                        <span style={{marginLeft: 'auto'}}>D-30</span>
                    </div>
                    <h4 className="title" style={{
                        display: 'block',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                    }}>
                        <Link to={process.env.PUBLIC_URL + `/form-details/${slugify(survey.title)}`}>
                            {survey.title}
                        </Link>
                    </h4>
                    <p style={{
                        display: 'block',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis'
                    }}>
                        {survey.description}
                    </p>
                    <Link to={process.env.PUBLIC_URL + `/statistic`} className="more-btn">
                        <img src="/images/icon/icon-31.png" alt="icon" style={{ display:"inline-flex", width: "30px", height: "30px", verticalAllign: "middle", marginRight: "10px"}} />
                        <span style={{verticalAlign: "middle" }}>통계 보러가기</span>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default SurveyProp;