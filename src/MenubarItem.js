import { Box } from "theme-ui";
import { ReactPageClick } from "react-page-click";
import PropTypes from "prop-types";
import React, { useState } from "react";

const MenubarItem = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <Box className={"styles.item"}>
      <Box onClick={() => setOpen(true)}>{props.label}</Box>
      {open && props.children ? (
        <ReactPageClick notify={this.handleMenuToggle}>
          <Box className={"styles.menu"}>
            <Box className={"styles.container"} {...props} />
            <Box className={"styles.shadow"} />
          </Box>
        </ReactPageClick>
      ) : null}
    </Box>
  );
};

MenubarItem.propTypes = {
  label: PropTypes.string,
};

export default MenubarItem;
