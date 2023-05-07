import React from 'react';
import { Link } from 'react-router-dom';
import {Link as L} from "react-scroll";


const CtaLayout = () => {

    return (

        <div className="section call-to-action-area splash-call-to-action">
            <div className="container">
                <div className="call-to-action">
                    <div className="section-heading heading-light">
                        <span className="subtitle">DOKSEOL</span>
                        <h2 className="title">Let’s Survey !!</h2>
                        <p><L to="splash-banner" smooth={true} duration={500}>⬆️ 주변 설문 둘러보기 ⬆️</L></p><br/>

                        <Link to="/form">
                            <button className="axil-btn btn-fill-white">설문 생성하기</button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* 애니메이션 */}
            <ul className="list-unstyled shape-group-9">
                <li className="shape shape-1"><img src={process.env.PUBLIC_URL + "/images/others/bubble-12.png"} alt="Comments" /></li>
                <li className="shape shape-2"><img src={process.env.PUBLIC_URL + "/images/others/bubble-16.png"} alt="Comments" /></li>
                <li className="shape shape-3"><img src={process.env.PUBLIC_URL + "/images/others/bubble-13.png"} alt="Comments" /></li>
                <li className="shape shape-4"><img src={process.env.PUBLIC_URL + "/images/others/bubble-14.png"} alt="Comments" /></li>
                <li className="shape shape-5"><img src={process.env.PUBLIC_URL + "/images/others/bubble-16.png"} alt="Comments" /></li>
                <li className="shape shape-6"><img src={process.env.PUBLIC_URL + "/images/others/bubble-15.png"} alt="Comments" /></li>
                <li className="shape shape-7"><img src={process.env.PUBLIC_URL + "/images/others/bubble-16.png"} alt="Comments" /></li>
            </ul>
        </div>
    )

}

export default CtaLayout;