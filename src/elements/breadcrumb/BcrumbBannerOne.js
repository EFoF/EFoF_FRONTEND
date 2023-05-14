import React from 'react';

const BcrumbBannerOne = ({subtitle, title, paragraph}) => {
    return (
        <div className="breadcrum-area breadcrumb-banner">
            <div className="container">
                <div className="section-heading heading-left">
                    <div className="subtitle" dangerouslySetInnerHTML={{__html: subtitle}}></div>
                    <h1 className="title h2" dangerouslySetInnerHTML={{__html: title}}></h1>
                    <p dangerouslySetInnerHTML={{__html: paragraph}}></p>
                </div>
            </div>
            <ul className="shape-group-8 list-unstyled">
                <li className="shape shape-1">
                    <img src={process.env.PUBLIC_URL + "/images/others/bubble-9.png"} alt="Bubble" />
                </li>
                <li className="shape shape-2">
                    <img src={process.env.PUBLIC_URL + "/images/others/bubble-21.png"} alt="Bubble" />
                </li>
                <li className="shape shape-3">
                    <img src={process.env.PUBLIC_URL + "/images/others/line-4.png"} alt="Line" />
                </li>
            </ul>
        </div>
    )
}

export default BcrumbBannerOne;