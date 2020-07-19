import React, { useState } from "react";

export default function ExampleWithManyStates() {
  const [age, setAge] = useState(33);
  const [fruit, setFruit] = useState("Apple");
  const [todos, setTodos] = useState([{ text: "Learn Hooks" }]);

  return (
    <h1>
      <ul>
        <li>
          {age}
          {() => setAge(age * 12)}
        </li>
        <li>
          {fruit}
          {() => setFruit("Banana")}
        </li>
      </ul>
    </h1>
  );
}
