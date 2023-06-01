import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import ReactPaginate from 'react-paginate';
import SurveyProp from "../../component/survey/SurveyProp";
import {useNavigate, useParams} from "react-router-dom";
import {getGenerateSurvey} from "../../api/survey";

const GenerateOver = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [visibleItems, setVisibleItems] = useState([]);
    const [totalCount,setTotalCount] = useState(0);

    useEffect(() => {
        getGenerateSurvey('over', id-1)
            .then((data)=>
                {
                    if(data.empty||id===0||id===null){
                        navigate(`/form/generate/over/1`, { replace: true });
                    }
                    setTotalCount(data.totalPages);
                    setVisibleItems(data.content);
                }
            )
    }, [id]);

    const changePage = ({ selected }) => {
        navigate(`/form/generate/over/${selected+1}`, { replace: true });
    }

    return (
        <>
            <div className={`row row-15`}>
                {
                    visibleItems.map((data) => (
                        <div className="col-xl-3 col-lg-4 col-md-6" key={data.id}>
                            <SurveyProp projectStyle="" survey={data} label="generate"/>
                        </div>
                    ))}
            </div>
            <ReactPaginate
                previousLabel={<FaArrowLeft />}
                nextLabel={<FaArrowRight />}
                pageCount={totalCount}
                onPageChange={changePage}
                containerClassName={"pagination"}
                previousLinkClassName={"prev"}
                nextLinkClassName={"next"}
                disabledClassName={"disabled"}
                activeClassName={"current"}
                initialPage={id-1}
            />
        </>
    )
}

export default GenerateOver;
