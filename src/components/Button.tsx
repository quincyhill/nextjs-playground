import React, { useState } from "react";

export default function Button(): JSX.Element {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked the button {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click ME!</button>
    </div>
  );
}
