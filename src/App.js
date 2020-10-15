import React, { Component } from "react";
import _ from "lodash";
import randomToken from "random-token";
import Menubar from "./Menubar";
import Tools from "./Tools";
import Toolbar from "./Toolbar";
import Desk from "./Desk";
import Footer from "./Footer";
import Modal from "./Modal";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tools: [],
      deleteMode: false,
      budget: 10000,
      buffer: null,
      welcomeModal: true,
      deskSize: {
        width: 600,
        height: 300,
      },
    };
  }

  render() {
    const {
      tools,
      budget,
      deleteMode,
      buffer,
      deskSize,
      welcomeModal,
    } = this.state;
    return (
      <div className="container">
        <header className="header">
          <span>SimDesk</span>
        </header>
        <Menubar />
        <div className="dragContainer">
          <Toolbar
            toolAction={this.handleSelectItem}
            deleteTool={this.toggleDelete}
            deleteMode={deleteMode}
            buffer={buffer}
          />
          <Desk
            deskSize={deskSize}
            tools={tools}
            toolClick={this.handleToolClick}
            deskClick={this.handleDeskClick}
          />
          <Footer
            buffer={buffer}
            deleteMode={deleteMode}
            budget={budget}
            tools={tools}
          />
        </div>
        {welcomeModal ? (
          <Modal>
            <h2>Welcome to SimDesk</h2>
            <p>
              Your desk is where it all starts. I've collected all the design
              tools you'll need. Arrange and knoll the tools to make the most
              out of your workspace.
            </p>
            <footer className="modalFooter">
              <button className="secondaryButton">What is this?</button>
              <button
                className="primaryButton"
                onClick={this.handleToggleModal}
              >
                Get started
              </button>
            </footer>
          </Modal>
        ) : null}
      </div>
    );
  }

  handleSelectItem = (item) => {
    this.setState({
      buffer: item,
      deleteMode: false,
    });
  };

  toggleDelete = () => {
    this.setState({
      deleteMode: !this.state.deleteMode,
      buffer: null,
    });
  };

  handleDeskClick = (event) => {
    const { tools, budget, buffer, deleteMode, deskSize } = this.state;
    if (buffer) {
      const deskOffset = 6;
      const toolData = _.find(Tools, { name: buffer });
      const price = toolData.price;

      const targetOffsetX = event.target.offsetWidth * 0.5;
      const targetOffsetY = event.target.offsetHeight * 0.5;
      const toolOffsetX = toolData ? toolData.width * 0.5 : null;
      const toolOffsetY = toolData ? toolData.height * 0.5 : null;
      let initX = event.clientX - event.target.offsetLeft + targetOffsetX;
      let initY = event.clientY - event.target.offsetTop + targetOffsetY;

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
        this.setState({
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
        this.setState({ buffer: "Not enough money!" });
      }
    }
  };

  handleToolClick = (id, event) => {
    event.stopPropagation();
    const { tools, deleteMode } = this.state;
    if (deleteMode) {
      const index = _.indexOf(tools, _.find(tools, { id: id }));
      this.setState({
        tools: [...tools.slice(0, index), ...tools.slice(index + 1)],
        deleteMode: false,
      });
    }
  };

  handleToggleModal = () => {
    this.setState({ welcomeModal: !this.state.welcomeModal });
  };
}

export default App;
