import React, {useRef, useState} from 'react';
import Slider from "react-slick";
import {Link} from "react-router-dom";
import {slugify} from "../utils";
import Map from "./map/Map";
import {GoogleMap, InfoWindow} from "@react-google-maps/api";

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
            // sliderRef.current.slick('slickGoTo',markerIndex);
        }

        // const sliderElement = document.getElementById("Slider");
        // if (sliderElement) {
        //     sliderElement.scrollIntoView({behavior: "smooth"});
        // }

        // map.setCenter(markerPosition);
        map.panTo(markerPosition);

        const markerData = infos[markerIndex];
        const infoWindow = new window.google.maps.InfoWindow(
            // {
            //             //     content: markerData.loc.title
            //             // }
        );
        infoWindow.setContent(markerData.loc.title);
        infoWindow.open(map, markerPosition
        //     {
        //     anchor: markerPosition,
        //     map: map
        // }
        );

        // window.google.maps.event.addListener(markerPosition, "click", () => {
        //     const infowindow = new window.google.maps.InfoWindow();
        //     infowindow.setContent(`<div class="ui header">Parliment Hill</div>`);
        //     infowindow.open(map, markerPosition);
        // });
    };


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

    console.log("infos1 : ", infos);

    return (
        <div className="section splash-main-banner" style={{width: "100%", height: "100%"}}>
            <br id="splash-banner1"></br>
            <div className="container">
                <div className="section-heading heading-left">
                    <div className="row align-items-center">
                        <div className="col-xl-6 col-lg-7">
                            <h2 className="title" id="splash-banner">Watch your location</h2>
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
            <div className="demo-slider" style={{paddingTop: "200px"}}>
                <Slider {...slideSettings} className="slick-dot-nav" currentSlide={currentIndex} ref={sliderRef}>
                    {infos.slice(0, infos.length).map((data, index) => (
                        <div className="single-slide" key={`${data.loc.id}`} style={{width:"65rem"}}>
                            <Link to={`${process.env.PUBLIC_URL}/form/in-progress/${slugify(data.loc.id)}`}>
                                <div style={{textAlign: "center"}}>
                                    <img src={`${data.loc.simageURL}`} alt="No Images"
                                         style={{width: "35%", height: "auto"}}/>
                                    <p>{data.loc.title}</p>
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