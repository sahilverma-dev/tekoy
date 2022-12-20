import React from "react";

const App = () => {
  return <div>{JSON.stringify(import.meta.env.VITE_REACT_APP_API)}</div>;
};

export default App;
