import React from 'react';
import { animateScroll as scroll } from 'react-scroll';
import Splash from '../../pages/Splash';
import SplashBanner from '../banner/SplashBanner';
import { Link as L } from 'react-scroll';
import { Link } from 'react-router-dom';


const SplashCta = () => {
    const handleClick = () => {
        const exampleElement = document.querySelector("#survey-slides");

        console.log(exampleElement);
        // scroll.scrollTo("#survey-slides", {
        //     duration: 500, 
        //     delay: 100, 
        //     smooth: true, 
        //     offset: -50, 
        // });
    };

    return (
        <div className="section call-to-action-area splash-call-to-action">
            <div className="container">
                <div className="call-to-action">
                    <div className="section-heading heading-light">
                        <h2 className="title">Let’s Start 설문하러가자! <br /> Your Business Today!</h2>
                        <p><L to="splash-banner" smooth={true} duration={500}>⬆️ 주변 설문 둘러보기 ⬆️</L></p><br/>
                        
                        {/* 버튼으로 바꾸기 */}
                        {/* <a target="_blank" rel="noopener noreferrer" href="#splash-demo" className="axil-btn btn-fill-white">설문하러 가기</a> */}

                        {/* 위 코드를 버튼으로 바꿈 */}
                        <Link to="/create-survey" smooth={true} duration={500}>
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

export default SplashCta;