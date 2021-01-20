import React, { useRef, useEffect } from "react";

// Still need to figure this out abit more with some testing
function RefCounter() {
  const count = useRef<number>(0);
  useEffect(() => {
    console.log(count);
  }, [count]);
  return (
    <div style={{ borderRadius: "4px", backgroundColor: "green" }}>
      <button onClick={() => count.current++}>{count.current}</button>
    </div>
  );
}

export default RefCounter;
