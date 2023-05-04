import React from 'react';
import SplashData from "../../data/splash/SplashData.json";
import Slider from "react-slick";
import {Link} from "react-router-dom";
import {slugify} from "../../utils";
import Map from "../map/Map"

const DemoData = SplashData[0];

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

const BlogOne = () => {
    return (
        <div className="section splash-main-banner" id="splash-banner">

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
                            <Map />
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



            {/*<Map/>*/}
            <div className="demo-slider">
                <Slider {...slideSettings} className="slick-dot-nav">
                    {DemoData.slice(0, 5).map((data) => (
                        <div className="single-slide" key={data.id}>
                            <Link to={`${process.env.PUBLIC_URL}/${slugify(data.title)}`}>
                                <img src={`${process.env.PUBLIC_URL}${data.width_img}`} alt="Demo" />
                            </Link>
                        </div>
                    ))}
                </Slider>
            </div>

        </div>
    )
}

export default BlogOne;