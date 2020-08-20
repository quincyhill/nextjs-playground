import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

interface SquareProps {
  value: string | null;
  onClick: () => void;
}

function Square(props: SquareProps) {
  let [value, setValue] = useState<null | string>(String(props.value));

  const handleClick = () => {
    props.onClick();
    console.log(`The value of the props.value: ${props.value}`);
    setValue(props.value);
  };

  return <Button onClick={handleClick}>{String(value)}</Button>;
}

export default Square;
