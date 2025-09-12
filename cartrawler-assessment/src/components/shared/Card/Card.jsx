import React from "react";
import "./Card.css";

/**
 * Card component
 * Provides a styled container for grouping content, using design system variables.
 * Accepts children and optional className for custom styling.
 */
const Card = ({ children, className = "", ...rest }) => {
    return (
        <div className={`ct-card ${className}`.trim()} {...rest}>
            {children}
        </div>
    );
};

export default Card;
