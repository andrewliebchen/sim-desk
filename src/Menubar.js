import { Box, Text } from "theme-ui";
import MenubarItem from "./MenubarItem";
import moment from "moment";
import React, { useState, useEffect } from "react";

const Menubar = (props) => {
  const [time, setTime] = useState(moment());
  useEffect(() => {
    setInterval(() => {
      setTime((time) => moment(time).add(1, "month"));
    }, 5000);
  }, []);

  return (
    <Box className={"styles.menubar"}>
      <MenubarItem label="Projects">
        <Text className={"styles.content"}>
          I've been working in startups for a few years now. I always have some
          kind of side project or diversion taking my time when I'm not working
          on startups.
        </Text>
      </MenubarItem>
      <MenubarItem label="Help">
        <Text className={"styles.content"}>
          I don't really ever send emails. But if I ever do, I can send you one.
        </Text>
      </MenubarItem>
      <Text className={"styles.time"}>
        {moment(time).format("MMM")}{" "}
        <strong>{moment(time).format("YYYY")}</strong>
      </Text>
    </Box>
  );
};

export default Menubar;
