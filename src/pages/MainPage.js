import React from 'react';
import Footer from '../common/Footer';
import Header from '../common/Header';
import SEO from '../common/SEO';
import Banner from '../component/Banner';
import Blog from '../component/Blog';
import CtaLayout from '../component/CtaLayout';
import ColorSwitcher from '../elements/switcher/ColorSwitcher';
import About from '../component/About';


const MainPage = () => {

    return (
        <>
        <SEO title="Digital Agency"/>
        <ColorSwitcher />
        <main className="main-wrapper">
            <Header />
            <Banner />
            <Blog />
            <About />
            <CtaLayout />
        <Footer CparentClass="" />
        </main>
        </>
    )
}

export default MainPage;

