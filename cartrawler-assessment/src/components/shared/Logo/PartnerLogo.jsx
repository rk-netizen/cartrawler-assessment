import React from "react";

import partner from "../../../assets/partner-logos/partner.svg";

/**
 * PartnerLogo component
 * @param {string} alt - The alt text for accessibility
 * @param {string} className - Additional class names
 */
const PartnerLogo = ({ alt = "Partner Logo", className = "", ...rest }) => {
    return (
        <img
            src={partner}
            alt={alt}
            className={`ct-partner-logo ${className}`.trim()}
            {...rest}
        />
    );
};

export default PartnerLogo;
