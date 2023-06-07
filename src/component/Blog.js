import React, {useRef, useState} from 'react';
import Slider from "react-slick";
import {Link} from "react-router-dom";
import {slugify} from "../utils";
import Map from "./map/Map";

<script type="text/javascript" src="react-slick"></script>

const Blog = () => {
    const [infos, setInfos] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef(null);
    const handleInfosUpdate = (updatedInfos) => {
        setInfos(updatedInfos);
    };
    const handleMarkerClick = (markerIndex, markerPosition, map) => {
        setCurrentIndex(markerIndex);

        if (sliderRef.current) {
            sliderRef.current.slickGoTo(markerIndex);
        }

        map.panTo(markerPosition);
    };


    var slideSettings = {
        infinite: true,
        speed: 500,
        autoplaySpeed: 2500,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        centerMode: true,
        arrows: false,
        dots: true,
        swipeToSlide: false, // 자동이동
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
            <br id="splash-banner1"></br>
            <div className="container">
                <div className="section-heading heading-left">
                    <div className="row align-items-center">
                        <div className="col-xl-6 col-lg-7">
                            <h2 className="title" id="splash-banner" style={{fontWeight:'bold'}}>주변에서 진행중인 설문에 참여해보세요!</h2>
                            <span>현재 위치 기준 반경 1km 안에서 가능한 설문 리스트를 보여줍니다.</span>
                        </div>
                        <div className="banner-thumbnail">
                            <br/>
                            <Map onInfosUpdate={handleInfosUpdate} onMarkerClick={handleMarkerClick}/>
                        </div>
                    </div>
                </div>
            </div>
            <div  id="Slider"><br/></div>
            <div className="demo-slider" style={{paddingTop: "20px"}}>
                <Slider {...slideSettings} className="slick-dot-nav" currentSlide={currentIndex} ref={sliderRef}>
                    {infos.slice(0, infos.length).map((data, index) => (
                        <div className="single-slide" key={`${data.loc.id}`} style={{width:"65rem"}}>
                            <Link to={`${process.env.PUBLIC_URL}/form/in-progress/${slugify(data.loc.id)}`}>
                                <div style={{textAlign: "center", width: "1000px"}}>
                                    {data.loc.simageURL ? (
                                        <img src={process.env.REACT_APP_S3_URL + data.loc.simageURL} alt="No Images" style={{ width: "553px", height: "357px" }} />
                                    ) :
                                        (
                                        <img src={process.env.REACT_APP_OPTION_DEFAULT_IMG} alt="No Images" style={{ width: "553px", height: "357px"  }} />
                                    )
                                    }
                                    <p style={{marginTop:'50px', color:'#0D6EFD', fontWeight:'bold', fontSize:'18px'}}>{data.loc.title}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default Blog;