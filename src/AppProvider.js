import React, { useState } from "react";
import AppContext from "./AppContext";

const AppProvider = (props) => {
  const [state, setState] = useState({
    tools: [],
    deleteMode: false,
    budget: 10000,
    buffer: null,
    welcomeModal: true,
    deskSize: {
      width: 600,
      height: 300,
    },
  });

  return (
    <AppContext.Provider
      value={{
        ...props,
        state: state,
        setState: setState,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
