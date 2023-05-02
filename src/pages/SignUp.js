import React, {useState} from "react";
import { Link } from "react-router-dom";

const SignUp = ({isLoggedIn, setIsLoggedIn}) => {

    const handleHomeButtonClick = () => {
        setIsLoggedIn(!isLoggedIn);
    };

    return (
        <div>
            <p>Sign Up</p>
            <Link 
                to="/" 
                onClick={handleHomeButtonClick} 
                isLoggedIn = {isLoggedIn}
                className="axil-btn btn-fill-primary"
            >
                Sign in(홈으로 돌아가기)
            </Link>
            {/* <button onClick={() => window.location.href = "/"}>
                Sign in(홈으로 돌아가기)
            </button> */}
        </div>
    )
}

export default SignUp;