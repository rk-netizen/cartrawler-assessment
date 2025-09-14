import ResultsList from "../shared/ResultsList/ResultsList.jsx";
import "./CarListPage.css";

export default function CarListPage({
    legend,
    sortBy,
    setSortBy,
    loading,
    error,
    sortedCars,
}) {
    let legendContent = null;
    if (legend) {
        const legendParts = legend.split("|").map((s) => s.trim());
        const location = legendParts[0] || "";
        const pickup = legendParts[1]?.replace("Pickup:", "").trim() || "";
        const ret = legendParts[2]?.replace("Return:", "").trim() || "";
        legendContent = (
            <div className="carlist-legend">
                <span className="legend-location">{location}</span>
                <span className="legend-sep">|</span>
                <span className="legend-label">Pickup:</span>
                <span className="legend-datetime">{pickup}</span>
                <span className="legend-sep">|</span>
                <span className="legend-label">Return:</span>
                <span className="legend-datetime">{ret}</span>
            </div>
        );
    }
    return (
        <main className="carlist-main">
            {legendContent}
            <div className="carlist-sortbar">
                <label htmlFor="sort-cars">Sort by:</label>
                <select
                    id="sort-cars"
                    className="carlist-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="price-asc">Price (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
                </select>
            </div>
            {loading && <div>Loading...</div>}
            {error && <div className="carlist-error">{error}</div>}
            {!loading && !error && (
                <ResultsList
                    items={sortedCars}
                    onCardClick={(car) => {
                        window.location.href = `/car/${encodeURIComponent(
                            car.id
                        )}`;
                    }}
                />
            )}
        </main>
    );
}
