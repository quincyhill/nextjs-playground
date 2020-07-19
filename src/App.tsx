import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Button from "./components/Button";
import ExampleWithManyStates from "./components/ExampleWithManyStates";

function App() {
  return (
    <div className="App">
      <Button />
      <ExampleWithManyStates />
    </div>
  );
}

export default App;
