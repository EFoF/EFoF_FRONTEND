import React from 'react';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import { Link, useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux";
import toastMsg from "../ui/Toast";



const Banner = () => {
    const navigate = useNavigate();
    const { loginLastDTO } = useSelector((state) => state.authorization);
    const handleClick = () => {
        const expiresDate = typeof(loginLastDTO.expiresAt) === "undefined" ?
            new Date : new Date(loginLastDTO.expiresAt);
        const currentDate = new Date();
        if(currentDate >= expiresDate) {
            // 로그인이 안되었거나 만료된 상태. 버튼을 막아야 한다.
            // ReIssue는 이 버튼이 존재하는 상위 컴포넌트에서 수행해주니 여기서는 처리해줄 필요 없다.
            toastMsg("로그인이 필요합니다.", false);
            return;
        } else {
            navigate("/form");
        }
    }

    return (
        <div className="banner banner-style-1">
            <div className="container">
                <div className="row align-items-end align-items-xl-start">
                    <div className="col-lg-6">
                        <div className="banner-content">
                            <AnimationOnScroll animateIn="fadeInUp" animateOnce={true} delay={100}>
                                <h1 className="title">안녕하세요.</h1>
                                <h1 className="title">독수리 설문입니다!</h1>
                                <br/>
                                <span className="subtitle">독수리 설문을 통해<br/>더욱 편리한 설문 플랫폼을 경험해보세요 :)</span>
                                <button onClick={handleClick} className="axil-btn btn-fill-primary btn-large">설문 생성하기</button>
                            </AnimationOnScroll>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="banner-thumbnail">
                            <AnimationOnScroll animateIn="zoomIn" duration={2} delay={300} animateOnce={true}>
                                <div className="large-thumb">
                                    <img src={process.env.PUBLIC_URL + "/images/banner/window.png"} alt="Laptop" />
                                </div>
                            </AnimationOnScroll>
                            <AnimationOnScroll animateIn="slideInRight" duration={2} delay={300} animateOnce={true}>
                            <div className="large-thumb-2">
                                <img src={process.env.PUBLIC_URL + "/images/banner/laptop-poses.png"} alt="Laptop" />
                            </div>
                            </AnimationOnScroll>
                            <ul className="list-unstyled shape-group">
                                <li className="shape shape-1">
                                    <AnimationOnScroll animateIn="slideInLeft" duration={1} delay={800} animateOnce={true}>
                                        <img src={process.env.PUBLIC_URL + "/images/banner/chat-group.png"} alt="chat" />
                                    </AnimationOnScroll>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner;