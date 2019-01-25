import * as React from "react";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";

const BottomBar: React.FunctionComponent<{
  handleChange: (value: any) => void;
}> = ({ handleChange }) => {
  return (
    <BottomNavigation onChange={(_, v) => handleChange(v)} showLabels>
      <BottomNavigationAction label="connect" />
      <BottomNavigationAction label="text" />
      <BottomNavigationAction label="video" />
    </BottomNavigation>
  );
};

export default BottomBar;
