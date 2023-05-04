import React from "react";
import {Wrapper, Logo, NoneImg, StyledP} from "./index.styles";
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


// const LoginButton = ({
//                          href="",
//                          ImgSrc="none", // 좀 바꿔야함 조건식인데 일케 설정하면 안 되긴함.
//                          title="",
//                          className="",
//                          color="",
//                          size = 3,
//                          onClick,
//                      }) => {
//     return (
//         <Wrapper className={className} href={href} color={color} onClick={onClick}>
//             {ImgSrc === "none" ? (
//                 <NoneImg size={size} /> // LoginButton 컴포넌트의 반환값이 문자열이나 클래스/함수가 아니라 불리언 값인 것으로 판단됩니다.
//             ) : (
//                 <Logo src={ImgSrc} alt={title} size={size} />
//             )}
//             <StyledP>{title}</StyledP>
//         </Wrapper>
//     );
// };

export default LoginButton;

// export type SignupButtonProps = {
//   href?: string;
//   ImgSrc?: string;
//   size?: number;
//   title?: string;
//   className?: string;
//   color?: string;
//   onClick?: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
// };
//
// export default function LoginButton({
//   href,
//   ImgSrc,
//   title,
//   className,
//   color,
//   size = 3,
//   onClick,
// }: SignupButtonProps) {
//   return (
//     <Wrapper className={className} href={href} color={color} onClick={onClick}>
//       {ImgSrc === "none" ? (
//         <NoneImg size={size} />
//       ) : (
//         <Logo src={ImgSrc} alt={title} size={size} />
//       )}
//       <StyledP>{title}</StyledP>
//     </Wrapper>
//   );
// }
