import { useParams, useNavigate } from "react-router-dom";
import CarDetails from "./CarDetails";

// Wrapper to extract carId from params and find the car
export default function CarDetailsWrapper({ cars, loading, error }) {
    const { carId } = useParams();
    const navigate = useNavigate();
    if (loading) return <div>Loading...</div>;
    if (error) return <div style={{ color: "red" }}>{error}</div>;
    const car = cars.find((c) => c.id === carId);
    if (!car) return <div>Car not found.</div>;
    return (
        <div>
            <button style={{ margin: "1em 0" }} onClick={() => navigate(-1)}>
                &larr; Back
            </button>
            <CarDetails car={car} />
        </div>
    );
}
