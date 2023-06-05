import React from 'react';
import styled from 'styled-components';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { useSelector } from 'react-redux';
import toastMsg from "../../ui/Toast";
import { authorizationClient } from '../../api';
import API from '../../api/config';
import ConfirmModal from '../../ui/ConfirmModal';
import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 20px;
`;

const ArrowButton = styled.button`
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: black;
  transition: 0.1s;

  &:hover {
    color: gray;
    transform: scale(1.1);
  }
`;

export default function SurveyHeader({ surveyId }) {

    const navigate = useNavigate();
    const { form, questions } = useSelector((state) => state.form);

    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        if (surveyId === undefined) {

            setModalOpen(true);

        } else {
            navigate(`/`);
        }

    };

    const closeModal = () => {
        setModalOpen(false);
    };


    function saveSurveyFromDataInit() {
        const surveyDto = createSurveyDto();

        return saveSurveyInit(surveyDto);
    }

    function saveSurveyFromData() {
        const surveyDto = createSurveyDto();

        return saveSurvey(surveyDto);
    }

    function createSurveyDto() {
        return {
            title: form.title,
            detail: form.detail,
            image: form.image,
            fontColor: form.fontColor,
            bgColor: form.bgColor,
            btColor: form.btColor,
            sections: questions,
        };
    }

    function saveSurvey(surveyDto) {
        if (surveyDto.title === '') {
            toastMsg("설문 제목을 입력해주세요.", false);
            return;
        }

        return authorizationClient.post(
            `${API.SURVEY}`, surveyDto
        )
            .then(response => {
                navigate(`/form/${response.data}/setting`);
                typeof (response) !== 'undefined' ?
                    toastMsg("설문생성 성공", true) : toastMsg("설문생성 실패", false);
            })
            .catch(error => {
                // alert(error);
                // console.log("설문생성 실패" + error);
                toastMsg("설문생성 실패", false);
            });
    }

    function saveSurveyInit(surveyDto) {
        return authorizationClient.post(
            `${API.SURVEY}`, surveyDto
        )
            .then(response => {

                navigate(`/`);
                typeof (response) !== 'undefined' ?
                    toastMsg("설문생성 성공", true) : toastMsg("설문생성 실패", false);
                // 여기서 홈으로 리다이렉트 시킬지 고민 중
            })
            .catch(error => {
                // alert(error);
                // console.log("설문생성 실패" + error);
                toastMsg("설문생성 실패", false);
            });
    }

    const handleSave = () => {

        const handleConfirm = () => {
            saveSurveyFromDataInit();

            ReactDOM.unmountComponentAtNode(document.getElementById("modal-root"));
        };

        const handleCancel = () => {
            // 취소 버튼 클릭 시 처리할 코드 작성
            navigate(`/`);
            ReactDOM.unmountComponentAtNode(document.getElementById("modal-root"));
        };

        const confirmModal = <ConfirmModal
            // message={"이 페이지를 나가시면 데이터가 저장되지 않습니다. \n\n저장하시겠습니까?"}
            message={"설문을 저장하시겠습니까? \n(저장하지 않을 시 해당 설문은 삭제됩니다.)"}
            onConfirm={handleConfirm} onCancel={handleCancel} />;

        ReactDOM.render(confirmModal, document.getElementById("modal-root"));
    };

    const handleConfirm = () => {
        saveSurveyFromDataInit();
        ReactDOM.unmountComponentAtNode(document.getElementById("modal-root"));

    };

    const handleCancel = () => {
        // 취소 버튼 클릭 시 처리할 코드 작성
        navigate(`/`);
        ReactDOM.unmountComponentAtNode(document.getElementById("modal-root"));
    };

    const handleLeftClick = () => {
        if (surveyId === undefined) {
            handleSave();
            // setModalOpen(true);

        } else {
            navigate(`/`);
        }
    };

    const handleRightClick = () => {
        if (surveyId === undefined) {
            saveSurveyFromData();
        } else {
            navigate(`/form/${surveyId}/setting`);
        }
    };

    return (
        <HeaderWrapper>
            {/* <ArrowButton onClick={handleLeftClick}>
                <FaArrowLeft size="2rem" />
            </ArrowButton> */}

            <ArrowButton onClick={openModal}>
                <FaArrowLeft size="2rem" />
            </ArrowButton>



            <Modal show={modalOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>저장하시겠습니까?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            저장하지 않으면 해당 설문은 삭제 됩니다.
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleConfirm}>
                        저장
                    </Button>
                    <Button variant="primary" onClick={handleCancel}>
                        저장하지 않음
                    </Button>
                </Modal.Footer>
            </Modal>


            <ArrowButton onClick={handleRightClick}>
                <FaArrowRight size="2rem" />
            </ArrowButton>
        </HeaderWrapper>
    );
}
