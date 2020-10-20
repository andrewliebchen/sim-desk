import { Box } from "theme-ui";
import AppContext from "./AppContext";
import Draggable from "react-draggable";
import PropTypes from "prop-types";
import React from "react";
import Tools from "./Tools";

const DeskItem = () => (
  <AppContext.Consumer>
    {(props) => {
      const params = Tools.find((tool) => tool.name === props.tool.name);
      return (
        <Draggable
          defaultPosition={{ x: props.tool.initX, y: props.tool.initY }}
          bounds="parent"
          zIndex={props.index}
        >
          <Box
            className={"styles.wrapper"}
            onClick={(event) => {
              event.stopPropagation();
              const { tools, deleteMode } = props;
              if (deleteMode) {
                const index = tools.indexOf(
                  tools.find((tool) => tool.id === props.tool.id)
                );
                props.set({
                  tools: [...tools.slice(0, index), ...tools.slice(index + 1)],
                  deleteMode: false,
                });
              }
            }}
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
    }}
  </AppContext.Consumer>
);

DeskItem.propTypes = {
  tool: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default DeskItem;
