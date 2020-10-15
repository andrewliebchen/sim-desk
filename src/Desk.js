import React, { Component } from "react";
import DeskItem from "./DeskItem";
import PropTypes from "prop-types";

class Desk extends Component {
  static propTypes = {
    tools: PropTypes.array,
    deskSize: PropTypes.object,
    toolClick: PropTypes.func,
    deskClick: PropTypes.func,
  };

  renderLeg() {
    return (
      <svg
        version="1.1"
        width="48.4px"
        height="230px"
        viewBox="0 0 48.4 230"
        className="styles.legGraphic"
      >
        <path
          d="M9,229c-4.4,0-8-3.6-8-8l0-0.1L11,1h6L7,221.1c0,1.1,0.9,1.9,2,1.9c1.1,0,2-0.9,2-2l0-0.4L41,1h6.3L17,221.2
        	C16.9,225.5,13.3,229,9,229z"
        />
      </svg>
    );
  }

  render() {
    const { tools, deskSize, toolClick, deskClick } = this.props;
    const deskStyles = {
      height: deskSize.height,
      width: deskSize.width,
    };
    return (
      <div className={"styles.container"}>
        <div
          className={"styles.desk"}
          onClick={deskClick}
          ref="desk"
          style={deskStyles}
        >
          {tools.length > 0
            ? tools.map((tool, i) => (
                <DeskItem
                  tool={tool}
                  toolClick={toolClick}
                  index={i}
                  key={tool.id}
                />
              ))
            : null}
          <div className={"styles.leftLeg"}>{this.renderLeg()}</div>
          <div className={"styles.rightLeg"}>{this.renderLeg()}</div>
        </div>
        <div className={"styles.shadow"} style={deskStyles} />
      </div>
    );
  }
}

export default Desk;
