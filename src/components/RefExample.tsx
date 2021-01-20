import React, { useRef } from "react";

// Essentially the overall goal of use ref is to reference html DOM elements and be able to modify them
function RefExample() {
  // Creates a null reference
  const myBtn = useRef(null);

  //   my example click it here
  //   use the (xxx as any) to cast, in this case I KNOW its a button
  const clickIt = () => (myBtn as any).current.click();

  return (
    <button ref={myBtn} onClick={() => console.log(clickIt)}>
      hey
    </button>
  );
}

export default RefExample;
