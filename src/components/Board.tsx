import React, { useState } from "react";
import Square from "./Square";
import Table from "react-bootstrap/Table";

function Board() {
  const [squares, setSquares] = useState<Array<null | string>>(
    Array(9).fill(null)
  );

  const handleClick = (i: number) => {
    console.log("From the board");
    const mySquares = squares.slice();
    mySquares[i] = "X";
    setSquares(mySquares);
    console.log(squares);
  };

  function renderSquare(i: number) {
    return (
      <Square
        value={squares[i]}
        onClick={() => {
          handleClick(i);
        }}
      />
    );
  }

  const status: string = "Next player: X";

  return (
    <React.Fragment>
      <div className="status">{status}</div>
      <div className="">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </React.Fragment>
  );
}

export default Board;
