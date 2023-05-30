import React from 'react';
import { Link } from 'react-router-dom';
import { slugify } from '../../utils';


const SurveyProp = ({projectStyle, survey}) => {
    const imageStyle = {
        width: '610px',
        height: '230px',
    };

    const getDDays = () => {
        const { surveyStatus, expire_date } = survey;
        const expireDate = new Date(expire_date);
        const currentDate = new Date();

        // 만료 날짜의 시간과 분을 0으로 설정하여 날짜만 비교
        expireDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);

        const oneDay = 24 * 60 * 60 * 1000; // 1일을 밀리초로 표현

        const daysDiff = Math.ceil((currentDate - expireDate) / oneDay);

        let dDay = "D-??";
        if (daysDiff === 0) {
            dDay = "D-Day";
        } else if (surveyStatus === "progress") {
            dDay = `D${daysDiff}`;
        } else if (surveyStatus === "over") {
            dDay = `D+${daysDiff}`;
        }

        return dDay;
    };

    const getStatus = () => {
        const { surveyStatus } = survey;

        if (surveyStatus === "prerelease") {
            return "설문 배포 전";
        } else if (surveyStatus === "progress") {
            return "설문 진행 중";
        } else if (surveyStatus === "over") {
            return "설문 마감";
        }
    };

    return (
        <>
            <div className={`project-grid ${projectStyle}`}>
                <div className="thumbnail">
                    <Link to={process.env.PUBLIC_URL + `/form-details/${slugify(survey.title)}`}>
                        <img src={process.env.PUBLIC_URL + survey.s_imageurl} alt="icon" style={imageStyle}/>
                    </Link>
                </div>
                <div className="content">
                    <div className="tag" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                        <span className="subtitle" style={{marginRight: 'auto'}}>
                            <span>{getStatus()}</span>
                        </span>
                        <span style={{marginLeft: 'auto'}}>{getDDays()}</span>
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