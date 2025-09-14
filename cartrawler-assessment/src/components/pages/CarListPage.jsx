import ResultsList from "../shared/ResultsList/ResultsList.jsx";
import "./CarListPage.css";

export default function CarListPage({
    legend,
    sortBy,
    setSortBy,
    loading,
    error,
    sortedCars,
    handleBook,
}) {
    return (
        <main className="carlist-main">
            {legend && <div className="carlist-legend">{legend}</div>}
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
                    onBook={handleBook}
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
