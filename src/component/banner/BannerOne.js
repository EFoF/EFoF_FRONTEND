import React from 'react';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import { Link } from 'react-router-dom';


const BannerOne = () => {
    return (
        <div className="banner banner-style-1">
            <div className="container">
                <div className="row align-items-end align-items-xl-start">
                    <div className="col-lg-6">
                        <div className="banner-content">
                            <AnimationOnScroll animateIn="fadeInUp" animateOnce={true} delay={100}>
                                <h1 className="title">안녕하세요.</h1>
                                <h1 className="title">독수리 설문입니다!</h1>
                                <span className="subtitle">독수리 설문을 통해<br/>더욱 편리한 설문 플랫폼을 경험해보세요 :)</span>
                                <Link to={process.env.PUBLIC_URL + "/contact"} className="axil-btn btn-fill-primary btn-large">설문 생성하기</Link>
                            </AnimationOnScroll>
                        </div>
                    </div>
                    {/*<div className="col-lg-6 col-xl-5">*/}
                    {/*    <div className="banner-form">*/}
                    {/*        <div className="contact-form-box shadow-box">*/}
                    {/*            <h3 className="title">Get a free Keystroke quote now</h3>*/}
                    {/*            <FormOne />*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
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

export default BannerOne;