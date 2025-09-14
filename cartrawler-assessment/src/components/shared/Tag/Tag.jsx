import "./Tag.css";

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
