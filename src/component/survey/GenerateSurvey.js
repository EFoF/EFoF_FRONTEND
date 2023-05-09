import React, {useState, useEffect} from 'react';
import ProjectPropOne from './SurveyProp';
import SectionTitle from '../../elements/section-title/SectionTitle';
import GenerateData from '../../data/GenerateData';


const filters = [
    {
        id: 1,
        label: "전체 설문",
    },
    {
        id: 2,
        label: "설문 진행 중",
    },
    {
        id: 3,
        label: "설문 마감",
    }
];


const AllData = GenerateData;


const GenerateSurvey = ({parentClass, colSize, itemShow, columnGap}) => {

    const [getAllItems] = useState(AllData);
    const [visiableProject] = useState(itemShow ? itemShow : 6);
    const [activeFilter, setActiveFilter] = useState("");
    const [visibleItems, setVisibleItems] = useState([]);


    useEffect(() => {
        setActiveFilter(filters[0].label);
        setVisibleItems(getAllItems);
    }, []);

    const handleChange = (e) => {
        e.preventDefault();
        let target = e.target.textContent;

        setActiveFilter(target);

        let tempData = [];
        if (target === filters[0].label) {
            tempData = getAllItems;
        } else {
            for (let i = 0; i < getAllItems.length; i++) {
                const element = getAllItems[i];
                let categories = element['category'];

                if (categories.includes(target)) {
                    tempData.push(element)
                }
            }
        }
        setVisibleItems(tempData);
    };


    return (
        <>
            <div className={`section section-padding-2 ${parentClass ? parentClass : ""}`}>
                <div className="container">
                    <SectionTitle
                        subtitle="Generated Survey"
                        title="내가 생성한 설문"
                        textAlignment="heading-left mb--40"
                        textColor=""
                    />
                    <div className="isotope-button isotope-project-btn">

                        {filters.map((filter) => (
                            <button onClick={handleChange} className={
                                filter.label === activeFilter
                                    ? "is-checked"
                                    : " "
                            }
                                    key={filter.id}>{filter.label}</button>
                        ))}

                    </div>
                    <div className={`row ${columnGap ? columnGap : "row-35"}`}>
                        {visibleItems.map((data) => (
                            <div className={colSize ? colSize : "col-md-6"} key={data.id}>
                                <ProjectPropOne projectStyle="" portfolio={data}/>
                            </div>
                        ))}
                    </div>

                </div>
                <ul className="shape-group-7 list-unstyled">
                    <li className="shape shape-1"><img src={process.env.PUBLIC_URL + "/images/others/circle-2.png"} alt="circle" /></li>
                    <li className="shape shape-2"><img src={process.env.PUBLIC_URL + "/images/others/bubble-2.png"} alt="Line" /></li>
                    <li className="shape shape-3"><img src={process.env.PUBLIC_URL + "/images/others/bubble-1.png"} alt="Line" /></li>
                </ul>
            </div>
        </>
    )
}

export default GenerateSurvey;