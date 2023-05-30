import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import ReactPaginate from 'react-paginate';
import SurveyProp from "../../component/survey/SurveyProp";
import AllData from "../../data/GenerateOver.json";
import { useParams } from "react-router-dom";

const GenerateOver = () => {
    const id = useParams();
    alert(JSON.stringify(id));

    const [visibleItems, setVisibleItems] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const projectPerPage = 12;
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
            <div className="col-xl-3 col-lg-4 col-md-6" key={data.id}>
                <SurveyProp projectStyle="" survey={data} />
            </div>
        ))

    const pageCount = Math.ceil(visibleItems.length / projectPerPage)

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }

    useEffect(() => {
        setVisibleItems(AllData);
    }, [AllData]);

    return (
        <>
            <div className={`row row-15`}>
                {displayProjects}
            </div>
            <ReactPaginate
                previousLabel={<FaArrowLeft />}
                nextLabel={<FaArrowRight />}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"pagination"}
                previousLinkClassName={"prev"}
                nextLinkClassName={"next"}
                disabledClassName={"disabled"}
                activeClassName={"current"}
            />
        </>
    )
}

export default GenerateOver;
