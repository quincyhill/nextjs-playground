import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { configureStore, Reducer } from "@reduxjs/toolkit";

interface CounterValueInterface {
  value: number;
}

interface TodoActionInterface {
  type: string;
  payLoad: string;
}

interface CounterActionInterface extends TodoActionInterface {}

interface CounterReducerInterface {
  (
    state: CounterValueInterface,
    action: CounterActionInterface
  ): CounterValueInterface;
}

interface TodoActionCreatorInterface {
  (text: string): TodoActionInterface;
}

const addTodoAction: TodoActionInterface = {
  type: "todos/todoAdded",
  payLoad: "Buy Milk",
};

const addTodo: TodoActionCreatorInterface = (text) => {
  return {
    type: "todos/todoAdded",
    payLoad: text,
  };
};

const initialState: CounterValueInterface = { value: 0 };

// Understanding the reduce method on arrays

const testNumbers = [2, 5, 7];

const addNumbers = (previousResult: number, currentItem: number): number => {
  console.log({ previousResult, currentItem });
  return previousResult + currentItem;
};

const initialNumber: number = 0;
const totalNumbers: number = testNumbers.reduce(addNumbers, initialNumber);

const counterReducer: CounterReducerInterface = (
  state = initialState,
  action
) => {
  if (action.type === "counter/increment") {
    //   If so, make a copy of `state`
    return {
      ...state,
      //   and update the copy with the new value
      value: state.value + 1,
    };
  }
  //   otherwise return the existing state unchanged
  return state;
};

const counterReducer2: Reducer<CounterValueInterface> = (
  state = initialState,
  action
) => {
  if (action.type === "counter/increment") {
    //   If so, make a copy of `state`
    return {
      ...state,
      //   and update the copy with the new value
      value: state.value + 1,
    };
  }
  //   otherwise return the existing state unchanged
  return state;
};

function Counter() {
  // State: a couter value
  const [counter, setCounter] = useState<number>(0);

  //   the store
  const store = configureStore({ reducer: counterReducer2 });
  store.dispatch({ type: "counter/increment" });

  //   Action: code that causes an update to the state when something happens
  const increment = () => {
    setCounter((prevCounter: number) => prevCounter + 1);
  };

  const testObj = {
    a: {
      // To safely update testObj.a.c, we have to copy each piece
      c: 3,
    },
    b: 2,
  };

  const testObj2 = {
    //   copy testObj
    ...testObj,
    // overwrite a
    a: {
      // copy testObj.a
      ...testObj.a,
      // overwrite c
      c: 42,
    },
  };

  const myArr = ["a", "b"];
  //   Create a new copy of myArr, with "c" appended to the end
  const myArr2 = myArr.concat("c");

  //   or, we can make a copy of the original array

  const myArr3 = myArr.slice();
  //   and mutate the copy
  myArr3.push("c");

  //   View the ui definition

  console.log(store.getState());
  return (
    <React.Fragment>
      <div>
        Value: {counter}
        <Button
          onClick={() => {
            increment();
            store.dispatch({ type: "counter/increment" });
          }}
        >
          Increment
        </Button>
      </div>
    </React.Fragment>
  );
}

export default Counter;
