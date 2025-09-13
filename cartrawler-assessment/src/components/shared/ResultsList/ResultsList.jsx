import React from "react";
import Card from "../Card/Card";
import Tag from "../Tag/Tag";
import Button from "../Button/Button";
import VendorLogo from "../Logo/VendorLogo";
import "./ResultsList.css";

// Example item structure, adjust fields as per your PDF/design
const ResultsList = ({ items, onBook, onCardClick }) => {
    if (!items || items.length === 0) {
        return <div className="ct-resultslist__empty">No results found.</div>;
    }
    return (
        <div className="ct-resultslist">
            {items.map((item) => (
                <Card
                    key={item.id}
                    className="ct-resultslist__card"
                    onClick={onCardClick ? () => onCardClick(item) : undefined}
                    style={onCardClick ? { cursor: "pointer" } : undefined}
                    role={onCardClick ? "button" : undefined}
                    tabIndex={onCardClick ? 0 : undefined}
                    onKeyDown={
                        onCardClick
                            ? (e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                      e.preventDefault();
                                      onCardClick(item);
                                  }
                              }
                            : undefined
                    }
                >
                    <div
                        className="ct-resultslist__main"
                        tabIndex={onCardClick ? 0 : undefined}
                        role={onCardClick ? "button" : undefined}
                        style={onCardClick ? { cursor: "pointer" } : undefined}
                        onClick={
                            onCardClick ? () => onCardClick(item) : undefined
                        }
                        onKeyDown={
                            onCardClick
                                ? (e) => {
                                      if (e.key === "Enter" || e.key === " ") {
                                          e.preventDefault();
                                          onCardClick(item);
                                      }
                                  }
                                : undefined
                        }
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.75em",
                            }}
                        >
                            <VendorLogo
                                name={item.vendor}
                                alt={item.vendor}
                                style={{ height: 32, width: "auto" }}
                            />
                            <span className="ct-resultslist__title">
                                {item.name}
                            </span>
                        </div>
                        {item.pictureUrl && (
                            <div style={{ margin: "1em 0" }}>
                                <img
                                    src={item.pictureUrl}
                                    alt={item.name}
                                    style={{ maxWidth: 180, borderRadius: 8 }}
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
                    <div
                        className="ct-resultslist__actions"
                        role="group"
                        tabIndex={-1}
                        aria-label="Actions"
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <Button variant="primary" onClick={() => onBook(item)}>
                            Book
                        </Button>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default ResultsList;
