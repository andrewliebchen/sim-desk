import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import Draggable from "react-draggable";
import Tools from "./Tools";

class DeskItem extends Component {
  static propTypes = {
    tool: PropTypes.object.isRequired,
    index: PropTypes.number,
    toolClick: PropTypes.func,
  };

  render() {
    const { tool, index, toolClick } = this.props;
    const params = _.find(Tools, { name: tool.name });
    return (
      <Draggable
        defaultPosition={{ x: tool.initX, y: tool.initY }}
        bounds="parent"
        zIndex={index}
      >
        <div
          className={"styles.wrapper"}
          onClick={toolClick.bind(null, tool.id)}
        >
          <svg
            version="1.1"
            x="0px"
            y="0px"
            width={`${params.width}px`}
            height={`${params.height}px`}
            viewBox={`0 0 ${params.width} ${params.height}`}
            className={"styles.graphic"}
          >
            {params.graphic}
          </svg>
        </div>
      </Draggable>
    );
  }
}

export default DeskItem;
