import React, {useState, useEffect} from 'react';
import SurveyProp from './SurveyProp';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import ReactPaginate from 'react-paginate';


const ShowSurvey = ({parentClass, colSize, columnGap, AllData, filters, perPageShow}) => {

    const [getAllItems] = useState(AllData);
    const [activeFilter, setActiveFilter] = useState("");
    const [visibleItems, setVisibleItems] = useState([]);

    const [pageNumber, setPageNumber] = useState(0);

    const projectPerPage = perPageShow ? perPageShow : 12;
    const pageVisited = pageNumber * projectPerPage;

    // // Pageable에 맞게 추후 변경
    // const fetchData = async (page) => {
    //     try {
    //         const response = await axios.get(`/api/surveys?page=${page}`);
    //         const { data, totalPages } = response.data;
    //         setVisibleItems(data);
    //         setTotalPages(totalPages);
    //     } catch (error) {
    //         console.log('Error fetching data:', error);
    //     }
    // };

    const displayProjects = visibleItems.slice(pageVisited, pageVisited + projectPerPage)
        .map((data) => (
            <div className={colSize ? colSize : "col-md-6"} key={data.id}>
                <SurveyProp projectStyle="" survey={data}/>
            </div>
        ))

    const pageCount = Math.ceil(visibleItems.length / projectPerPage)

    const changePage = ({selected}) => {
        setPageNumber(selected);
    }

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
                let categories = element['surveyStatus'];

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
                        {displayProjects}
                    </div>
                    <ReactPaginate
                        previousLabel={<FaArrowLeft />}
                        nextLabel={<FaArrowRight />}
                        pageCount= {pageCount}
                        onPageChange={changePage}
                        containerClassName={"pagination"}
                        previousLinkClassName={"prev"}
                        nextLinkClassName={"next"}
                        disabledClassName={"disabled"}
                        activeClassName={"current"}
                    />
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

export default ShowSurvey;