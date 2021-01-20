import React, { useEffect, useState, useDebugValue } from "react";

interface Props {
  userID: number;
}

function useDisplayName(props: Props) {
  function fetchFromDatabase(
    userID: number
  ): { displayName: string; age: number } {
    if (userID === 1) {
      return { displayName: "bob", age: 20 };
    } else {
      return { displayName: "unknown", age: 0 };
    }
  }

  const [displayName, setDisplayName] = useState<any>();

  useEffect(() => {
    const data = fetchFromDatabase(props.userID);
    setDisplayName(data.displayName);
  }, []);

  useDebugValue(displayName ?? "loading...");
  return displayName;
}

function CustomHookComponent(props: Props) {
  return (
    <React.Fragment>
      <h1>stuff</h1>
    </React.Fragment>
  );
}

export { useDisplayName };
export default CustomHookComponent;
