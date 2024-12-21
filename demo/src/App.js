import "./App.css";
import { useState } from "react";

function App() {
  // Logic goes here
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>This is my counter app!</h1>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 2)}>Increment</button>
    </div>
  );
}

export default App;
