import React from "react";

import icons from "./icons.js";

/**
 * Icon component
 * @param {string} name - The icon name (e.g. "angle-down", "bag")
 * @param {string} alt - The alt text for accessibility
 * @param {string} className - Additional class names
 */
const Icon = ({ name, alt = "", className = "", ...rest }) => {
    const src = icons[name];
    if (!src) return null;
    return (
        <img
            src={src}
            alt={alt || name}
            className={`ct-icon ${className}`.trim()}
            {...rest}
        />
    );
};

export default Icon;
