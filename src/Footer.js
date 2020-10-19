import { Box, Text } from "theme-ui";
import format from "format-number";
import React from "react";
import Tools from "./Tools";

const Footer = (props) => (
  <Box className={"styles.footer"}>
    <Box className={"styles.notification"}>
      {props.buffer ? (
        <Text>
          <b>
            {props.buffer} $
            {Tools.find((tool) => tool.name === props.buffer).price}
          </b>{" "}
          Place item on desk to purchase
        </Text>
      ) : null}
      {props.deleteMode && <Text>Click tool to delete</Text>}
    </Box>
    <Text className={"styles.budget"}>
      Budget{" "}
      <b>{format({ prefix: "$" })(props.budget, { integerSeparator: true })}</b>
    </Text>
  </Box>
);

export default Footer;
