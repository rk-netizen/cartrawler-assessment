import React from "react";
import "./Tag.css";

/**
 * Tag component
 * Displays a label or status, using design system variables.
 * Supports variants for different colors (e.g., primary, secondary, danger).
 */
const Tag = ({ children, variant = "primary", className = "", ...rest }) => {
    return (
        <span
            className={`ct-tag ct-tag--${variant} ${className}`.trim()}
            {...rest}
        >
            {children}
        </span>
    );
};

export default Tag;
