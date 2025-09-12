import React from "react";

import alamo from "../../../assets/vendors/alamo.svg";
import avis from "../../../assets/vendors/avis.svg";
import hertz from "../../../assets/vendors/hertz.svg";

const logos = {
    alamo,
    avis,
    hertz,
};

/**
 * VendorLogo component
 * @param {string} name - The vendor name (alamo, avis, hertz)
 * @param {string} alt - The alt text for accessibility
 * @param {string} className - Additional class names
 */
const VendorLogo = ({ name, alt = "", className = "", ...rest }) => {
    const src = logos[name.toLowerCase()];
    if (!src) return null;
    return (
        <img
            src={src}
            alt={alt || name}
            className={`ct-vendor-logo ${className}`.trim()}
            {...rest}
        />
    );
};

export default VendorLogo;
