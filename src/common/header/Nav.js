import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { FaAngleDown, FaUser } from "react-icons/fa";


const Nav = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);  // 로그인 여부 state
    const [username, setUsername] = useState('(닉네임)');

    const handleLogout = () => {
        // 로그아웃 버튼 클릭 시 로그아웃 처리 로직 작성
        setIsLoggedIn(false);
        setUsername('(닉네임)');
    }

    const renderUsername = () => {
        if (username) {
            // return username;
            return '정연';
        }
        return '(닉네임)';
    }

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


    return (
        <nav className="mainmenu-nav">
            <ul className="mainmenu">
                {/*<li><Link to={process.env.PUBLIC_URL + "/contact"}>내가 생성한 설문</Link></li>*/}
                {/*<li><Link to={process.env.PUBLIC_URL + "/contact"}>내가 참여한 설문</Link></li>*/}
                <li className="menu-item-has-children">
                    <a style={myPageStyle}>
                        <FaUser className="icon" style={iconStyle} />
                        <span style={textStyle}>
                            {renderUsername()} {/* 사용자 이름 렌더링 */}
                            <FaAngleDown className="arrow" style={arrowStyle} />
                        </span>
                    </a>
                    <ul className="axil-submenu">
                        {isLoggedIn ?
                            (
                                <>
                                    <li><Link to={process.env.PUBLIC_URL + "/contact"}>마이페이지</Link></li>
                                    <li><Link to={process.env.PUBLIC_URL + "/contact"}>내가 생성한 설문</Link></li>
                                    <li><Link to={process.env.PUBLIC_URL + "/contact"}>내가 참여한 설문</Link></li>
                                    <li><a onClick={handleLogout} className="axil-btn btn-fill-white">로그아웃</a></li>
                                </>
                            ) : (
                                <li><Link to={process.env.PUBLIC_URL + "/login"} className="axil-btn btn-fill-white">로그인/회원가입</Link></li>
                            )}
                    </ul>
                </li>
            </ul>
        </nav>
    )
}

export default Nav;