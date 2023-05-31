import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getParticipateSurvey} from "../../api/survey";
import SurveyProp from "../../component/survey/SurveyProp";
import ReactPaginate from "react-paginate";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";

const ParticipateProgress = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [visibleItems, setVisibleItems] = useState([]);
    const [totalCount,setTotalCount] = useState(0);

    useEffect(() => {
        getParticipateSurvey('progress', id-1)
            .then((data)=>
                {
                    if(data.empty||id===0||id===null){
                        navigate(`/form/participate/progress/1`, { replace: true });
                    }
                    setTotalCount(data.totalPages);
                    setVisibleItems(data.content);
                }
            )
    }, [id]);

    const changePage = ({ selected }) => {
        navigate(`/form/participate/progress/${selected+1}`, { replace: true });
    }


    return (
        <>
            <div className={`row row-15`}>
                {
                    visibleItems.map((data) => (
                        <div className="col-xl-3 col-lg-4 col-md-6" key={data.id}>
                            <SurveyProp projectStyle="" survey={data}/>
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

export default ParticipateProgress;