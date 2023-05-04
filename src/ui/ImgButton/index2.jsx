import React from "react";
import {Wrapper, Logo, NoneImg, StyledP} from "./index.styles2";
import styled from "styled-components";
import {Link} from "react-router-dom";

//현종 추가
const StyledLink = styled(Link)`
  color: black;
`;
const LoginButton = ({
                         href = null,
                         ImgSrc = null,
                         title = "",
                         className = "",
                         color = "",
                         size = 3,
                         onClick = null,
                     }) => {
    const handleClick = (event) => {
        event.preventDefault();
        if (onClick) {
            onClick(event);
        }
    };

    return (
        <Wrapper
            // as={href ? "a" : "button"}
            as={href ? StyledLink : "button"}
            href={href}
            className={className}
            color={color}
            onClick={handleClick}
        >
            {ImgSrc ? (
                <Logo src={ImgSrc} alt={title} size={size} />
            ) : (
                <NoneImg size={size} />
            )}
            <StyledP>{title}</StyledP>
        </Wrapper>
    );
};

export default LoginButton;