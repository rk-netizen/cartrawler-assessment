import { useState } from "react";
import "./App.css";
import Header from "./components/shared/Header/Header";
import Card from "./components/shared/Card/Card";
import Input from "./components/shared/Input/Input";
import Tag from "./components/shared/Tag/Tag";
import Button from "./components/shared/Button/Button";

function App() {
    const [count, setCount] = useState(0);
    const [inputValue, setInputValue] = useState("");
    return (
        <>
            <Header />
            <main style={{ maxWidth: 800, margin: "2em auto", padding: "1em" }}>
                <Card>
                    <h2>Welcome to CarTrawler Assessment</h2>
                    <div style={{ marginBottom: "1em" }}>
                        <Input
                            placeholder="Type something..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                    </div>
                    <div style={{ marginBottom: "1em" }}>
                        <Tag variant="primary">Primary Tag</Tag>
                        <Tag variant="secondary">Secondary Tag</Tag>
                        <Tag variant="danger">Danger Tag</Tag>
                    </div>
                    <div>
                        <Button
                            variant="primary"
                            onClick={() => setCount(count + 1)}
                        >
                            Primary Button (count is {count})
                        </Button>
                        <Button variant="secondary" style={{ marginLeft: 8 }}>
                            Secondary Button
                        </Button>
                        <Button variant="danger" style={{ marginLeft: 8 }}>
                            Danger Button
                        </Button>
                    </div>
                </Card>
            </main>
        </>
    );
}

export default App;
