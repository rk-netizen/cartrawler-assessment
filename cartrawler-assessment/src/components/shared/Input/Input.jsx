import React from "react";
import "./Input.css";

/**
 * Input component
 * Uses design system variables for color, font, and spacing.
 * Extend with props for type, placeholder, value, onChange, etc.
 */
const Input = ({
    type = "text",
    placeholder = "",
    value,
    onChange,
    className = "",
    ...rest
}) => {
    return (
        <input
            className={`ct-input ${className}`.trim()}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...rest}
        />
    );
};

export default Input;
