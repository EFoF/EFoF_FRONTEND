import React, {useEffect, useState} from 'react';
import Footer from '../../ui/common/Footer';
import Header from '../../ui/common/Header';
import BcrumbBannerOne from '../../elements/breadcrumb/BcrumbBannerOne';
import ColorSwitcher from '../../elements/switcher/ColorSwitcher';
import SEO from '../../ui/common/SEO';
import {Link, Outlet, useNavigate} from "react-router-dom";

const filters = [
    {
        id: 1,
        label: "전체 설문",
    },
    {
        id: 2,
        label: "제작 중",
    },
    {
        id: 3,
        label: "설문 배포 전",
    },
    {
        id: 4,
        label: "설문 진행 중",
    },
    {
        id: 5,
        label: "설문 마감",
    }
];

const Generate = () => {
    const [activeFilter, setActiveFilter] = useState("");
    const currentPath = window.location.pathname;
    const navigate = useNavigate();
    useEffect(() => {
        if (currentPath === `/form/generate`) {
            navigate(`/form/generate/1`, { replace: true });
        }
        setActiveFilter(filters[0].label);
    }, []);

    const handleChange = (filter) => {
        setActiveFilter(filter.label);
    };
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
                <div className={`section section-padding-2 project-column-4`}>
                    <div className="container">
                        <div className="isotope-button isotope-project-btn">
                            {filters.map((filter) => (
                                <button
                                    onClick={() => handleChange(filter)}
                                    className={
                                        filter.label === activeFilter ? 'is-checked link-button' : 'link-button'
                                    }
                                    key={filter.id}
                                >
                                    <Link
                                        to={`/form/generate${
                                            filter.label === '제작 중' 
                                                ? '/making' 
                                                : filter.label === '설문 배포 전' 
                                                    ? '/prerelease' 
                                                    : filter.label === '설문 진행 중' 
                                                        ? '/progress' 
                                                        : filter.label === '설문 마감' 
                                                            ? '/over' 
                                                            : ''
                                        }/1`}
                                        style={{textDecoration: 'none', color: 'inherit'}}
                                    >
                                        {filter.label}
                                    </Link>
                                </button>
                            ))}
                        </div>
                        <Outlet />
                    </div>
                    <ul className="shape-group-7 list-unstyled">
                        <li className="shape shape-1"><img src={process.env.PUBLIC_URL + "/images/others/circle-2.png"} alt="circle" /></li>
                        <li className="shape shape-2"><img src={process.env.PUBLIC_URL + "/images/others/bubble-2.png"} alt="Line" /></li>
                        <li className="shape shape-3"><img src={process.env.PUBLIC_URL + "/images/others/bubble-1.png"} alt="Line" /></li>
                    </ul>
                </div>
                <Footer parentClass="" />
            </main>
        </>
    )
}

export default Generate;