import React from 'react';
import { Link } from 'react-router-dom';
import SplashFooter from '../common/footer/SplashFooter';
import SplashHeader from '../common/header/SplashHeader';
import SEO from '../common/SEO';
import SplashBanner from '../component/banner/SplashBanner';
import SplashCta from '../component/cta/SplashCta';
import ColorSwitcher from '../elements/switcher/ColorSwitcher';
import SplashData from '../data/splash/SplashData.json';
import { slugify } from '../utils';
import { FaAngleRight } from "react-icons/fa";
import { useState } from 'react';

// SplashBanner.js에서 가져옴
import TrackVisibility from 'react-on-screen';
import Slider from "react-slick";

// BannerFour.js에서 가져옴
import Tilty from 'react-tilty';

// google map import
import Map from './Map';

// DigitalAgency에서 가져옴
import BannerOne from '../component/banner/BannerOne';

const DemoData = SplashData[0]; // 이 Json 파일을 조절해서 카드 개수 조정
const FeatureData = SplashData[1];

// SplashBanner.js에서 가져온 변수
var slideSettings = {
    infinite: true,
    speed: 500,
    autoplaySpeed: 1500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    centerMode: true,
    arrows: false,
    dots: true,
    swipeToSlide: false,
    draggable: false,
    responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 1,
            variableWidth: false
          }
        }
    ]
}

const Splash = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <>
        <SEO title="Digital Creative Agency, Corporate and Portfolio React JS Template" />
        <ColorSwitcher />
            <main className="main-wrapper">
                <SplashHeader isLoggedIn={isLoggedIn} />
                <SplashBanner />

                <div className="section main-demo-area bg-color-light" id="splash-demo">
                    <div className="container">
                        <div className="section-heading heading-left">
                            <div className="row align-items-center">
                                <div className="col-xl-6 col-lg-7">
                                <h2 className="title">Watch your location</h2>
                                </div>
                                <div className="col-xl-4 col-lg-5 offset-xl-2">
                                {/* <p>현재 내 주변에서 진행 중인 설문을 지도를 통해 확인해보세요! 좀 짜치네.. 없애도 될 듯</p> */}
                                </div>

                                {/* img 대신 지도 넣기 */}
                                <div className="banner-thumbnail">
                                    {/* 이미지 div, 삭제예정 */}
                                    {/* <div className="large-thumb">
                                        <Tilty perspective={3000}>
                                            <img src={process.env.PUBLIC_URL + "/images/banner/banner-thumb-6.png"} alt="Shape" />
                                        </Tilty>
                                    </div> */}

                                    <div>
                                        <Map />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* 1개로 바꿔서 or 다른 카드 가져와서 여기에 지도 넣자 */}
                        {/* <div className="row">
                            {
                                DemoData.map((data) => (
                                <div className="col-md-6" key={data.id}>
                                    <div className="single-demo">
                                        <Link to={`${process.env.PUBLIC_URL}/${slugify(data.title)}`}>
                                            <span className="thumb">
                                                <img src={`${process.env.PUBLIC_URL}${data.height_img}`} alt={data.title} />
                                            </span>
                                            <h4 className="title">{data.title}</h4>
                                        </Link>
                                        
                                    </div>
                                </div>
                                ))
                            }

                        </div> */}
                    </div>

                    {/* 애니메이션 */}
                    <ul className="shape-group list-unstyled">
                        <li className="shape-1"><img src={process.env.PUBLIC_URL + "/images/others/bubble-35.png"} alt="Shape" /></li>
                        <li className="shape-2"><img src={process.env.PUBLIC_URL + "/images/others/line-4.png"} alt="Shape" /></li>
                    </ul>
                </div>

                <div className="section section-padding bg-color-dark splash-features" id="splsh-features">
                    <div className="container">
                        <div className="section-heading heading-light-left">
                            <div className="row align-items-center">
                                <div className="col-lg-6">
                                <h2 className="title">About <br/>DOKSEOL</h2>
                                </div>
                                <div className="col-lg-5 col-md-8">
                                <p>우리의 장점을 어필하는 공간 - 4개면 충분할 거 같다</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {
                                FeatureData.slice(0, 4).map((data) => (
                                    <div className="col-xl-4 col-md-6" key={data.id}>
                                        <div className="services-grid">
                                            <div className="thumbnail">
                                                <img src={process.env.PUBLIC_URL + data.icon} alt="icon" />
                                            </div>
                                            <div className="content">
                                                <h5 className="title" dangerouslySetInnerHTML={{__html: data.title}}></h5>
                                                <p>{data.para}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <ul className="list-unstyled shape-group-10">
                        <li className="shape shape-1"><img src={process.env.PUBLIC_URL + "/images/others/circle-1.png"} alt="Circle" /></li>
                        <li className="shape shape-2"><img src={process.env.PUBLIC_URL + "/images/others/line-3.png"} alt="Circle" /></li>
                        <li className="shape shape-3"><img src={process.env.PUBLIC_URL + "/images/others/bubble-5.png"} alt="Circle" /></li>
                    </ul>
                </div>

                {/* ============== 이거 나중에 참여 설문 카드로 사용하기 ==============*/}
                {/* <div className="section section-padding bg-color-light spalsh-why-choose" id="splash-why-choose">
                    <div className="container">

                        
                        <div className="section-heading heading-left">
                            <div className="row align-items-center">
                                <div className="col-xl-6 col-lg-7">
                                    <h2 className="title">참여 설문 카드 어때?</h2>
                                </div>
                                <div className="col-xl-4 col-lg-5 offset-xl-2">
                                    <p>Every template is built with such efforts that they are ready to meet all of our clients’ expectations.</p>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            {
                                FeatureData.slice(9, 12).map((data) => (
                                    <div className="col-xl-4 col-lg-6" key={data.id}>
                                        <div className="why-buy-box">
                                            <div className="heading">
                                                <div className="icon">
                                                    <img src={process.env.PUBLIC_URL + data.icon} alt="Thumb" />
                                                </div>
                                                <h5 className="title" dangerouslySetInnerHTML={{__html: data.title}}></h5>
                                            </div>
                                            <p>{data.para}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        <div className="row justify-content-center">
                            <div className="col-xl-4 col-lg-6">
                                <div className="support-box online-docuentation splash-hover-control">
                                    <a href="https://new.axilthemes.com/docs/abstrak-react/">
                                        <div className="inner">
                                            <div className="content">
                                                <div className="heading">
                                                <h4 className="title">좋아하는<br /> Documentation</h4>
                                                <div className="icon">
                                                    <img src={process.env.PUBLIC_URL + "/images/icon/icon-25.png"} alt="Thumb" />
                                                </div>
                                                </div>
                                                <p>가천대학교설문입니다description<br/>Well organized and up to date</p>
                                            </div>
                                            <div className="btn-area">
                                                <span className="item-btn"><FaAngleRight /></span>
                                            </div>
                                        </div>
                                        <ul className="shape-group list-unstyled">
                                            <li className="shape-1"><img src={process.env.PUBLIC_URL + "/images/others/bubble-34.png"} alt="Shape" /></li>
                                            <li className="shape-2"><img src={process.env.PUBLIC_URL + "/images/others/line-8.png"} alt="Shape" /></li>
                                        </ul>
                                    </a>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-6">
                                <div className="support-box support-ticket splash-hover-control">
                                    <a href="https://support.axilthemes.com/support/">
                                        <div className="inner">
                                        <div className="content">
                                            <div className="heading">
                                            <h4 className="title">Submit A <br /> Support Ticket</h4>
                                            <div className="icon">
                                                <img src={process.env.PUBLIC_URL + "/images/icon/icon-26.png"} alt="Thumb" />
                                            </div>
                                            </div>
                                            <p>We response within 1 Business day. weekends excluded.</p>
                                        </div>
                                        <div className="btn-area">
                                            <span className="item-btn"><FaAngleRight /></span>
                                        </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-6">
                                <div className="support-box support-ticket splash-hover-control">
                                    <a href="https://support.axilthemes.com/support/">
                                        <div className="inner">
                                        <div className="content">
                                            <div className="heading">
                                            <h4 className="title">Submit A <br /> Support Ticket</h4>
                                            <div className="icon">
                                                <img src={process.env.PUBLIC_URL + "/images/icon/icon-26.png"} alt="Thumb" />
                                            </div>
                                            </div>
                                            <p>We response within 1 Business day. weekends excluded.</p>
                                        </div>
                                        <div className="btn-area">
                                            <span className="item-btn"><FaAngleRight /></span>
                                        </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="line-shape">
                        <img src={process.env.PUBLIC_URL + "/images/others/line-6.png"} alt="Line" />
                    </div>
                </div> */}
                <SplashCta />
                <SplashFooter />
            </main>
        </>
    )
}

export default Splash;