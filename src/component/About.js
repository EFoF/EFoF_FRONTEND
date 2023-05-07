import React from 'react';
import SectionTitle from "../elements/section-title/SectionTitle";
import ServicePropOne from "./service/ServicePropOne";


const About = () => {
    return (
        <div className="section section-padding-2 bg-color-dark">
            <div className="container">
                <SectionTitle
                    subtitle="독수리 오남매의 설문 플랫폼: 독설"
                    title="독수리 설문에 대하여"
                    description=""
                    textAlignment="heading-light-left"
                    textColor=""
                />
                <div className='row'>
                    <ServicePropOne colSize="col-xl-4 col-md-6" serviceStyle="" itemShow="6" />
                </div>
            </div>
            <ul className="list-unstyled shape-group-10">
                <li className="shape shape-1"><img src={process.env.PUBLIC_URL + "/images/others/line-9.png"} alt="Circle" /></li>
                <li className="shape shape-2"><img src={process.env.PUBLIC_URL + "/images/others/bubble-42.png"} alt="Circle" /></li>
                <li className="shape shape-3"><img src={process.env.PUBLIC_URL + "/images/others/bubble-43.png"} alt="Circle" /></li>
            </ul>
        </div>
    )
}

export default About;