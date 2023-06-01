import React from 'react';
import Footer from '../ui/common/Footer';
import Header from '../ui/common/Header';
import SEO from '../ui/common/SEO';
import Banner from '../component/Banner';
import Blog from '../component/Blog';
import CtaLayout from '../component/CtaLayout';
import ColorSwitcher from '../elements/switcher/ColorSwitcher';
import About from '../component/About';


const MainPage = () => {

    return (
        <>
        <SEO title="Digital Agency"/>
        {/*<ColorSwitcher />*/}
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

