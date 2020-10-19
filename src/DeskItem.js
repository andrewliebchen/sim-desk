import { Box } from "theme-ui";
import Draggable from "react-draggable";
import PropTypes from "prop-types";
import React from "react";
import Tools from "./Tools";

const DeskItem = (props) => {
  const params = Tools.find((tool) => tool.name === props.tool.name);
  return (
    <Draggable
      defaultPosition={{ x: props.tool.initX, y: props.tool.initY }}
      bounds="parent"
      zIndex={props.index}
    >
      <Box
        className={"styles.wrapper"}
        onClick={props.toolClick.bind(null, props.tool.id)}
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
      </Box>
    </Draggable>
  );
};

DeskItem.propTypes = {
  tool: PropTypes.object.isRequired,
  index: PropTypes.number,
  toolClick: PropTypes.func,
};

export default DeskItem;
