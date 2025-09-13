// Helper: Sort cars by price (asc/desc)
function sortCars(cars, sortBy) {
    if (!Array.isArray(cars)) return [];
    const sorted = [...cars];
    if (sortBy === "price-asc") {
        sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
        sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
}
import { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useParams,
    useNavigate,
} from "react-router-dom";
import ResultsList from "./components/shared/ResultsList/ResultsList.jsx";
import CarDetails from "./components/pages/CarDetails.jsx";

// Helper: Map API data to car objects
function mapApiToCars(data) {
    console.log("DEBUG raw data:", data);
    // If data is an array, use the first element (as in the API)
    if (Array.isArray(data)) {
        data = data[0];
    }
    const cars = [];
    const vehicleVendorAvails = data?.VehAvailRSCore?.VehVendorAvails;
    if (!vehicleVendorAvails) return cars;
    for (const vendor of vehicleVendorAvails) {
        const vendorName = vendor.Vendor?.["@Name"] || "";
        const vendorCode = vendor.Vendor?.["@Code"] || "";
        for (const veh of vendor.VehAvails || []) {
            const makeModel = veh.Vehicle?.VehMakeModel?.["@Name"] || "";
            cars.push({
                id: `${vendorCode || "vendor"}_${
                    veh.Vehicle?.["@Code"] || Math.random()
                }`,
                vendor: vendorName,
                vendorCode,
                name: makeModel,
                code: veh.Vehicle?.["@Code"] || "",
                transmission: veh.Vehicle?.["@TransmissionType"] || "",
                fuel: veh.Vehicle?.["@FuelType"] || "",
                driveType: veh.Vehicle?.["@DriveType"] || "",
                aircon:
                    veh.Vehicle?.["@AirConditionInd"] === "true" ? "Yes" : "No",
                passengerQty: veh.Vehicle?.["@PassengerQuantity"] || "",
                baggageQty: veh.Vehicle?.["@BaggageQuantity"] || "",
                doorCount: veh.Vehicle?.["@DoorCount"] || "",
                makeModel,
                price: veh.TotalCharge?.["@RateTotalAmount"]
                    ? parseFloat(veh.TotalCharge["@RateTotalAmount"])
                    : 0,
                currency: veh.TotalCharge?.["@CurrencyCode"] || "",
                pictureUrl: veh.Vehicle?.PictureURL || "",
                tags: [
                    { label: vendorName, variant: "primary" },
                    {
                        label: veh.Vehicle?.["@TransmissionType"] || "",
                        variant: "secondary",
                    },
                ],
            });
        }
    }
    return cars;
}

function App() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState("price-asc");

    const [legend, setLegend] = useState("");
    useEffect(() => {
        fetch("https://ajaxgeo.cartrawler.com/ctabe/cars.json")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch cars");
                return res.json();
            })
            .then((data) => {
                // Extract legend info
                let legendStr = "";
                let d = Array.isArray(data) ? data[0] : data;
                const rentalCore = d?.VehAvailRSCore?.VehRentalCore;
                if (rentalCore) {
                    const pickLoc = rentalCore.PickUpLocation?.["@Name"] || "";
                    const pickTime = rentalCore["@PickUpDateTime"] || "";
                    const retTime = rentalCore["@ReturnDateTime"] || "";
                    legendStr = `${pickLoc} | Pickup: ${pickTime} | Return: ${retTime}`;
                }
                setLegend(legendStr);
                const mappedCars = mapApiToCars(data);
                console.log("DEBUG mappedCars:", mappedCars);
                setCars(sortCars(mappedCars, "price-asc"));
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const handleBook = (item) => {
        alert(`Book: ${item.title}`);
    };

    const sortedCars = sortCars(cars, sortBy);

    // Routing logic
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <main
                            style={{
                                maxWidth: 800,
                                margin: "2em auto",
                                padding: "1em",
                            }}
                        >
                            {legend && (
                                <div
                                    style={{
                                        marginBottom: "1.5em",
                                        padding: "0.75em 1em",
                                        background: "#f4f6fb",
                                        borderRadius: 8,
                                        fontWeight: 500,
                                        fontSize: "1.1em",
                                        color: "#343a40",
                                    }}
                                >
                                    {legend}
                                </div>
                            )}
                            <div
                                style={{
                                    marginBottom: "1em",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "1em",
                                }}
                            >
                                <label htmlFor="sort-cars">Sort by:</label>
                                <select
                                    id="sort-cars"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    style={{
                                        padding: "0.5em",
                                        fontSize: "1em",
                                    }}
                                >
                                    <option value="price-asc">
                                        Price (Low to High)
                                    </option>
                                    <option value="price-desc">
                                        Price (High to Low)
                                    </option>
                                    {/* <option value="vendor-asc">
                                        Vendor (A-Z)
                                    </option> */}
                                </select>
                            </div>
                            {loading && <div>Loading...</div>}
                            {error && (
                                <div style={{ color: "red" }}>{error}</div>
                            )}
                            {!loading && !error && (
                                <ResultsList
                                    items={sortedCars}
                                    onBook={handleBook}
                                    onCardClick={(car) => {
                                        window.location.href = `/car/${encodeURIComponent(
                                            car.id
                                        )}`;
                                    }}
                                />
                            )}
                        </main>
                    }
                />
                <Route
                    path="/car/:carId"
                    element={
                        <CarDetailsWrapper
                            cars={cars}
                            loading={loading}
                            error={error}
                        />
                    }
                />
            </Routes>
        </Router>
    );
}

// Wrapper to extract carId from params and find the car
function CarDetailsWrapper({ cars, loading, error }) {
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

export default App;
