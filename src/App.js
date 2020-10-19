import { Box, Button, Text, Heading } from "theme-ui";
import Desk from "./Desk";
import Footer from "./Footer";
import Menubar from "./Menubar";
import Modal from "./Modal";
import randomToken from "random-token";
import React, { useState } from "react";
import Toolbar from "./Toolbar";
import Tools from "./Tools";

const App = (props) => {
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
    <Box className="container">
      <Box className="header">
        <span>SimDesk</span>
      </Box>
      <Menubar />
      <Box className="dragContainer">
        <Toolbar
          toolAction={(item) => {
            setState({
              buffer: item,
              deleteMode: false,
            });
          }}
          deleteTool={() =>
            setState({
              deleteMode: !state.deleteMode,
              buffer: null,
            })
          }
          {...state}
        />
        <Desk
          deskSize={state.deskSize}
          tools={state.tools}
          toolClick={(id, event) => {
            event.stopPropagation();
            const { tools, deleteMode } = state;
            if (deleteMode) {
              const index = tools.indexOf(tools.find((tool) => tool.id === id));
              setState({
                tools: [...tools.slice(0, index), ...tools.slice(index + 1)],
                deleteMode: false,
              });
            }
          }}
          deskClick={(event) => {
            const { tools, budget, buffer, deleteMode, deskSize } = state;
            if (buffer) {
              const deskOffset = 6;
              const toolData = Tools.find((tool) => tool.name === buffer);
              const price = toolData.price;

              const targetOffsetX = event.target.offsetWidth * 0.5;
              const targetOffsetY = event.target.offsetHeight * 0.5;
              const toolOffsetX = toolData ? toolData.width * 0.5 : null;
              const toolOffsetY = toolData ? toolData.height * 0.5 : null;
              let initX =
                event.clientX - event.target.offsetLeft + targetOffsetX;
              let initY =
                event.clientY - event.target.offsetTop + targetOffsetY;

              // If tool placement overlaps desktop
              if (initX + toolOffsetX > deskSize.width) {
                initX = deskSize.width - toolOffsetX - deskOffset;
              }
              if (initX - toolOffsetX < deskOffset) {
                initX = toolOffsetX;
              }
              if (initY - toolOffsetY < 0) {
                initY = toolOffsetY;
              }
              if (initY + toolOffsetY > deskSize.height) {
                initY = deskSize.height - toolOffsetY - 3;
              }

              if (budget >= price && buffer && !deleteMode) {
                setState({
                  tools: [
                    ...tools,
                    {
                      name: buffer,
                      id: randomToken(5),
                      initX: initX - toolOffsetX,
                      initY: initY - toolOffsetY,
                    },
                  ],
                  budget: budget - price,
                  buffer: null,
                });
              } else {
                setState({ buffer: "Not enough money!" });
              }
            }
          }}
        />
        <Footer {...state} />
      </Box>
      {state.welcomeModal && (
        <Modal>
          <Heading>Welcome to SimDesk</Heading>
          <Text>
            Your desk is where it all starts. I've collected all the design
            tools you'll need. Arrange and knoll the tools to make the most out
            of your workspace.
          </Text>
          <Box className="modalFooter">
            <Button className="secondaryButton">What is this?</Button>
            <Button
              className="primaryButton"
              onClick={() => setState({ welcomeModal: !state.welcomeModal })}
            >
              Get started
            </Button>
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default App;
