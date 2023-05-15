import React from 'react';
import Footer from '../../ui/common/Footer';
import Header from '../../ui/common/Header';
import BcrumbBannerOne from '../../elements/breadcrumb/BcrumbBannerOne';
import ColorSwitcher from '../../elements/switcher/ColorSwitcher';
import SEO from '../../ui/common/SEO';
import ShowSurvey from '../../component/survey/ShowSurvey';
import GenerateData from "../../data/GenerateData.json";

const filters = [
    {
        id: 1,
        label: "전체 설문",
    },
    {
        id: 2,
        label: "설문 배포 전",
    },
    {
        id: 3,
        label: "설문 진행 중",
    },
    {
        id: 4,
        label: "설문 마감",
    }
];

const Generate = () => {

    return (
        <>
            <SEO title="Project Four Column" />
            <ColorSwitcher />
            <main className="main-wrapper">
                <Header />
                <BcrumbBannerOne
                    subtitle="Generated Survey"
                    title="내가 생성한 설문"
                    paragraph =""
                />
                <ShowSurvey colSize="col-xl-3 col-lg-4 col-md-6" itemShow="12" columnGap="row-15" parentClass="project-column-4" AllData={GenerateData} filters={filters}/>
                <Footer parentClass="" />
            </main>
        </>
    )
}

export default Generate;