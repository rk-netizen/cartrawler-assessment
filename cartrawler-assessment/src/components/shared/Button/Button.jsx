import React from "react";
import "./Button.css";

/**
 * Button component
 * Supports variants: primary, secondary, danger
 * Uses design system variables for color, font, and spacing.
 */
const Button = ({
    children,
    onClick,
    type = "button",
    className = "",
    variant = "primary",
}) => {
    return (
        <button
            className={`ct-button ct-button--${variant} ${className}`.trim()}
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

// need to install prop-types package if using PropTypes

// Button.propTypes = {
//     children: PropTypes.node.isRequired,
//     onClick: PropTypes.func,
//     type: PropTypes.string,
//     className: PropTypes.string,
//     variant: PropTypes.oneOf(["primary", "secondary", "danger"]),
// };

export default Button;
