import { Box } from "theme-ui";
import AppContext from "./AppContext";
import DeskItem from "./DeskItem";
import PropTypes from "prop-types";
import randomToken from "random-token";
import React from "react";
import Tools from "./Tools";

const Leg = (props) => (
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

const Desk = () => (
  <AppContext.Consumer>
    {(props) => (
      <Box className={"styles.container"}>
        <Box
          className={"styles.desk"}
          onClick={(event) => {
            const { tools, budget, buffer, deleteMode, deskSize } = props;
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
                props.set({
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
                props.set({ buffer: "Not enough money!" });
              }
            }
          }}
          sx={{
            height: props.deskSize.height,
            width: props.deskSize.width,
          }}
        >
          {props.tools.length > 0
            ? props.tools.map((tool, i) => (
                <DeskItem tool={tool} index={i} key={tool.id} />
              ))
            : null}
          <Leg side="left" />
          <Leg side="right" />
        </Box>
        <Box
          className={"styles.shadow"}
          sx={{
            height: props.deskSize.height,
            width: props.deskSize.width,
          }}
        />
      </Box>
    )}
  </AppContext.Consumer>
);

Desk.propTypes = {
  tools: PropTypes.array,
  deskSize: PropTypes.object,
  toolClick: PropTypes.func,
  deskClick: PropTypes.func,
};

export default Desk;
