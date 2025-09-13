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
import { getLegendInfo, mapApiToCars, sortCars } from "./utils/helpers.js";

function App() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState("price-asc");

    const [legend, setLegend] = useState("");
    useEffect(() => {
        // Use async/await with Promises for fetch
        const fetchCars = async () => {
            try {
                const res = await fetch(
                    "https://ajaxgeo.cartrawler.com/ctabe/cars.json"
                );
                if (!res.ok) throw new Error("Failed to fetch cars");

                const data = await res.json();

                getLegendInfo(data, setLegend);

                const mappedCars = mapApiToCars(data);

                setCars(sortCars(mappedCars, "price-asc"));
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchCars();
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
