import { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
    useParams,
} from "react-router-dom";
import "./App.css";
import ResultsList from "./components/shared/ResultsList/ResultsList";
import CarDetails from "./components/pages/CarDetails";

function App() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState("price-asc");

    useEffect(() => {
        fetch("https://ajaxgeo.cartrawler.com/ctabe/cars.json")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch cars");
                return res.json();
            })
            .then((data) => {
                const root = Array.isArray(data) ? data[0] : data;
                const cars = [];
                const core = root.VehAvailRSCore;
                if (core && Array.isArray(core.VehVendorAvails)) {
                    core.VehVendorAvails.forEach((vendorObj) => {
                        const vendorName =
                            vendorObj.Vendor?.["@Name"] || "Unknown Vendor";
                        if (Array.isArray(vendorObj.VehAvails)) {
                            vendorObj.VehAvails.forEach((veh) => {
                                let carName = veh.Vehicle?.["@Name"];
                                if (!carName || carName === "Unknown Car") {
                                    carName = `${vendorName} ${
                                        veh.Vehicle?.["@Code"] ||
                                        "No Name Available"
                                    }`;
                                }
                                cars.push({
                                    id: `${
                                        vendorObj.Vendor?.["@Code"] || "vendor"
                                    }_${
                                        veh.Vehicle?.["@Code"] || Math.random()
                                    }`,
                                    vendor: vendorName,
                                    name: carName,
                                    code: veh.Vehicle?.["@Code"] || "",
                                    acriss: veh.Vehicle?.["@AcrissCode"] || "",
                                    transmission:
                                        veh.Vehicle?.["@TransmissionType"] ||
                                        "",
                                    fuel: veh.Vehicle?.["@FuelType"] || "",
                                    aircon:
                                        veh.Vehicle?.["@AirConditionInd"] ===
                                        "true"
                                            ? "Yes"
                                            : "No",
                                    passengerQty:
                                        veh.Vehicle?.["@PassengerQuantity"] ||
                                        "",
                                    baggageQty:
                                        veh.Vehicle?.["@BaggageQuantity"] || "",
                                    doorCount:
                                        veh.Vehicle?.["@DoorCount"] || "",
                                    category: veh.Vehicle?.["@Category"] || "",
                                    price: veh.TotalCharge?.["@RateTotalAmount"]
                                        ? parseFloat(
                                              veh.TotalCharge[
                                                  "@RateTotalAmount"
                                              ]
                                          )
                                        : 0,
                                    currency:
                                        veh.TotalCharge?.["@CurrencyCode"] ||
                                        "",
                                    tags: [
                                        {
                                            label: vendorName,
                                            variant: "primary",
                                        },
                                        {
                                            label:
                                                veh.Vehicle?.[
                                                    "@TransmissionType"
                                                ] || "",
                                            variant: "secondary",
                                        },
                                    ],
                                });
                            });
                        }
                    });
                }
                cars.sort((a, b) => a.price - b.price);
                setCars(cars);
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

    // Sort cars for display based on sortBy
    let sortedCars = [...cars];
    if (sortBy === "price-asc") {
        sortedCars.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
        sortedCars.sort((a, b) => b.price - a.price);
    } else if (sortBy === "vendor-asc") {
        sortedCars.sort((a, b) => a.vendor.localeCompare(b.vendor));
    }

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
                                    <option value="vendor-asc">
                                        Vendor (A-Z)
                                    </option>
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
