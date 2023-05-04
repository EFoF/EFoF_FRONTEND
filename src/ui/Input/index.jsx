import React from "react";
import {
    InputProps,
    Container,
    LabelWrapper,
    InputWrapper,
    TextAreaWrapper,
} from "./index.styles";

function Input({
                   value,
                   type = "text",
                   label,
                   labelType = "default",
                   placeholder,
                   required = false,
                   size = 35,
                   color = "light",
                   className,
                   isValid = true,
                   isTextarea = false,
                   onChange,
               }) {
    return React.createElement(
        Container,
        {
            size: size,
            labelType: labelType,
            color: color,
            className: className,
            isValid: isValid,
            isTextarea: isTextarea,
        },
        React.createElement(LabelWrapper, null, label),
        isTextarea
            ? React.createElement(TextAreaWrapper, {
                value: value,
                name: label,
                placeholder: labelType === "hidden" ? label : placeholder,
                required: required,
                onChange: onChange,
            })
            : React.createElement(InputWrapper, {
                value: value,
                type: type,
                name: label,
                placeholder: labelType === "hidden" ? label : placeholder,
                required: required,
                onChange: onChange,
            })
    );
}
export default Input;
