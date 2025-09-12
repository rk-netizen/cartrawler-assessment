import { useState } from "react";
import "./App.css";
import Button from "./components/shared/Button/Button.jsx";

function App() {
    const [count, setCount] = useState(0);
    return (
        <div className="card">
            <Button variant="primary" onClick={() => setCount(count + 1)}>
                Primary Button (count is {count})
            </Button>
            <br />
            <br />
            <Button variant="secondary" onClick={() => setCount(count + 1)}>
                Secondary Button (count is {count})
            </Button>
            <br />
            <br />
            <Button variant="danger" onClick={() => setCount(count + 1)}>
                Danger Button (count is {count})
            </Button>
        </div>
    );
}

export default App;
