import React from 'react';
import FooterOne from '../../ui/common/Footer';
import HeaderOne from '../../ui/common/Header';
import BcrumbBannerOne from '../../elements/breadcrumb/BcrumbBannerOne';
import ColorSwitcher from '../../elements/switcher/ColorSwitcher';
import SEO from '../../ui/common/SEO';
import CtaLayoutOne from '../../component/CtaLayout';
import GenerateSurvey from '../../component/survey/GenerateSurvey';


const Generate = () => {

    return (
        <>
            <SEO title="Project Four Column" />
            <ColorSwitcher />
            <main className="main-wrapper">
                <HeaderOne />
                <BcrumbBannerOne
                    title="내가 생성한 설문"
                    paragraph =""
                    styleClass=""
                    mainThumb="/images/banner/banner-thumb-1.png"
                />
                <GenerateSurvey colSize="col-xl-3 col-lg-4 col-md-6" itemShow="12" columnGap="row-15" parentClass="project-column-4"/>
                <CtaLayoutOne />
                <FooterOne parentClass="" />
            </main>
        </>
    )
}

export default Generate;