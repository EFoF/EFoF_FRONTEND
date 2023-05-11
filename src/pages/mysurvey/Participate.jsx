import React from 'react';
import FooterOne from '../../common/Footer';
import HeaderOne from '../../common/Header';
import BcrumbBannerOne from '../../elements/breadcrumb/BcrumbBannerOne';
import ColorSwitcher from '../../elements/switcher/ColorSwitcher';
import SEO from '../../common/SEO';
import ParticipateSurvey from '../../component/survey/ParticipateSurvey';


const Participate = () => {

    return (
        <>
            <SEO title="Project Four Column" />
            <ColorSwitcher />
            <main className="main-wrapper">
                <HeaderOne />
                <BcrumbBannerOne
                    subtitle="Participated Survey"
                    title="내가 참여한 설문"
                    paragraph =""
                    styleClass=""
                    mainThumb="/images/banner/banner-thumb-1.png"
                />
                <ParticipateSurvey colSize="col-xl-3 col-lg-4 col-md-6" itemShow="12" columnGap="row-15" parentClass="project-column-4"/>
                <FooterOne parentClass="" />
            </main>
        </>
    )
}

export default Participate;