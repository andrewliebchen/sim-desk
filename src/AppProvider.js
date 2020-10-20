import React, { useState } from "react";
import AppContext from "./AppContext";

const AppProvider = (props) => {
  return (
    <AppContext.Provider
      value={{
        ...props,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
