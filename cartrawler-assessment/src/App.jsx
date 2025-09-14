import CarListPage from "./components/pages/CarListPage.jsx";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CarDetailsWrapper from "./components/pages/CarDetailsWrapper.jsx";
import { getLegendInfo, mapApiToCars, sortCars } from "./utils/helpers.js";

function App() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState("price-asc");

    const [legend, setLegend] = useState("");
    useEffect(() => {
        // Use async/await with Promises for fetch data
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

    const sortedCars = sortCars(cars, sortBy);

    // Routing logic
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <CarListPage
                            legend={legend}
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                            loading={loading}
                            error={error}
                            sortedCars={sortedCars}
                        />
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

export default App;
