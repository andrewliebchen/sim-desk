import { Box, Button, Text, Heading } from "theme-ui";
import Desk from "./Desk";
import Footer from "./Footer";
import Menubar from "./Menubar";
import Modal from "./Modal";
import randomToken from "random-token";
import React from "react";
import Toolbar from "./Toolbar";
import Tools from "./Tools";
import AppContext from "./AppContext";

const App = () => (
  <AppContext.Consumer>
    {(props) => (
      <Box className="container">
        <Box className="header">
          <span>SimDesk</span>
        </Box>
        <Menubar />
        <Box className="dragContainer">
          <Toolbar
            toolAction={(item) => {
              props.setState({
                buffer: item,
                deleteMode: false,
              });
            }}
            deleteTool={() =>
              props.setState({
                deleteMode: !props.state.deleteMode,
                buffer: null,
              })
            }
            {...props.state}
          />
          <Desk
            deskSize={props.state.deskSize}
            tools={props.state.tools}
            toolClick={(id, event) => {
              event.stopPropagation();
              const { tools, deleteMode } = props.state;
              if (deleteMode) {
                const index = tools.indexOf(
                  tools.find((tool) => tool.id === id)
                );
                props.setState({
                  tools: [...tools.slice(0, index), ...tools.slice(index + 1)],
                  deleteMode: false,
                });
              }
            }}
            deskClick={(event) => {
              const {
                tools,
                budget,
                buffer,
                deleteMode,
                deskSize,
              } = props.state;
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
                  props.setState({
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
                  props.setState({ buffer: "Not enough money!" });
                }
              }
            }}
          />
          <Footer {...props.state} />
        </Box>
        {props.state.welcomeModal && (
          <Modal>
            <Heading>Welcome to SimDesk</Heading>
            <Text>
              Your desk is where it all starts. I've collected all the design
              tools you'll need. Arrange and knoll the tools to make the most
              out of your workspace.
            </Text>
            <Box className="modalFooter">
              <Button className="secondaryButton">What is this?</Button>
              <Button
                className="primaryButton"
                onClick={() =>
                  props.setState({ welcomeModal: !props.state.welcomeModal })
                }
              >
                Get started
              </Button>
            </Box>
          </Modal>
        )}
      </Box>
    )}
  </AppContext.Consumer>
);

export default App;
