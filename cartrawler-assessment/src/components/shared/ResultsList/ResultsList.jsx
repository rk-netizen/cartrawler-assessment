import React from "react";
import Card from "../Card/Card";
import Tag from "../Tag/Tag";
import VendorLogo from "../Logo/VendorLogo";
import "./ResultsList.css";

const ResultsList = ({ items, onCardClick }) => {
    if (!items || items.length === 0) {
        return <div className="ct-resultslist__empty">No results found.</div>;
    }

    // Handle keyboard accessibility for card click
    const handleCardKeyDown = (e, item) => {
        if (onCardClick && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            onCardClick(item);
        }
    };
    return (
        <div className="ct-resultslist">
            {items.map((item) => (
                <Card
                    key={item.id}
                    className={`ct-resultslist__card${
                        onCardClick ? " ct-resultslist__card--clickable" : ""
                    }`}
                    onClick={onCardClick ? () => onCardClick(item) : undefined}
                    role={"button"}
                    tabIndex={0}
                    onKeyDown={
                        onCardClick
                            ? (e) => handleCardKeyDown(e, item)
                            : undefined
                    }
                >
                    <div className="ct-resultslist__main">
                        <div className="ct-resultslist__header">
                            <VendorLogo
                                name={item.vendor}
                                alt={item.vendor}
                                className="ct-resultslist__vendorlogo"
                            />

                            <span className="ct-resultslist__title">
                                {item.name}
                            </span>
                        </div>
                        {item.pictureUrl && (
                            <div className="ct-resultslist__image-wrapper">
                                <img
                                    src={item.pictureUrl}
                                    alt={item.name}
                                    className="ct-resultslist__image"
                                />
                            </div>
                        )}
                        <div className="ct-resultslist__desc">
                            <strong>Vendor:</strong> {item.vendor} <br />
                            <strong>Code:</strong> {item.code} <br />
                            <strong>Make/Model:</strong> {item?.makeModel}{" "}
                            <br />
                            <strong>Transmission:</strong> {item.transmission}{" "}
                            <br />
                            <strong>Fuel Type:</strong> {item.fuel} <br />
                            <strong>Air Conditioning:</strong> {item.aircon}{" "}
                            <br />
                            <strong>Passenger Quantity:</strong>{" "}
                            {item.passengerQty} <br />
                            <strong>Baggage Quantity:</strong> {item.baggageQty}{" "}
                            <br />
                            <strong>Door Count:</strong> {item.doorCount} <br />
                            <strong>Drive Type:</strong> {item.driveType} <br />
                            <strong>Price:</strong> {item.price} {item.currency}
                        </div>
                        <div className="ct-resultslist__tags">
                            {item.tags?.map((tag) => (
                                <Tag
                                    key={tag.label + tag.variant}
                                    variant={tag.variant}
                                >
                                    {tag.label}
                                </Tag>
                            ))}
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default ResultsList;
