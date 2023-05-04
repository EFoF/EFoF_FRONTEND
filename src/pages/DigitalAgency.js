import React from 'react';
import FooterOne from '../common/footer/FooterOne';
import HeaderOne from '../common/header/HeaderOne';
import SEO from '../common/SEO';
import BannerOne from '../component/banner/BannerOne';
import BlogOne from '../component/blog/BlogOne';
import CtaLayoutOne from '../component/cta/CtaLayoutOne';
import ColorSwitcher from '../elements/switcher/ColorSwitcher';
import AboutOne from '../component/about/AboutOne';


const DigitalAgency = () => {

    return (
        <>
        <SEO title="Digital Agency"/>
        <ColorSwitcher />
        <main className="main-wrapper">
            <HeaderOne />
            <BannerOne />
            <BlogOne />
            <AboutOne />
            <CtaLayoutOne />
        <FooterOne CparentClass="" />
        </main>
        </>
    )
}

export default DigitalAgency;

