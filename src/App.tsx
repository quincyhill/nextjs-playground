import React, { useState, useContext, createContext } from "react";
import logo from "./logo.svg";
import { store } from "./index";
import "./styles.css";
import ReduxCounter from "./components/ReduxCounter";
import AuthButton from "./components/AuthButton";
import HookCounter from "./components/HookCounter";
import RefCounter from "./components/RefCounter";
import RefExample from "./components/RefExample";
import ReducerCounter from "./components/ReducerCounter";
import { useDisplayName } from "./components/CustomHookComponent";

const moods = {
  happy: "😀",
  sad: "😭",
};

const MoodContext = createContext(moods.sad);
function App() {
  const size: number = 80;
  const displayName = useDisplayName({ userID: 1 });
  return (
    <div className="App grid-container">
      <header className="App-header">
        <img
          src={logo}
          className="App-logo"
          alt="logo"
          width={size}
          height={size}
        />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <body>
        <button style={{ backgroundColor: "purple", color: "white" }}>
          {displayName}
        </button>
        <AuthButton />
        <ReduxCounter />
        <HookCounter />
        <MoodContext.Provider value={moods.happy}>
          <MoodEmoji />
        </MoodContext.Provider>
        <RefCounter />
        <RefExample />
        <br />
        <ReducerCounter />
      </body>
    </div>
  );
}

function MoodEmoji() {
  const mood = useContext(MoodContext);
  return <p>{mood}</p>;
}

export default App;
