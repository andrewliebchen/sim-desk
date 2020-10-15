import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import Draggable from "react-draggable";
import Tools from "./Tools";

class Toolbar extends Component {
  static propTypes = {
    toolAction: PropTypes.func,
    deleteTool: PropTypes.func,
    deleteMode: PropTypes.bool,
    buffer: PropTypes.string,
  };

  renderIconGraphic(graphic) {
    return (
      <svg version="1.1" x="0px" y="0px" width="26px" viewBox="0 0 30 30">
        {graphic}
      </svg>
    );
  }

  render() {
    const { toolAction, deleteTool } = this.props;
    const tools = Tools.map((tool) => tool);
    return (
      <Draggable
        defaultPosition={{ x: 30, y: 30 }}
        position={null}
        zIndex={9999}
        handle=".drag-handle"
        bounds="parent"
      >
        <div className={"styles.container"}>
          <div className={"styles.toolbar"}>
            <header className={"styles.header drag-handle"}>
              <span>Tools</span>
            </header>
            <div className={"styles.tools"}>
              <button
                className={"deleteMode ? styles.buttonSelected : styles.button"}
                onClick={deleteTool}
                data-hint="Remove"
              >
                {this.renderIconGraphic(
                  <path
                    d="M23,25.7c-0.8,0-1.6-0.3-2.1-0.9L15,18.9l-5.9,5.9C8,26,6,26,4.9,24.8C4.3,24.3,4,23.5,4,22.7s0.3-1.6,0.9-2.1l5.9-5.9
                  	L4.9,8.8C4.3,8.3,4,7.5,4,6.7s0.3-1.6,0.9-2.1C6,3.4,8,3.4,9.1,4.6l5.9,5.9l5.9-5.9c1.1-1.1,3.1-1.1,4.2,0C25.7,5.1,26,5.9,26,6.7
                  	s-0.3,1.6-0.9,2.1l-5.9,5.9l5.9,5.9c0.6,0.6,0.9,1.3,0.9,2.1s-0.3,1.6-0.9,2.1C24.6,25.4,23.8,25.7,23,25.7z M15,17.5l6.6,6.6
                  	c0.8,0.8,2.1,0.8,2.8,0c0.4-0.4,0.6-0.9,0.6-1.4s-0.2-1-0.6-1.4l-6.6-6.6l6.6-6.6C24.8,7.7,25,7.2,25,6.7s-0.2-1-0.6-1.4
                  	c-0.8-0.8-2.1-0.8-2.8,0L15,11.9L8.4,5.3c-0.8-0.8-2.1-0.8-2.8,0C5.2,5.7,5,6.2,5,6.7s0.2,1,0.6,1.4l6.6,6.6l-6.6,6.6
                  	C5.2,21.7,5,22.2,5,22.7s0.2,1,0.6,1.4c0.8,0.8,2.1,0.8,2.8,0L15,17.5z"
                  />
                )}
              </button>
              {tools.map((tool, i) => (
                <button
                  key={i}
                  className={
                    "buffer === tool ? styles.buttonSelected : styles.button"
                  }
                  onClick={toolAction.bind(null, tool.name)}
                  data-hint={_.capitalize(tool.name)}
                >
                  {tool.icon ? this.renderIconGraphic(tool.icon) : null}
                </button>
              ))}
            </div>
            <div className={"styles.graph"}>
              {_.times(3, (i) => (
                <div className={"styles.barContainer"} key={i}>
                  <div
                    className={"styles.bar"}
                    style={{ animationDelay: `${i}s` }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={"styles.shadow"} />
        </div>
      </Draggable>
    );
  }
}

export default Toolbar;
