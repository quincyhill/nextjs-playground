import React, { useReducer } from "react";

function reducer(state: number, action: { type: string }) {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      throw new Error();
  }
}

function ReducerCounter() {
  const [state, dispatch] = useReducer(reducer, 0);
  return (
    <React.Fragment>
      Count: {state}
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
    </React.Fragment>
  );
}

export default ReducerCounter;
