import React, { useCallback, useState } from "react";

function CallbackExample() {
  const [count, setCount] = useState<number>(0);

  return (
    <React.Fragment>
      <h1>Hello there</h1>
    </React.Fragment>
  );
}

export default CallbackExample;
