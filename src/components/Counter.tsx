import React from "react";
import { store } from "../index";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../actions";

function Counter() {
  const counter = useSelector((state: { counter: number }) => state.counter);
  const isLogged = useSelector(
    (state: { isLogged: boolean }) => state.isLogged
  );
  const dispatch = useDispatch();
  return (
    <div>
      <h1>
        Counter: <span>{String(counter)}</span>
      </h1>

      {isLogged ? <h3>Info I shouldn't see</h3> : null}

      <button
        onClick={() => {
          dispatch(increment());
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          dispatch(decrement());
        }}
      >
        -
      </button>
    </div>
  );
}

export default Counter;
