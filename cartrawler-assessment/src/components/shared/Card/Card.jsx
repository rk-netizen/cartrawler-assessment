import "./Card.css";

const Card = ({ children, className = "", style, ...rest }) => {
    return (
        <div className={`ct-card ${className}`.trim()} style={style} {...rest}>
            {children}
        </div>
    );
};

export default Card;
