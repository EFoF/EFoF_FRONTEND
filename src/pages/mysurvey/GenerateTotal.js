import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import ReactPaginate from 'react-paginate';
import SurveyProp from "../../component/survey/SurveyProp";
import AllData from "../../data/GenerateData.json";
import {useNavigate, useParams} from "react-router-dom";
import {getGenerateSurvey} from "../../api/survey";
const GenerateTotal = () => {
    const { id } = useParams();


    const navigate = useNavigate();
    const [visibleItems, setVisibleItems] = useState([]);
    const [totalCount,setTotalCount] = useState(0);

    useEffect(() => {

        //데이터를 불러오는 함수 실행
        getGenerateSurvey(null, id-1)
            .then((data)=>
                {
                    if(data.empty||id===0||id===null){
                        navigate(`/form/generate/1`, { replace: true });
                    }
                    setTotalCount(data.totalPages);
                    setVisibleItems(data.content);
                }
            )
    }, [id]);




    const changePage = ({ selected }) => {
        navigate(`/form/generate/${selected+1}`, { replace: true });
    }

    useEffect(() => {
        setVisibleItems(AllData);
    }, [AllData]);

    return (
        <>
            <div className={`row row-15`}>
                {
                    visibleItems.map((data) => (
                <div className="col-xl-3 col-lg-4 col-md-6" key={data.id}>
                    <SurveyProp projectStyle="" survey={data} />
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

export default GenerateTotal;
