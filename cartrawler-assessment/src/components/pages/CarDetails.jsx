import React from "react";

// CarDetails page: receives car data via props or context (to be wired up in App.jsx)
const CarDetails = ({ car }) => {
    if (!car) {
        return <div>Car not found.</div>;
    }
    return (
        <div style={{ maxWidth: 600, margin: "2em auto", padding: "1em" }}>
            <h2>{car.name}</h2>
            <p>
                <strong>Vendor:</strong> {car.vendor}
            </p>
            <p>
                <strong>Code:</strong> {car.code}
            </p>
            <p>
                <strong>Drive Type:</strong> {car.driveType}
            </p>
            <p>
                <strong>Transmission:</strong> {car.transmission}
            </p>
            <p>
                <strong>Fuel Type:</strong> {car.fuel}
            </p>
            <p>
                <strong>Air Conditioning:</strong> {car.aircon}
            </p>
            <p>
                <strong>Passenger Quantity:</strong> {car.passengerQty}
            </p>
            <p>
                <strong>Baggage Quantity:</strong> {car.baggageQty}
            </p>
            <p>
                <strong>Door Count:</strong> {car.doorCount}
            </p>
            <p>
                <strong>Make/Model:</strong> {car.makeModel}
            </p>
            <p>
                <strong>Price:</strong> {car.price} {car.currency}
            </p>
        </div>
    );
};

export default CarDetails;
