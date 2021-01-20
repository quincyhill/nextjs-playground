import React, { useState, useEffect, useContext } from "react";

function HookCounter() {
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    // If I don't pass a second argument then the use effect will run EVERY time state within this component changes which may cause
    // an infinite loop and could crash the app its an array of state and what ever is passed into it will cause it to run whats
    // inside useeffect
    console.log(
      "This is tracking the count state so here is the value ",
      count
    );

    // having this return is run when the component is destoryed
    return () => alert("goodbye component");
  }, [count]);

  return (
    <div
      style={{
        borderRadius: "4px",

        borderColor: "green",
        backgroundColor: "yellow",
      }}
    >
      <React.Fragment>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          UP
        </button>

        <button
          onClick={() => {
            setCount(count - 1);
          }}
        >
          DROP
        </button>
        <h1>
          Value: <span>{count}</span>
        </h1>
      </React.Fragment>
    </div>
  );
}

export default HookCounter;
