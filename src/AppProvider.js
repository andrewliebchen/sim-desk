import AppContext from "./AppContext";
import React, { useState } from "react";

const AppProvider = (props) => {
  const [state, setState] = useState({
    tools: [],
    deleteMode: false,
    budget: 10000,
    buffer: null,
    deskSize: {
      width: 600,
      height: 300,
    },
  });

  return (
    <AppContext.Provider
      value={{
        ...props,
        ...state,
        set: setState,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
