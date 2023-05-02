import React from 'react';
import Logo from '../../elements/logo/Logo';
import StickyHeader from './StickyHeader';
// import { Link } from 'react-scroll';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useState } from 'react';

import { AnimationOnScroll } from 'react-animation-on-scroll';
import Map from '../../pages/Map';


const SplashHeader = ({isLoggedIn}) => {

    const sticky = StickyHeader(100);

    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    // const handleClick = () => {
    //     setIsLoggedIn(!isLoggedIn);
    // };
    
    return (
        <header className="header axil-header header-style-1 splash-header-style">
            <div className={`axil-mainmenu ${sticky ? "axil-sticky" : ""}`}>
                <div className="container">
                <div className="header-navbar">
                    <div className="header-logo">
                        <Logo limage="/images/logo.svg"
                            dimage="/images/logo-3.svg"
                            simage="/images/logo-2.svg"
                        />
                    </div>
                    <div className="header-main-nav">
                    {/* Start Mainmanu Nav */}
                    <nav className="mainmenu-nav">
                        <ul className="mainmenu">
                            {/* <li><a href="#splash-demo">Demo</a></li> */}
                            <li><a href="/project-grid-three">생성한설문</a></li>
                            <li><a href="/project-grid-three">참여한설문</a></li>
                            <li><a href="/about-us">About Us</a></li>
                            {/* <li><a href="https://new.axilthemes.com/docs/abstrak-react/">Documentation</a></li> */}
                            <li><a href="/mypage">MyPage</a></li>
                        </ul>
                    </nav>
                    {/* End Mainmanu Nav */}
                    </div>
                    <div className="header-action">
                        <ul className="list-unstyled">
                            <li className="buy-btn">
                                <Link 
                                    to="/signup" 
                                    className="axil-btn btn-fill-primary"
                                >
                                    {isLoggedIn ? '회원가입 / 로그인' : '마이페이지'}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                </div>
            </div>
        </header>

    )
}

export default SplashHeader;