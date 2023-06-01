import React, {useState, useEffect} from 'react';
import Logo from '../../elements/logo/Logo';
import {Link, useNavigate} from 'react-router-dom';
import {FaAngleDown, FaUser} from "react-icons/fa";
import Cookies from "js-cookie";
import useLogin from "../../hooks/useLogin";
import axios from "axios";
import API from '../../api/config';
import {useDispatch, useSelector} from "react-redux";
import {authorizationActions} from "../../slices/authorization";

const Header = () => {
    const confirmCookie = Cookies.get("tokenPublishConfirm");
    const [loginState, setLoginState] = useState(false);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const {loginLastDTO} = useSelector((state) => state.authorization);

    const callReissue = () => {
        console.dir(loginLastDTO);
        const expiresDate = typeof (loginLastDTO.expiresAt) === "undefined" ?
            new Date : new Date(loginLastDTO.expiresAt);
        const currentDate = new Date();
        if (currentDate >= expiresDate) {
            console.log("ReIssue 시도")
            axios.post(`${API.REISSUE}`)
                .then(async response => {
                    await dispatch(authorizationActions.setLoginDTO(response.data));
                    setLoginState(true);
                    return true;
                })
                .catch(error => {
                    setLoginState(false);
                    console.log(error);
                });
        } else {
            setLoginState(true);
            return true;
        }
        return true;
    }
    //
    useEffect(() => {
        callReissue();
    }, [])


    const {useLogout} = useLogin();

    const myPageStyle = {
        display: 'flex',
        alignItems: 'center',
        fontSize: '16px',
        color: '#222',
        textDecoration: 'none'
    }

    const iconStyle = {
        marginRight: '5px'
    }

    const textStyle = {
        display: 'flex',
        alignItems: 'center'
    }

    const arrowStyle = {
        marginLeft: '5px'
    }

    const submenuStyle = {
        position: 'absolute',
        top: '100%',
        left: '0',
        right: '0',
        zIndex: '1',
        padding: '10px 0',
        backgroundColor: '#fff',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        borderRadius: '5px',
        minWidth: '200px',
        textAlign: 'left',
    };

    return (
        <>
            <header className="header axil-header header-style-1">
                <div className="axil-mainmenu">
                    <div className="container">
                        <div className="header-navbar">
                            <div className="header-logo">
                                <ul className="mainmenu">
                                    <li>
                                        <Link to={process.env.PUBLIC_URL + "/"}
                                              style={{fontWeight: 'bold', color:'blue'}}>DOKSEOL
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="header-main-nav">
                                <ul className="mainmenu">
                                    {loginState ? (
                                        <li style={{fontWeight:'bold'}}>{loginLastDTO.nickname}</li>
                                    ) : (
                                        <></>
                                    )}
                                    <li className="menu-item-has-children">
                                        {
                                            !loginState ?
                                                (
                                                    <>
                                                        <li><Link to="/login">로그인/회원가입</Link></li>
                                                    </>
                                                ) : (
                                                    <div style={{display: "flex", flexDirection: "row"}}>
                                                        <a style={myPageStyle}>
                                                            <FaUser className="icon" style={iconStyle}/>
                                                            <span style={textStyle}>
                                                            <FaAngleDown className="arrow" style={arrowStyle}/>
                                                </span>
                                                        </a>
                                                        <ul className="axil-submenu" style={submenuStyle}>
                                                            <>
                                                                {/*<li><Link to="/contact">마이페이지</Link></li>*/}
                                                                <li><Link to="/form/generate">내가 생성한 설문</Link></li>
                                                                <li><Link to="/form/participate">내가 참여한 설문</Link></li>
                                                                <li><a onClick={useLogout}
                                                                       className="axil-btn btn-fill-white">로그아웃</a></li>
                                                            </>
                                                        </ul>
                                                    </div>
                                                )}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;