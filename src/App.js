import { Box } from "theme-ui";
import AppContext from "./AppContext";
import Desk from "./Desk";
import Footer from "./Footer";
import Menubar from "./Menubar";
import React from "react";
import Toolbar from "./Toolbar";

const App = () => (
  <AppContext.Consumer>
    {(props) => (
      <Box className="container">
        <Box className="header">
          <span>SimDesk</span>
        </Box>
        <Menubar />
        <Box className="dragContainer">
          <Toolbar />
          <Desk />
          <Footer />
        </Box>
      </Box>
    )}
  </AppContext.Consumer>
);

export default App;
