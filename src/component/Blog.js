import React from 'react';
import BlogData from "../data/BlogData.json";
import Slider from "react-slick";
import {Link} from "react-router-dom";
import {slugify} from "../utils";
import Map from "./map/Map"

const DemoData = BlogData[0];

const Blog = () => {

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

    return (
        <div className="section splash-main-banner" style={{width: "100%", height: "100%"}}>
            <div className="container">
                <div className="section-heading heading-left">
                    <div className="row align-items-center">
                        <div className="col-xl-6 col-lg-7">
                            <h2 className="title" id="splash-banner">Watch your location</h2>
                        </div>
                        <div className="banner-thumbnail">
                            <Map />
                        </div>
                    </div>
                </div>
            </div>
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

export default Blog;