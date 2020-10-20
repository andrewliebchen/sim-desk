import { Box } from "theme-ui";
import PropTypes from "prop-types";
import React from "react";

const Modal = (props) => (
  <Box className={"styles.container"}>
    <Box className={"styles.contentContainer"}>
      <Box className={"styles.content"} {...props} />
      <Box className={"styles.shadow"} />
    </Box>
    <Box className={"styles.background"} onClick={props.toggle} />
  </Box>
);

Modal.propTypes = {
  toggle: PropTypes.func,
};

export default Modal;
