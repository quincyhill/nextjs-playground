import React, { useMemo, useState } from "react";

function MemoCounter() {
  const [count, setCount] = useState<number>(0);

  // only needed for expensive computations
  //   In this case compute when count changes
  const expensiveCount = useMemo(() => {
    return count ** 2;
  }, [count]);

  return (
    <React.Fragment>
      <h1>Stuff</h1>
    </React.Fragment>
  );
}

export default MemoCounter;
