import React, { useState } from "react";
import Button from "react-bootstrap/Button";

function CustomButton(): JSX.Element {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked the button {count} times</p>
      <Button onClick={() => setCount(count + 1)}>Click ME!</Button>
    </div>
  );
}

export default CustomButton;
