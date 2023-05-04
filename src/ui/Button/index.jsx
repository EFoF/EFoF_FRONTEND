import React from "react";
import { Wrapper } from "./index.styles";

// export default function Button({
//   size = "medium",
//   buttonTheme = "primary",
//   title,
//   width,
//   className,
//   disabled = false,
//   onClick,
// }: ButtonProps) {

export default function Button({
  size = "medium",
  buttonTheme = "primary",
  title,
  // width,
  className,
  disabled = false,
  onClick,
}) {
  return (
    <Wrapper
      size={size}
      ButtonTheme={buttonTheme}
      onClick={onClick}
      disabled={disabled}
      // width={width}
      width={'30rem'}
      className={className}
    >
      {title}
    </Wrapper>
  );

  // return (
  //   //   eslint-disable-next-line @typescript-eslint/no-use-before-define
  //   <Wrapper
  //     size={size}
  //     ButtonTheme={buttonTheme}
  //     onClick={onClick}
  //     disabled={disabled}
  //     width={width!}
  //     className={className}
  //   >
  //     {title}
  //   </Wrapper>
  // );
}

// export default React.memo(Button);
